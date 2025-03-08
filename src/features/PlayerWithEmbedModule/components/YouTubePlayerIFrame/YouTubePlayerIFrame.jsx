import { useRef } from "react";
import styles from "../PlayerIFrame.module.css";
import ytStyles from "./YouTubePlayerIFrame.module.css";
import { useEffect } from "react";
import { useCallback } from "react";

/**
 *
 * @returns
 */
const YouTubePlayerIFrame = ({ trackId: videoId, shouldPlay, autoplay, setPlayerState }) => {
	const playerIframe = useRef();
	const player = useRef(null);

	const loadVideo = useCallback(() => {
		player.current.loadVideoById(videoId).playVideo();
	}, [videoId]);

	const onPlayerStateChange = useCallback(({ data }) => {
		setPlayerState(data);
	}, [setPlayerState]);

	const loadPlayer = useCallback(() => {
		if (!player.current) {
			player.current = new window.YT.Player("youtube-player", {
				playerVars: {
					"playsinline": 1,
					"controls": 1,
				},
				events: {
					onReady: loadVideo,
					onStateChange: onPlayerStateChange,
				}
			});
		} else {
			loadVideo();
		}
	}, [loadVideo, onPlayerStateChange]);

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

	useEffect(() => {
		if (!player.current) return;
		if (shouldPlay) {
			player.current.playVideo();
		} else {
			player.current.pauseVideo();
		}
	}, [loadVideo, shouldPlay]);
	
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
