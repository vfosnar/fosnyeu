import type { NextPage } from 'next';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import TextContainer from '../components/TextContainer';

const Home: NextPage = () => {
    return (
        <TextContainer>
            <h1>
                <Typewriter
                    onInit={typewriter => {
                        typewriter.typeString('Vojtěch Fošnár')
                            .pauseFor(1500)
                            .deleteAll()
                            .pauseFor(100)
                            .typeString('Fošny <3')
                            .start();
                    }} />
            </h1>
            <p>Hi! I&apos;m a <Link href="https://www.spse.cz/">high school</Link> student from the Czech Republic. I&apos;m interested in programming, reverse-engineering and love open-source. You can find some of my projects on <Link href="https://git.fosny.eu/">this</Link> self-hosted git server or my <Link href="https://github.com/vfosnar">GitHub profile</Link>.</p>
            <p>If you landed on this page because one of my projects, you can consider <Link href="/donate">supporting</Link> my work.</p>
            <h2>Contact me</h2>
            <p>Feel free to contact me if you need anything, want to discuss something, or just want to talk. The preffered way would be through the <Link href="https://matrix.to/#/@vfosnar:fosny.eu">Matrix</Link>, but I also have an <Link href="mailto:vfosnar@fosny.eu">E-mail</Link>. You can also follow me on <Link href="https://c.im/@vfosnar" passHref={true}><a rel="me">Mastodon</a></Link>.</p>
            <h2>More about me</h2>
            <p>I reject <Link href="https://en.wikipedia.org/wiki/Surveillance_capitalism">Surveillance capitalism</Link>. That, in short, means providing a &quot;free&quot; service and tracking the user in exchange. I don&apos;t think regulation is the way to solve this problem, education is the key to everything.</p>
            <p>Probably every programmer likes <Link href="https://choosealicense.com/">open-source</Link> software. But I just fell in love with it. Not only it helps you learn how programs are made, it also removes the need for trust. Every program on my computer is build from source, from the kernel to the code editor. Which brings me to...</p>
            <h2>What tools do I use</h2>
            <p>Linux, Linux and once again Linux. My computer runs <Link href="https://www.gentoo.org/">Gentoo Linux</Link> with OpenRC, where every package gets build from the source code. BTW I am not a SystemD hater, OpenRC just runs faster on my laptop.</p>
            <p>KDE Plasma Desktop is my preffered DE for linux.</p>
            <p>Visual Studio Code (Code - OSS) is my primary code editor.</p>
        </TextContainer>
    );
};

export default Home;
