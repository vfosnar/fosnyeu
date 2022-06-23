import { useState } from 'react';
import styles from '../styles/editable_text.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import { BiSubdirectoryRight } from 'react-icons/bi';

const TextContainer = (props: {
    defaultText: string,
    type: string,
    hidden?: boolean,
    // eslint-disable-next-line no-unused-vars
    onSubmit: (text: string) => void
}) => {
    const [editable, setEditable] = useState(false);
    const [text, setText] = useState(props.defaultText);

    /**
     * Toggle editable state
     */
    const onSubmit = () => {
        props.hidden && setText('');
        setEditable(false);
        props.onSubmit && props.onSubmit(text);
    };

    if (!editable) {
        return (
            <div className={styles.container}>
                {text}
                <AiFillEdit className={styles.edit} onClick={() => setEditable(true)}/>
            </div>
        );
    }
    else {
        return (
            <div className={styles.container}>
                <input className={styles.input} type={props.type} value={text} onChange={(event) => setText(event.target.value)} onKeyPress={event => event.key === 'Enter' && onSubmit()}/>
                <BiSubdirectoryRight className={styles.edit} onClick={onSubmit} />
            </div>
        );
    }
};

export default TextContainer;
