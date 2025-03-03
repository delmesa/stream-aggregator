import CollectionDisplay from '@/features/collections/components/CollectionDisplay/CollectionDisplay';
import Header from './features/Header/Header';
import styles from './Home.module.css';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { addCollections } from '@/features/collections/hooks/useCollectionStore';
import { importCollections, mergeCollections } from '@/features/collections/services/collections';
import Footer from './features/Footer/Footer';
import { useState } from 'react';
import { createSession } from '@/features/sessions/services/sessions';
import { useNavigate } from 'react-router-dom';

/**
 * The Home page. Contains details about the site and displays the playlist importer and selector.
 * @returns {JSX.Element}
 */
const Home = () => {
	const navigate = useNavigate();
	const [selectedCollectionIds, setSelectedCollectionIds] = useState([]); 

	const filterBySelected = (collection) => {
		return selectedCollectionIds.some((id) => collection.id === id);
	};

	const toggleCollectionSelected = (collection) => {
		setSelectedCollectionIds((state) => {
			if (state.some(id => collection.id === id)) {
				return state.filter((id) => collection.id !== id);
			} else {
				return [...state, collection.id];
			}
		});
	};

	const onImporterSubmit = (e) => {
		e.preventDefault();
		const inputElement = e.target.querySelector("input");
		const inputText = (new FormData(e.target)).get("playlistId").trim();
		if (inputText === "") return;

		// playlist host hardcoded for now
		importCollections("youtube", [inputText]).then(res => {
			addCollections(res);
			inputElement.value = "";
		}).catch(error => {
			console.log(error);
		});
	};

	const onShuffleAction = () => {
		if (selectedCollectionIds.length === 0) return;
		const newSession = createSession(mergeCollections(selectedCollectionIds));
		navigate("/player/" + newSession.id);
	}

    return (
		<div id={styles.page}>
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
							<CollectionDisplay 
								className={styles.collectionPicker}
								filterPredicate={filterBySelected}
								hideRest={false}
								onClickItem={toggleCollectionSelected}
								noContentMessage={"No collections found. Import a playlist to save it as a new collection."}
							/>
							<CollectionDisplay 
								className={styles.collectionPicker}
								filterPredicate={filterBySelected}
								onClickItem={toggleCollectionSelected}
								noContentMessage={"Select at least 1 collection to get started."}
							/>
							<Button onClick={onShuffleAction}>Shuffle</Button>
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
