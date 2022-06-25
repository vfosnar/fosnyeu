import EventEmitter from 'events';
import { useState, useEffect } from 'react';
import { User } from '../lib/ldap';
import axios from 'axios';
import Queue from '../lib/queue';

const emmiter = new EventEmitter();
let user = null as null | User;

const queue = new Queue();

async function fetchUser() {

    let res;
    try {
        res = await axios.post('/api/user');
    } catch (err) {
        throw Error(); // TODO: throw custom exception
    }

    // Set a new user
    user = res.data;
    emmiter.emit('update');
}

const login = queue.wrap(async (username: string, password: string): Promise<boolean> => {

    if(user) return false;

    let res;
    try {
        res = await axios.post('/api/login', {
            username: username,
            password: password
        }, {
            validateStatus: status => status === 200 || status === 401
        });
    } catch (err) {
        throw Error(); // TODO: throw custom exception
    }

    // Return false if given credentials were invalid
    if(res.status !== 200) return false;

    // Fetch user information and return
    await fetchUser();
    return true;
});

const logout = queue.wrap(async (): Promise<void> => {

    if(!user) return;

    try {
        await axios.post('/api/logout');
    } catch (err) {
        throw Error(); // TODO: throw custom exception
    }

    // Reset user value
    user = null;
    emmiter.emit('update');
});

const setProperty = async (attribute: string, data: Record<string, string>) => {
    try {
        await axios.post('/api/updateProperty', {
            attribute: attribute,
            ...data
        });
    } catch (err) {
        throw Error(); // TODO: throw custom exception
    }
};

const setEmail = queue.wrap(async (email: string) => {
    if(user?.email === email) return;

    await setProperty('email', {
        email: email
    });

    await fetchUser();
});

const setPassword = queue.wrap(async (password: string) => {
    await setProperty('password', {
        password: password
    });
});

const setProfilePicture = async (file: File) => {

    // Read the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    // Send request to the server
    try {
        await axios.post('/api/updateProfilePicture', formData, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        });
    } catch (err) {
        throw Error(); // TODO: throw custom exception
    }

    await fetchUser();
};

export default function useUser() {
    const [innerUser, setInnerUser] = useState(user);

    useEffect(() => {
        (async () => {
            if (user) return;
            try {
                await fetchUser();
            } catch {/**/}
        })();
    }, []);

    // Listen for updates
    useEffect(() => {
        const update = () => setInnerUser(user);
        emmiter.on('update', update);

        // Register for removing the listener
        return () => {
            emmiter.removeListener('update', update);
        };
    }, []);

    return { user: innerUser, login, logout, setEmail, setPassword, setProfilePicture };
}
