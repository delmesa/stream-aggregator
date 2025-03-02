import { nanoid } from "nanoid";
import { retrieveFromResource } from "./resources"

export const getTracks = (host, ids) => {
	if (!Object.hasOwn(retrieveFromResource, host)) {
		throw new Error(`Host '${host}' is not supported.`);
	};

	return retrieveFromResource[host].retrieveTracks(ids);
};

export const createCollections = (host, ids) => {
	if (!Object.hasOwn(retrieveFromResource, host)) {
		throw new Error(`Host '${host}' is not supported.`);
	};

	return retrieveFromResource[host].retrievePlaylists(ids);
};

export const localMergeCollections = (collections) => {
	const mergedContent = [];
	collections.forEach(e => {
		mergedContent.concat(e.content);
	});

	const newMergedCollection = {
		id: nanoid(),
		externalId: null,
		_etag: null,
		title: "Untitled Merged Collection",
		itemCount: mergedContent.length,
		host: "local",
		content: mergedContent
	}

	return newMergedCollection;
};