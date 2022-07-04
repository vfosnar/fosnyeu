import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextContainer from '../components/TextContainer';
import EditableText from '../components/EditableText';
import styles from '../styles/pages/Manage.module.scss';
import Image from 'next/image';
import useUser from '../hooks/useUser';

const Home: NextPage = () => {
    const router = useRouter();
    const { user, logout, setEmail, setPassword, setProfilePicture } = useUser();
    const [message, setMessage] = useState('');

    // Check if user is logged in,
    // otherwise redirect to the login page
    useEffect(() => {
        if(!user) router.push('/login');
    }, [router, user]);
    if(!user) return null;

    const onSetEmail = async (email: string) => {

        try {
            await setEmail(email);
        } catch {
            return setMessage('Failed to change the email');
        }

        setMessage('Email updated successfully');
    };

    const onSetPassword = async (password: string) => {

        if(password.length === 0)
            return setMessage('Password cannot be empty!');

        try {
            await setPassword(password);
        } catch {
            return setMessage('Failed to change the password');
        }

        setMessage('Password updated successfully');
    };

    const onSetProfilePicture = async (file: File)  => {

        try {
            await setProfilePicture(file);
        } catch {
            return setMessage('Failed to change the image');
        }

        setMessage('Image changed successfully');
    };

    const onLogout = async () => {

        try {
            await logout();
        } catch
        {
            return setMessage('Logout failed');
        }

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
            <div className={styles.entry}><EditableText onSubmit={onSetEmail} type="email" defaultText={user.email || ''} /></div>
            <label className={styles.label}>Password:</label>
            <div className={styles.entry}><EditableText onSubmit={onSetPassword} type="password" defaultText={''} hidden={true} /></div>
            <label className={styles.label}>Profile Picture:</label>
            {user.profilePicture && (
                <>
                    <br />
                    <Image src={`data:image/png;base64,${user.profilePicture}`} width={200} height={200} alt="Your profile picture" />
                </>
            )}
            <br />
            <input type="file" onChange={event => event.target.files && onSetProfilePicture(event.target.files[0])} />
            <br />
            <button className={styles.logout} onClick={onLogout}>Logout</button>
        </TextContainer>
    );
};

export default Home;
