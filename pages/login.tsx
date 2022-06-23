import type { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import styles from '../styles/login.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    /**
     * Handle the authentication request
     * @param event
     * @returns
     */
    const login = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        let res;
        try {
            res = await axios.post('/api/login', {
                username: username,
                password: password
            }, {
                validateStatus: status => status === 200 || status === 401
            });

            if (res.status !== 200) {
                setErrorMessage('Invalid credentials');
                return;
            }

            router.push('/manage');
        } catch(err: any) {
            if(err.message) setErrorMessage(err.message);
            else setErrorMessage('Unknown error occurred');
        }
    };

    return (
        <div className={styles.container} onSubmit={login}>
            <form className={styles.form}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={event => setUsername(event.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={event => setPassword(event.target.value)} />
                <span className={styles.error}>{errorMessage}</span>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Home;
