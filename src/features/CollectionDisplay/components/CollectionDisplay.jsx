import { useCollectionStore } from "../hooks/useCollectionStore";
import styles from "./CollectionDisplay.module.css";

/**
 * A display that lists all user collections, applying a filter if supplied.
 *
 * @param props
 * @param {Function} props.filterPredicate
 * @returns {JSX.Element}
 */
const CollectionDisplay = ({ filterPredicate }) => {
    const collections = useCollectionStore((state) => state.collections);
    const filteredCollections = filterPredicate
        ? collections.filter(filterPredicate)
        : collections;

    return (
        <div className={styles.collectionDisplay}>
            {filteredCollections.map((e, i) => {
                return (
					<div key={i}>
						<div className={styles.itemContent}>
							<p>{e.title}</p>
						</div>
					</div>
				);
            })}
        </div>
    );
};

export default CollectionDisplay;
