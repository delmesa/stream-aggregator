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
