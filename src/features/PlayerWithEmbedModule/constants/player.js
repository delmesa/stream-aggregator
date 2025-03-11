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
