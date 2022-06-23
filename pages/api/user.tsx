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
    if (typeof session.username !== 'string')
        return res.status(401).send({});

    // Retrieve user data from LDAP
    const user = await ldap.get(session.username);

    res.send(
        user
    );
}
