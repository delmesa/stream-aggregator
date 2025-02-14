import Button from "@/components/Button/Button";
import styles from "./Header.module.css";

/**
 * The site header to be shown on the Home page.
 * @return {JSX.Element}
 */
const Header = () => {
    return (
		<header className={styles.header}>
			<img />
			<div>
				<p className={styles.title}>Stream Aggregator</p>
				<p className={styles.sub}>Create the mega mix you&apos;ve always wanted.</p>
			</div>
			<Button className={styles.loginBtn}>
				<p>Register</p>
			</Button>
		</header>
	);
};

export default Header;
