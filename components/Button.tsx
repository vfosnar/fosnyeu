import styles from '../styles/components/Button.module.scss';

const TextContainer = (props: {
    type?: 'button' | 'submit' | 'reset',
    children: any
}) => {
    return (
        <button className={styles.button} type={props.type}>{props.children}</button>
    );
};

export default TextContainer;
