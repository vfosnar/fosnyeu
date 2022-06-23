import { Attribute, Change, Client } from 'ldapts';
import crypto from 'crypto';
import { exit } from 'process';

const client = new Client({
    url: process.env.LDAP_URL as string
});

void (async () => {
    try {
        await client.bind(process.env.LDAP_BIND_DN as string, process.env.LDAP_BIND_PASSWORD as string);
    } catch (err) {
        console.error(err);
        exit(1);
    }
})();

/**
 * Retrieve basic user information from LDAP
 * @param username The username to search for
 * @returns The user's information
 */
async function getLDAPUser(username: string) {

    // Check for malicious usernames
    if(!username.match(/^[a-zA-Z0-9]+$/)) return null;

    // Fetch data from the LDAP backend
    const { searchEntries } = await client.search(process.env.LDAP_BASE_DN as string, {
        filter: `(uid=${username})`,
        attributes: ['givenName', 'sn', 'uid', 'mail', 'jpegPhoto'],
        explicitBufferAttributes: ['jpegPhoto'],
    });

    return searchEntries[0] || null;
}

export type User = {
    'name': string,
    'surname': string,
    'username': string,
    'email': string | null,
    'profilePicture': string | null
}

/**
 * Get a user from the LDAP backend
 * @param username The username of the user
 * @returns The user or null if the user does not exist
 */
export async function get(username: string): Promise<User | null> {

    const object = await getLDAPUser(username);
    if (!object) return null;

    // Extract profile picture
    let profilePicture = null;
    let jpegPhoto = object.jpegPhoto as Buffer | undefined;
    if (jpegPhoto !== undefined) {
        profilePicture = jpegPhoto.toString('base64');
    }

    return {
        name: object.givenName as string,
        surname: object.sn as string,
        username: object.uid as string,
        email: object.mail as string | undefined || null,
        profilePicture: profilePicture
    };
}

/**
 * Update atributes of a user in the LDAP backend
 * @param username The username of the user to update
 * @param attribute The attribute to update
 * @param value The new value of the attribute
 */
export async function update(username: string, attribute: string, value: string | Buffer) {

    const object = await getLDAPUser(username);
    if (!object) return; // TODO: throw error

    await client.modify(object.dn, new Change({
        operation: 'replace',
        modification: new Attribute({
            type: attribute,
            values: [value] as string[] | Buffer[]
        })
    }));
}

/**
 * Authenticate a user against the LDAP backend
 * @param username The username of the user to check
 * @param password The password to check
 * @returns true if the password is correct, false otherwise
 */
export async function checkCredentials(username: string, password: string) {

    // Check for malicious usernames
    // and authenticate against the LDAP backend
    const object = await getLDAPUser(username);
    if(!object) return false;

    // Check password
    const { searchEntries } = await client.search(object.dn, {
        attributes: ['userPassword'],
    });
    const hashed_password = searchEntries[0].userPassword as string;
    return hashed_password === generateHash(password);
}

/**
 * Generate a hash for a password
 * @param password Password to hash
 * @returns base64 encoded hash
 */
export function generateHash(password: string) {
    // Yes, MD5 is not secure, but I cannot use a better algorithm
    return `{MD5}${crypto.createHash('md5').update(password).digest('base64')}`;
}
