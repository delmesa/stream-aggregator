import { create } from "zustand";
import { findSessions } from "../services/sessions";

export const useSession = create(() => ({
    id: null,
	collection: null,
	position: 0,
	lastAccessed: 0,
}));

/**
 * Gets the track represented by the current position of the session. This track object is the partial track provided by the collection object.
 * @returns {object} a partial track object from the collection
 */
export const getCurrentTrack = () => {
    return useSession.getState(
        (state) =>
            state.collection[state.position]
    );
};

/**
 * Sets the current track to the next track in the collection, or does nothing if already at the end.
 */
export const goToNextTrack = () => {
    useSession.getState((state) => {
		goToTrack(state.position + 1);
	});
};

/**
 * Sets the current track to the previous track in the collection, or does nothing if already at the beginning.
 */
export const goToPreviousTrack = () => {
	useSession.getState((state) => {
		goToTrack(state.position - 1);
	});
};

/**
 * Sets the current track to the track at the provided index in the session's associated collection.
 * @param {number} index - the index of the track
 */
export const goToTrack = (index) =>
    useSession.setState((state) => {
        if (index < 0 || index >= state.collection.length) {
            throw new Error(
                `Track at index ${index} cannot be accessed because this index does not exist in the collection.`
            );
        };

        return {
			...state,
			position: index,
        };
    });

/**
 * Sets the current session in state to the session found by the given id
 * @param {string} sessionId
 */
export const setCurrentSession = (sessionId) =>
    useSession.setState((state) => {
        if (!sessionId) return state;
        return Object.values(findSessions((e) => sessionId === e.id))[0];
    });
