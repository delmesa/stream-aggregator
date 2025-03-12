import { useRef } from "react";
import styles from "../PlayerIFrame.module.css";
import ytStyles from "./YouTubePlayerIFrame.module.css";
import { useEffect } from "react";
import { useCallback } from "react";
import { createYouTubePlayerController } from "./YouTubePlayerController";

/**
 *
 * @returns
 */
const YouTubePlayerIFrame = ({ trackId: videoId, onPlayerReady }) => {
	const playerIframe = useRef();
	const player = useRef(null);

	const loadVideo = useCallback(() => {
		player.current.loadVideoById(videoId);
	}, [videoId]);

	const loadPlayer = useCallback(() => {
		if (!player.current) { // I think this only updates when videoId does because of the useCallback. Might be source of a future bug.
			player.current = new window.YT.Player("youtube-player", {
				playerVars: {
					"playsinline": 1,
					"controls": 1,
				},
				events: {
					onReady: (e) => {
						loadVideo();
						const playerController = createYouTubePlayerController(e.target);
						onPlayerReady(playerController);
					},
				}
			});
		} else {
			loadVideo();
		}
	}, [loadVideo, onPlayerReady]);

	useEffect(() => {
		if (!window.YT) {
			// https://developers.google.com/youtube/iframe_api_reference
			// loads the IFrame Player API code asynchronously
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.onYouTubeIframeAPIReady = loadPlayer;
		} else {
			loadPlayer();
		}
	}, [loadPlayer]);
	
    return (
		<iframe
			id="youtube-player"
			ref={playerIframe}
			className={`${styles.iframe} ${ytStyles.player}`}
			width="640"
			height="390"
			src={`http://www.youtube.com/embed/?enablejsapi=1&origin=${import.meta.env.VITE_SITE_ORIGIN}`}
		/>
	);
};

export default YouTubePlayerIFrame;
