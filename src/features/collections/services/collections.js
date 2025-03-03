import { nanoid } from "nanoid";
import { generateCollections } from "./collectionsApi";

/**
 * Invokes the creation of collections mirroring the playlists represented by the provided ids.
 * @param {string} host - the domain to which the playlist ids belong
 * @param {string[]} ids - the ids of the playlists from which to generate collections
 * @returns {object[]} the generated collections
 */
export const importCollections = (host, ids) => {
	// temporarily aliasing until back end is set up
	return generateCollections(host, ids);
};

export const localMergeCollections = (collections) => {
	const mergedContent = [];
	collections.forEach((e) => {
		mergedContent.concat(e.content);
	});

	const newMergedCollection = {
		id: nanoid(),
		externalId: null,
		_etag: null,
		title: "Untitled Merged Collection",
		itemCount: mergedContent.length,
		host: "local",
		content: mergedContent,
	};

	return newMergedCollection;
};