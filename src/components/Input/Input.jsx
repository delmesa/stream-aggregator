import styles from "./Input.module.css";

/**
 * JSX component for input element.
 * @param {object} props
 * @return {JSX.Element}
 */
const Input = ({ ...props }) => {
    return (
        <input
            {...props}
            className={`${styles.input} ${props.className || ""}`}
        />
    );
};

export default Input;
