import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/layout.module.scss';
import pfp from '../public/pfp.svg';

const Layout = (props: {
    children: any
}) => {
    return (
        <div className={styles.container}>
            <Head>
                <meta name="description" content="My personal homepage" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <div className={styles.menu}>
                <div className={styles.pfp_container}>
                    <Image className={styles.pfp} src={pfp} alt='Profile picture' priority />
                </div>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/donate">Donate</Link>
                    <Link href="https://git.fosny.eu">Projects</Link>
                    <Link href="/manage">Manage Account</Link>
                </nav>
            </div>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;
