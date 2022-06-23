import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '../../lib/getSession';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST')
        res.status(405).send({});

    // Get the session and logout the user
    const session = await getSession(req, res);
    session.username = undefined;

    res.status(200).send({});
}
