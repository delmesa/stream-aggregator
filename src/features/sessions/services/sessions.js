import { nanoid } from "nanoid";

const SAVED_SESSIONS_STORAGE_KEY = "user-sessions";

/**
 * Saves the provided session into localStorage.
 * @param {*} session - a session object to save
 * @returns the saved session
 */
export const saveSession = (session) => {
	const savedSessions =
        JSON.parse(localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY)) || {};
    savedSessions[session.id] = session;

    localStorage.setItem(
        SAVED_SESSIONS_STORAGE_KEY,
        JSON.stringify(savedSessions)
    );
    return saveSession;
};

/**
 * Creates and saves a new session from a collection object.
 * @param {*} collection - a POJO collection object (either directly from the database or from a temporary collection)
 * @returns {object} the newly created session
 */
export const createSession = (collection) => {
    const newSession = {
        id: nanoid(),
        collection,
        position: 0,
        lastAccessed: Date.now(),
    };

    return saveSession(newSession);
};

/**
 * Gets all sessions saved in localStorage.
 * @returns {object} all saved sessions
 */
export const getSessions = () =>
    JSON.parse(localStorage.getItem(SAVED_SESSIONS_STORAGE_KEY));

/**
 * Gets all sessions saved in localStorage that match a provided predicate.
 * @returns {object} filtered sessions
 */
export const findSessions = (predicate) => {
    const sessions = {};
	for (const [k, v] of Object.entries(getSessions())) {
		if (!predicate(v)) continue;
		sessions[k] = v;
	}
	return sessions;
};

/**
 * Replaces the session with the given id with the provided session object. If the sessionId does not match the id field of the provided session, an error is thrown.
 * @param {string} sessionId - the id of the session to update
 * @param {object} session - the session object with which to replace the entry
 * @returns {object} the updated session
 */
export const updateSession = (sessionId, session) => {
	// the id in the session object must be the same as the provided sessionId
	if (sessionId !== session.id) {
		throw new Error("Mismatched 'sessionId' param and session.id property.");
	}

	return saveSession(session);
};

/**
 * Delete all saved sessions from localStorage.
 */
export const clearSessions = () => {
	localStorage.removeItem(SAVED_SESSIONS_STORAGE_KEY);
};
