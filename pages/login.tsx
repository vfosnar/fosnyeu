import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import styles from '../styles/pages/Login.module.scss';
import { useRouter } from 'next/router';
import useUser from '../hooks/useUser';
import { useEffect } from 'react';
import LabeledTextInput from '../components/LabeledTextInput';
import Button from '../components/Button';

const Home: NextPage = () => {
    const router = useRouter();
    const { user, login } = useUser();
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Redirect to account management page
    // when user is already logged in
    useEffect(() => {
        if(user) router.push('/manage');
    }, [router, user]);

    /**
     * Handle the authentication request
     * @param event
     * @returns
     */
    const onLogin = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        // This is anti-pattern, but it solves the autofill problem
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        let success;
        try {
            success = await login(username, password);
        } catch {
            setErrorMessage('Unknown error occured');
            return;
        }

        if (success) router.push('/manage');
        else setErrorMessage('Invalid credentials');
    };

    return (
        <div className={styles.container} onSubmit={onLogin}>
            <form className={styles.form}>
                <LabeledTextInput type="text" id="username" label="username" />
                <LabeledTextInput type="password" id="password" label="password" />
                <span className={styles.error}>{errorMessage}</span>
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
};

export default Home;
