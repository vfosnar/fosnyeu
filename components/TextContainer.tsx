import styles from '../styles/components/TextContainer.module.scss';

const TextContainer = (props: {
    children: any
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
};

export default TextContainer;
