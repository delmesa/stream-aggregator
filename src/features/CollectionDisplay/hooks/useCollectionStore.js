import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCollectionStore = create(
	persist(
		(set) => ({
			collections: [],
			addCollection: (newCollection) => set(state => {
				const clone = state.slice();
				clone.push(newCollection);
				return clone;
			})
		}),
		{ name: "user-collections" }
	),
);