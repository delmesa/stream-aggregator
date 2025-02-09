import styles from "./Button.module.css";

/**
 * JSX component for button element.
 * @param {object} props
 * @param {Node} props.children
 * @return component
 */
const Button = ({ children, ...props }) => {
    return (
        <button
			{...props}
			className={`${styles.button} ${props.className || ""}`}
        >
            {children}
        </button>
    );
};

export default Button;
