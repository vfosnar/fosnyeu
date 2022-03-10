import Head from 'next/head';

const CommonHead = ( props: {
    title: string
} ) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="My personal homepage" />
            <link rel="icon" href="/favicon.svg" />
        </Head>
    );
};

export default CommonHead;
