import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../lib/ldap';
import { useRouter } from 'next/router';
import TextContainer from '../components/TextContainer';
import EditableText from '../components/EditableText';
import styles from '../styles/manage.module.scss';
import Image from 'next/image';

const Home: NextPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        (async () => {
            // Make request to the server
            try {
                const res = await axios.post('/api/user', undefined, {
                    validateStatus: status => status === 200 || status === 401
                });
                if (res.status === 401) return router.push('/login');
                else setUser(res.data);
            } catch (err: any) {
                if(err.message) setMessage(err.message);
                else setMessage('Unknown error occurred');
            }
        })();
    }, [router]);

    if(user === null) return <div>Loading...</div>;

    const updateProperty = async (attribute: string, data: Record<string, string>) => {
        await axios.post('/api/updateProperty', {
            attribute: attribute,
            ...data
        });
    };

    const updateEmail = async (email: string) => {
        // Send request to the server
        // TODO: Display error message if the request fails
        await updateProperty('email', {
            email: email
        });

        // Update the user locally
        let newUser = Object.assign({}, user);
        newUser.email = email;
        setUser(newUser);

        // Show a message
        setMessage('Email updated successfully!');
    };

    const updatePassword = async (password: string) => {

        if(password.length === 0) {
            return setMessage('Password cannot be empty!');
        }

        // Send request to the server
        // TODO: Display error message if the request fails
        await updateProperty('password', {
            password: password
        });

        // Show a message
        setMessage('Password updated successfully!');
    };

    /*
    const updateProfilePicture = async (file: File) => {

        // Read the file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        // Send request to the server
        const res = await axios.post('/api/updateProfilePicture', formData, config);
        console.log(res);
    };
    */

    const logout = async () => {
        // Send request to the server
        // TODO: Display error message if the request fails
        await axios.post('/api/logout');

        // Redirect to the login page
        router.push('/login');
    };

    return (
        <TextContainer>
            <h1>Manage Account</h1>
            <div className={styles.message}>{message}</div>
            <label className={styles.label}>Name:</label>
            <div className={styles.entry}>{user.name}</div>
            <label className={styles.label}>Surname:</label>
            <div className={styles.entry}>{user.surname}</div>
            <label className={styles.label}>E-Mail:</label>
            <div className={styles.entry}><EditableText onSubmit={updateEmail} type="email" defaultText={user.email || ''} /></div>
            <label className={styles.label}>Password:</label>
            <div className={styles.entry}><EditableText onSubmit={updatePassword} type="password" defaultText={''} hidden={true} /></div>
            <label className={styles.label}>Profile Picture:</label>
            {user.profilePicture && (
                <>
                    <br />
                    <Image src={`data:image/png;base64,${user.profilePicture}`} width={200} height={200} alt="Your profile picture" />
                </>
            )}
            <br />
            {/*<input type="file" onChange={event => event.target.files && updateProfilePicture(event.target.files[0])} />*/}
            <button className={styles.logout} onClick={logout}>Logout</button>
        </TextContainer>
    );
};

export default Home;
