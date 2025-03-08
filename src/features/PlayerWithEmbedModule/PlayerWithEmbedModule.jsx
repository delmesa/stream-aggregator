import { useState } from "react";
import { goToNextTrack, goToPreviousTrack, useCurrentTrack } from "../sessions/hooks/useSession";
import YouTubePlayerIFrame from "./components/YouTubePlayerIFrame/YouTubePlayerIFrame";
import styles from "./PlayerWithEmbedModule.module.css";
import Button from "@/components/Button/Button";
import { useEffect } from "react";

/**
 * Enum for the player state, based on the YouTube API's specifications
 * @readonly
 * @enum {number}
 */
const PlayerStates = Object.freeze({
	UNSTARTED: -1,
	ENDED:      0,
	PLAYING:    1,
	PAUSED:     2,
	BUFFERING:  3,
	CUED:       5,
});

/**
 * An embedded media player from the track's host with custom controls.
 * @returns {JSX.Element}
 */
const PlayerWithEmbedModule = () => {
	const currentTrack = useCurrentTrack();
	// only intended for the player to communicate its state—does not change actual player state
	const [playerState, setPlayerState] = useState(PlayerStates.UNSTARTED);
	const [isAutoplay, setIsAutoplay] = useState(true);
	const [shouldPlay, setShouldPlay] = useState(isAutoplay);

	// functions that alter the playstate aren't guaranteed to change the actual state of the player
	const togglePlayState = () => {
		switch (playerState) {
			case PlayerStates.PLAYING:
			case PlayerStates.PAUSED:
				setShouldPlay(playerState - 1); // only works because of specific enum values
				break;
			case PlayerStates.BUFFERING:
				setShouldPlay((state) => !state);
				break;
			default:
				setShouldPlay(true);
		};
	};

	useEffect(() => {
		if (playerState === PlayerStates.ENDED) {
			goToNextTrack();
		};
	}, [playerState]);

	useEffect(() => {
		setShouldPlay(isAutoplay);
	}, [isAutoplay, currentTrack]);

    return (
		<div className={styles.module}>
			<div className={styles.embedContainer}>
				<YouTubePlayerIFrame 
					trackId={currentTrack.externalId}
					shouldPlay={shouldPlay}
					autoplay={isAutoplay}
					setPlayerState={setPlayerState}
				/>
			</div>
			<div className={styles.playerControls}>
				<div className={styles.settings}>
					<Button id={styles.prevTrackBtn} onClick={goToPreviousTrack}>
						Previous
					</Button>
					<Button id={styles.playBtn} onClick={togglePlayState}>
						Play
					</Button>
					<Button id={styles.nextTrackBtn} onClick={goToNextTrack}>
						Next
					</Button>
				</div>
				<div className={styles.progressBar}></div>
			</div>
		</div>
	);
};

export default PlayerWithEmbedModule;
