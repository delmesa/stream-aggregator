import CollectionDisplay from '@/features/CollectionDisplay/components/CollectionDisplay';
import Header from './features/Header/Header';
import styles from './Home.module.css';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useCollectionStore } from '@/features/CollectionDisplay/hooks/useCollectionStore';
import { createCollections } from '@/features/CollectionDisplay/services/collectionApi';
import Footer from './features/Footer/Footer';

/**
 * The Home page. Contains details about the site and displays the playlist importer and selector.
 * @returns {JSX.Element}
 */
const Home = () => {
	const addCollections = useCollectionStore(state => state.addCollections);

	const onImporterSubmit = (e) => {
		e.preventDefault();
		const inputText = (new FormData(e.target)).get("playlistId").trim();
		if (inputText === "") return;

		// playlist host hardcoded for now
		createCollections("youtube", [inputText]).then(res => {
			addCollections(res);
		}).catch(error => {
			console.log(error);
		});
	};

    return (
		<div className={styles.page}>
			<section className={styles.home}>
				<Header />
				<div className={styles.centerContent}>
					<p className={styles.introText}>
						Lorem ipsum odor amet, consectetuer adipiscing elit. Convallis laoreet id litora netus conubia in, ligula taciti vivamus. Lectus commodo mattis in venenatis habitant montes libero risus.
					</p>
					<main className={styles.collectionSelectionWrapper}>
						{/* playlist importer and playlist selector */}
						<form className={styles.importerForm} id="importer" onSubmit={onImporterSubmit}>
							<Input name="playlistId" placeholder="Insert a playlist id" />
							<Button type="submit" id="importer">Import</Button>
						</form>
						<div>
							<CollectionDisplay />
							<CollectionDisplay />
							<Button>Shuffle</Button>
						</div>
					</main>
				</div>
				<Footer />
			</section>
			<section className={styles.sideBar}>
				{/* miniplayer and queue controls */}
			</section>
		</div>
	);
};

export default Home;
