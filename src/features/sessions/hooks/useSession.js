import { create } from "zustand";
import { findSessions, updateSession } from "../services/sessions";
import { shuffle } from "@/utils/shuffle";
import { useState } from "react";
import { useEffect } from "react";

const DEFAULT_SESSION_STATE = {
    id: null,
	collection: {},
	position: 0,
	lastAccessed: 0,
};

export const useSession = create(() => (DEFAULT_SESSION_STATE));

/**
 * Custom hook for current track so components that rely on the current track can hook into the state.
 */
export const useCurrentTrack = () => {
	const [track, setTrack] = useState(getCurrentTrack());

	useEffect(() => useSession.subscribe(() => {
		setTrack(getCurrentTrack());
	}))

	return track;
};

/**
 * Gets the track represented by the current position of the session. This track object is the partial track provided by the collection object.
 * @returns {object} a partial track object from the collection
 */
export const getCurrentTrack = () => {
    const state = useSession.getState();
	return state.collection.content?.[state.position];
};

/**
 * Sets the current track to the next track in the collection, or does nothing if already at the end.
 */
export const goToNextTrack = () => {
	const state = useSession.getState();
	goToTrack(Math.min(state.position + 1, state.collection.content.length - 1));
}

/**
 * Sets the current track to the previous track in the collection, or does nothing if already at the beginning.
 */
export const goToPreviousTrack = () =>
	goToTrack(Math.max(0, useSession.getState().position - 1));

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

        const newState = { ...state, position: index };
		updateSession(state.id, newState);
		return newState;
    });

/**
 * Shuffles the tracks in this session's collection.
 */
export const shuffleTracks = () =>
	useSession.setState((state) => {
		const newState = {
			...state,
			collection: {
				...state.collection,
				content: shuffle(state.collection.content)
			},
			position: 0
		}

		updateSession(state.id, newState);
		return newState;
	});

/**
 * Sets the current session in state to the session found by the given id
 * @param {string} sessionId
 */
export const setCurrentSession = (sessionId) =>
    useSession.setState(() => {
        if (!sessionId) return DEFAULT_SESSION_STATE;
        return Object.values(findSessions((e) => sessionId === e.id))[0] || DEFAULT_SESSION_STATE;
    });
