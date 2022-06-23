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
    if (session.username) return res.status(200).json({});

    // Check if the data is valid
    if(typeof req.body.username !== 'string' || typeof req.body.password !== 'string')
        return res.status(400).json({});

    // Check credentials
    if (await ldap.checkCredentials(req.body.username, req.body.password)) {
        session.username = req.body.username;
        res.status(200).send({});
    }
    else res.status(401).json({});
}
