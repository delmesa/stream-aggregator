/**
 * @param {object} player - an instance of the YouTube player
 * @returns {MediaPlayerController} a controller associated with the provided YouTube player
 */
export const createYouTubePlayerController = (player) => {
    const commonEvents = {
        onPlayerReady: "onReady",
        onStateChange: "onStateChange",
    };

    const eventHandlers = {};

    return {
        play: () => player?.playVideo(),
        pause: () => player?.pauseVideo(),
        seekTo: (seconds) => player?.seekTo(seconds),
        getPlayerState: () => player?.getPlayerState(),
        addEventListener: (type, listener) => {
            eventHandlers[type] ??= [];
            eventHandlers[type].push(listener);
            player?.addEventListener(commonEvents[type], listener);
        },
        clearEventListeners: () => {
            for (const type in eventHandlers) {
                while (eventHandlers[type].length > 0) {
                    const listener = eventHandlers[type].pop();
                    player.removeEventListener(type, listener);
                }
            }
        },
    };
};
