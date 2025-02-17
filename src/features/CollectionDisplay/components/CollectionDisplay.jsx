import { useCollectionStore } from "../hooks/useCollectionStore";

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
        <div>
            {filteredCollections.map((e, i) => {
                return <p key={i}>{e.title}</p>;
            })}
        </div>
    );
};

export default CollectionDisplay;
