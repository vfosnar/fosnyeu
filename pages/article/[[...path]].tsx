import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import CommonHead from '../../components/CommonHead';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from '../../styles/Article.module.scss';

const NAV_IMAGE_SIZE = '70rem';

const processor = unified()
    .use( remarkParse )
    .use( remarkHtml );

const Article = ( props: { html: string } ) => {
    return (
        <CommonLayout>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: props.html }} />
        </CommonLayout>
    );
};

const CommonLayout = ( props: {
    children: any
} ) => {
    const showNavIcons = useMediaQuery( 'screen and (max-width: 500px)' );

    return (
        <div className={styles.container}>
            <CommonHead title="Fosny.eu - Article" />
            <header>
                {showNavIcons ? (
                    <nav>
                        <Link href="/" passHref>
                            <Image width={NAV_IMAGE_SIZE} height={NAV_IMAGE_SIZE} src={'/favicon.svg'} alt="Home" />
                        </Link>
                    </nav>
                ):(
                    <nav>
                        <Link href="/">Home</Link>
                    </nav>
                )}
            </header>
            <main>
                {props.children}
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ( context ) => {

    const { path } = context.query as { path: string[] };
    const repositoryPath = path.join( '/' ).toLowerCase();

    // Check for malicious requests
    if ( path === undefined || repositoryPath.match( /[a-z1-9-/]+/ ) === null ) {
        return { notFound: true };
    }

    // Check if server is set up
    let markdown: string | undefined = undefined;

    if ( markdown === undefined && process.env.ARTICLES_LOCAL_PATH !== undefined ) {
        markdown = await readLocalFile( repositoryPath );
    }

    if ( markdown === undefined && process.env.ARTICLES_REPO_SERVER !== undefined && process.env.ARTICLES_REPO_OWNER !== undefined && process.env.ARTICLES_REPO_NAME !== undefined ) {
        markdown = await readGiteaFile( repositoryPath );
    }

    if ( markdown === undefined ) {
        return { notFound: true };
    }

    // Rended HTML
    const html = await processor.process( markdown );

    // Return successful response
    return {
        props: {
            html: html.toString()
        }
    };
};

const readGiteaFile = async ( repositoryPath: string ) => {

    // Make request to the git repository server
    const authorization = process.env.ARTICLES_REPO_TOKEN === undefined ? '' : `?token=${process.env.ARTICLES_REPO_TOKEN}`;
    const url = `${process.env.ARTICLES_REPO_SERVER}/api/v1/repos/${process.env.ARTICLES_REPO_OWNER}/${process.env.ARTICLES_REPO_NAME}/raw/${repositoryPath}.md${authorization}`;
    const res = await fetch( url );

    // Check response status
    if ( res.status !== 200 ) {
        return undefined;
    }

    // Generate HTML
    return await res.text();
};

const readLocalFile = async( path: string ) => {

    const filePath = `${process.env.ARTICLES_LOCAL_PATH}/${path}.md`;

    if ( !existsSync( filePath ) ) {
        return undefined;
    }

    return await readFile( filePath, {
        encoding: 'utf-8'
    } );
};

export default Article;
