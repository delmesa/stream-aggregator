import { getSessions } from "@/features/sessions/services/sessions";
import { retrieveFromResource } from "./resources";

const SAVED_COLLECTIONS_STORAGE_KEY = "user-collections";

// local storage behavior is temporary

/**
 * Saves the provided collection into localStorage.
 * @param {object} collection - a collection object to save
 */
export const saveNewCollections = (collections) => {
	const savedCollections =
        JSON.parse(localStorage.getItem(SAVED_COLLECTIONS_STORAGE_KEY)) || [];
    const updatedCollections = savedCollections.concat(collections);

    localStorage.setItem(
        SAVED_COLLECTIONS_STORAGE_KEY,
        JSON.stringify(updatedCollections)
    );
};

/**
 * Generates new collections from the playlists represented by the provided ids.
 * @param {string} host - the domain to which the playlist ids belong
 * @param {string[]} ids - the ids of the playlists from which to generate collections
 * @returns {object[]} the generated collections
 */
export const generateCollections = (host, ids) => {
    if (!Object.hasOwn(retrieveFromResource, host)) {
        throw new Error(`Host '${host}' is not supported.`);
    }

    return retrieveFromResource[host].generateCollections(ids)
		.then((res) => {
			saveNewCollections(res);
			return res;
		});
};

/**
 * Gets all collections saved in localStorage.
 * @returns {object[]} all saved collections
 */
export const getCollections = () =>
    JSON.parse(localStorage.getItem(SAVED_COLLECTIONS_STORAGE_KEY)) || [];

/**
 * Gets all collections saved in localStorage that match a provided predicate.
 * @returns {object[]} filtered collections
 */
export const findCollections = (predicate) => {
    const collections = [];
	for (const v of getCollections()) {
		if (!predicate(v)) continue;
		collections.push(v);
	}
	return collections;
};

// //

export const getTracks = (host, ids) => {
    if (!Object.hasOwn(retrieveFromResource, host)) {
        throw new Error(`Host '${host}' is not supported.`);
    }

    return retrieveFromResource[host].retrieveTracks(ids);
};
