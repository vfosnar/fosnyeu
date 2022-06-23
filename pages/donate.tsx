import type { NextPage } from 'next';
import Link from 'next/link';
import TextContainer from '../components/TextContainer';

const Home: NextPage = () => {
    return (
        <TextContainer>
            <h1>Donate</h1>
            <p>Thanks for considering a donation! Every little bit helps me keep the work going. Your support is very much appreciated.</p>
            <ul>
                <li>you can <Link href="https://www.buymeacoffee.com/vfosnar">buy me a coffee</Link></li>
                <li>send Bitcoin: 32GQpF1hwKuC8TJoQBzXM8xCErox7qWTHS</li>
                <li>send Ethereum: 0xb436a92DAa7bE453BBB484c185B94d26a0A169f2</li>
            </ul>
        </TextContainer>
    );
};

export default Home;
