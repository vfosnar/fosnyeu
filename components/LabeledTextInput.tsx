import { HTMLInputTypeAttribute } from 'react';
import styles from '../styles/components/LabeledTextInput.module.scss';

const TextContainer = (props: {
    id: string,
    label: string,
    type: HTMLInputTypeAttribute
}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={props.id}>{props.label}</label>
            <input type={props.type} name={props.id} id={props.id} />
        </div>
    );
};

export default TextContainer;
