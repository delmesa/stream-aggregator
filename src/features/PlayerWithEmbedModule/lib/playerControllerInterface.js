/**
 * A standardized controller interface for media players.
 * @typedef {object} MediaPlayerController
 * @property {() => void} play - starts playback
 * @property {() => void} pause - pauses playback
 * @property {(seconds: number) => void} seekTo - goes to the specified position in playback
 * @property {() => number} getPlayerState - gets the current state of the video player according to the PlayerStates enums
 * @property {(type: string, listener: (Event) => void)} addEventListener - an abstraction for the underlying player object's addEventListener equivalent
 * @property {() => void} clearEventListeners - remove all associated event listeners
 */

/**
 * Enum for the player state, based on the YouTube API's specifications
 * @readonly
 * @enum {number}
 */
export const PlayerStates = Object.freeze({
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
});
