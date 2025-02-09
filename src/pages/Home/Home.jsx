import Header from './features/Header/Header';
import styles from './Home.module.css';

/**
 * The Home page. Contains details about the site and displays the playlist importer and selector.
 * @returns {JSX.Element}
 */
const Home = () => {
    return (
		<div className={styles.page}>
			<section>
				<Header />
				<p className={styles.introText}>
					Lorem ipsum odor amet, consectetuer adipiscing elit. Convallis laoreet id litora netus conubia in, ligula taciti vivamus. Lectus commodo mattis in venenatis habitant montes libero risus.
				</p>
				<main className={styles.playlistSelectionWrapper}>
					{/* playlist importer and playlist selector */}
				</main>
			</section>
			<section>
				{/* miniplayer and queue controls */}
			</section>
		</div>
	);
};

export default Home;
