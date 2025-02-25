import { useCollectionStore } from "../hooks/useCollectionStore";
import styles from "./CollectionDisplay.module.css";

/**
 * A display that lists all user collections, applying a filter if supplied.
 *
 * @param props
 * @param {Function} props.filterPredicate
 * @returns {JSX.Element}
 */
const CollectionDisplay = ({ filterPredicate, noContentMessage }) => {
    const collections = useCollectionStore((state) => state.collections);
    const filteredCollections = filterPredicate
        ? collections.filter(filterPredicate)
        : collections;

    return filteredCollections.length > 0 ? (
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
    ) : (
        <div
            className={`${styles.collectionDisplay} ${styles.noContent}`}
        >
			<p>{noContentMessage}</p>
		</div>
    );
};

export default CollectionDisplay;
