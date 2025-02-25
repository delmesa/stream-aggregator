import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCollectionStore = create(
	persist(
		(set) => ({
			collections: [],
			addCollections: (newCollections) => set(state => {
				const clone = state.collections.slice();
				return {...state, collections: clone.concat(newCollections)};
			})
		}),
		{ name: "user-collections" }
	),
);