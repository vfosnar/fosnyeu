import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/layout.module.scss';
import pfp from '../public/pfp.svg';
import useUser from '../hooks/useUser';

const Layout = (props: {
    children: any
}) => {
    const { user } = useUser();

    const picture = user?.profilePicture ? (
        `data:image/png;base64,${user.profilePicture}`
    ) : pfp;

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/pfp.svg" />
                <title>Fosny.eu - Vojtěch Fošnár</title>
                <meta name="description" content="My personal homepage. I'm a high school student from the Czech Republic. I'm interested in programming, reverse engineering and love open source." />
                <meta property="og:title" content="Fosny.eu" />
                <meta property="og:type" content="website" />
                <meta name="og:description" content="My personal homepage. I'm a high school student from the Czech Republic. I'm interested in programming, reverse engineering and love open source." />
            </Head>
            <div className={styles.menu}>
                <div className={styles.pfp_container}>
                    <Image width="100%" height="100%" layout="responsive" objectFit="contain" src={picture} alt='Profile picture' priority />
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
