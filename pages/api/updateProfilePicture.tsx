import busboy from 'busboy';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/getSession';
import * as ldap from '../../lib/ldap';
import sharp from 'sharp';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST' || !req.headers['content-type']?.includes('multipart/form-data')) {
        res.status(405).send({});
    }

    // Check if the user is logged in
    const session = await getSession(req, res);
    if (typeof session.username !== 'string') {
        return res.status(401).send({});
    }

    // Fetch files from request
    let buffer;
    try {
        buffer = await readFileToBuffer('file', req);
    } catch {
        return res.status(400).send({});
    }

    // Resize the image and convert it to JPEG
    let image;
    try {
        image = await sharp(buffer)
            .resize(256, 256)
            .jpeg()
            .toBuffer();
    } catch (err) {
        return res.status(400).send({});
    }

    // Upload the image to LDAP
    await ldap.update(session.username, 'jpegPhoto', image);

    res.status(200).send({});
}

function readFileToBuffer(accept_name: string, req: NextApiRequest): Promise<Buffer> {
    return new Promise((resolve, reject) => {

        // Create a busboy instance to parse the form data
        const bb = busboy({
            headers: req.headers
        });

        // Listen for file uploads sent through the form
        let success = false;
        bb.on('file', (name, file) => {
            if (name !== accept_name) return;

            let buffers: Buffer[] = [];
            file.on('data', (data) => buffers.push(data))
                .on('end', () => {
                    success = true;
                    resolve(Buffer.concat(buffers));
                });
        });
        bb.on('close', () => {
            !success && reject();
        });

        // Parse the request body from the form
        req.pipe(bb);
    });
}
