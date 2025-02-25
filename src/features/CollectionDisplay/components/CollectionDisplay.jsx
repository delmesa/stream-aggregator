import { useCollectionStore } from "../hooks/useCollectionStore";
import styles from "./CollectionDisplay.module.css";

/**
 * A display that lists all user collections, applying a filter if supplied.
 *
 * @param props
 * @param {Function} props.filterPredicate
 * @param {Function} props.onClickItem - The action to run when an item of the display is clicked. Provides the relevant collection object.
 * @param {string} props.hideRest - When true (default), does not show filtered out elements in display. When false, matching elements will have a special style applied.
 * @param {string} props.noContentMessage
 * @returns {JSX.Element}
 */
const CollectionDisplay = ({
    filterPredicate = () => true,
    onClickItem = () => {},
    hideRest = true,
    noContentMessage,
	...props
}) => {
    const collections = useCollectionStore((state) => state.collections);
    // const filteredCollections = filterPredicate
    //     ? collections.filter(filterPredicate)
    //     : collections;

    const hasContent =
        (!hideRest && collections.length) || collections.some(filterPredicate);

    return hasContent ? (
        <div {...props} className={`${styles.collectionDisplay} ${props.className || ""}`}>
            {collections.map((e, i) => {
                const isFilterMatch = filterPredicate(e);
                if (hideRest && !isFilterMatch) return;
                return (
                    <div
                        key={i}
                        data-matches-filter={isFilterMatch}
                        onClick={() => onClickItem(e)}
                    >
                        <div className={styles.itemContent}>
                            <p>{e.title}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <div {...props} className={`${styles.collectionDisplay} ${styles.noContent} ${props.className || ""}`}>
            <p>{noContentMessage}</p>
        </div>
    );
};

export default CollectionDisplay;
