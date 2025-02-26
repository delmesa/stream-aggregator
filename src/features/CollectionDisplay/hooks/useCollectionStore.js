import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCollectionStore = create(
    persist(
        () => ({
            collections: {},
            tempCollections: {},
        }),
        { name: "user-collections" }
    )
);

export const addCollections = (newCollections) =>
    useCollectionStore.setState((state) => {
        const collections = { ...state.collections };
        newCollections.forEach((e) => {
            collections[e.id] = e;
        });
        return { ...state, collections };
    });
