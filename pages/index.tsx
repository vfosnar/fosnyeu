import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import styles from '../styles/Home.module.scss';
import school_logo from '../public/school_logo.png';
import Link from 'next/link';

const CONTACT_LOGO_SIZE = "120rem";
const SCHOOL_LOGO_SIZE = "250rem";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fosny.eu</title>
        <meta name="description" content="My personal homepage" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header>
        <h1>
        <Typewriter
          onInit={( ( typewriter ) => {
            typewriter
              .typeString( `Hi, my name is <span class="${styles.my_name}">Vojtěch Fošnár</span>.` )
              .pauseFor( 1500 )
              .deleteChars( 'Vojtěch Fošnár.'.length )
              .pauseFor( 100 )
              .typeString( `<span class="${styles.my_name}">Fošny</span>!` )
              .start();
            } )}>
        </Typewriter>
        </h1>
      </header>

      <section className={styles.contacts}>
        <h1>Contacts</h1>
        <div className={styles.button_row}>
          <a href="https://matrix.to/#/@vfosnar:matrix.org">
            <Image height={CONTACT_LOGO_SIZE} width={CONTACT_LOGO_SIZE} src="/logos/matrix.svg" alt="Matrix logo" />
            <h2>Matrix</h2>
          </a>
          <a href="mailto:v.fosnar@protonmail.com">
            <Image height={CONTACT_LOGO_SIZE} width={CONTACT_LOGO_SIZE} src="/logos/protonmail.svg" alt="ProtonMail logo" />
            <h2>Email</h2>
          </a>
          <a href="https://t.me/vfosnar">
            <Image height={CONTACT_LOGO_SIZE} width={CONTACT_LOGO_SIZE} src="/logos/telegram.svg" alt="Telegram logo" />
            <h2>Telegram</h2>
          </a>
        </div>
      </section>

      <section className={styles.about_me}>
        <h1>Something About Me</h1>
        <div className={styles.row}>
          <p>I am an IT student at <Link href="https://www.spse.cz">School of Electrical Engineering</Link> in Pardubice with specialization on software development and web design. I am commited to writing code that is licensed only under FOSS license.</p>
          <Image src={school_logo} height={SCHOOL_LOGO_SIZE} width={SCHOOL_LOGO_SIZE} layout="fixed" alt="School logo" />
        </div>
      </section>

      <section className={styles.projects}>
        <h1>My Projects</h1>
        <div className={styles.row}>
          <a href="https://git.fosny.eu/vfosnar/NumberDocker">
            <h2>Number</h2>
            <p>Number, the open-source alternative to Spotify, designed to be self-hosted from ground up.</p>
          </a>
          <a href="https://git.fosny.eu/vfosnar/MusicLib">
            <h2>MusicLib</h2>
            <p>Automatic music downloader! Part of Number but capable enough to be its own separate project.</p>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
