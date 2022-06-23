import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/getSession';
import * as ldap from '../../lib/ldap';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST')
        res.status(405).send({});

    // Check if the user is logged in
    const session = await getSession(req, res);
    if (typeof session.username !== 'string') {
        return res.status(401).send({});
    }

    // Get data from the request
    const data = req.body;

    switch (data.attribute) {
        case 'email':
            if (typeof data.email !== 'string')
                return res.status(400).send({});
            await ldap.update(session.username, 'mail', data.email);
            break;

        case 'password':
            if (typeof data.password !== 'string')
                return res.status(400).send({});
            await ldap.update(session.username, 'userPassword', ldap.generateHash(data.password));
            break;

        default:
            return res.status(400).send({});
    }

    // Return a success response
    res.status(200).send({});
}
