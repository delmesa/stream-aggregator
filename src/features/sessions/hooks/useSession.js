import { create } from "zustand";
import { findSessions } from "../services/sessions";

export const useSession = create(() => ({
    currentSession: null,
}));

/**
 * Gets the track represented by the current position of the session. This track object is the partial track provided by the collection object.
 * @returns {object} a partial track object from the collection
 */
export const getCurrentTrack = () => {
    return useSession.getState(
        (state) =>
            state.currentSession.collections[state.currentSession.position]
    );
};

/**
 * Sets the current track to the next track in the collection, or does nothing if already at the end.
 */
export const goToNextTrack = () => {
    useSession.getState((state) => {
		goToTrack(state.currentSession.position + 1);
	});
};

/**
 * Sets the current track to the previous track in the collection, or does nothing if already at the beginning.
 */
export const goToPreviousTrack = () => {
	useSession.getState((state) => {
		goToTrack(state.currentSession.position - 1);
	});
};

/**
 * Sets the current track to the track at the provided index in the session's associated collection.
 * @param {number} index - the index of the track
 */
export const goToTrack = (index) =>
    useSession.setState((state) => {
        if (index < 0 || index >= state.currentSession.collections.length) {
            throw new Error(
                `Track at index ${index} cannot be accessed because this index does not exist in the collection.`
            );
        }

        return {
            ...state,
            currentSession: {
                ...state.currentSession,
                position: index,
            },
        };
    });

/**
 * Sets the current session in state to the session found by the given id
 * @param {*} sessionId
 */
export const setCurrentSession = (sessionId) =>
    useSession.setState((state) => {
        if (!sessionId) return state;

        const nextSession = findSessions((e) => sessionId === e.id)[0];
        return {
            ...state,
            currentSession: nextSession,
        };
    });
