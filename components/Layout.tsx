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
                <link rel="icon" href="/pfp.svg" />
                <title>Fosny.eu - Vojtěch Fošnár</title>
                <meta name="description" content="My personal homepage. I'm a high school student from the Czech Republic. I'm interested in programming, reverse-engineering and love open-source." />
                <meta property="og:title" content="Fosny.eu" />
                <meta property="og:type" content="website" />
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
