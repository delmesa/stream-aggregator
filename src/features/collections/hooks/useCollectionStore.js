import { create } from "zustand";
import { getCollections } from "../services/collectionsApi";

export const useCollectionStore = create(() => {
	const collections = getCollections().reduce((acc, curr) => {
		return { ...acc, [curr.id]: curr };
	}, {});
	return { collections };
});

export const addCollections = (newCollections) =>
    useCollectionStore.setState((state) => {
        const collections = { ...state.collections };
        newCollections.forEach((e) => {
            collections[e.id] = e;
        });
        return { ...state, collections };
    });
