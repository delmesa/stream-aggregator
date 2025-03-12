import { useState } from "react";
import {
    goToNextTrack,
    goToPreviousTrack,
    useCurrentTrack,
} from "../sessions/hooks/useSession";
import YouTubePlayerIFrame from "./components/YouTubePlayerIFrame/YouTubePlayerIFrame";
import styles from "./PlayerWithEmbedModule.module.css";
import Button from "@/components/Button/Button";
import { useEffect } from "react";
import { PlayerStates } from "./lib/playerControllerInterface";

/**
 * An embedded media player from the track's host with custom controls.
 * @returns {JSX.Element}
 */
const PlayerWithEmbedModule = () => {
    const currentTrack = useCurrentTrack();
	const [playerController, setPlayerController] = useState(null);
    // only intended for the player to communicate its state—does not change actual player state
    const [playerState, setPlayerState] = useState(PlayerStates.UNSTARTED);
	const [nextStateIsPlay, setNextStateIsPlay] = useState(false);
	const [isLoop, setIsLoop] = useState(false);
    const [isAutoplay, setIsAutoplay] = useState(true);

	// handle necessary event setup when the player controller changes
	useEffect(() => {
		if (!playerController) return;

		if (playerController) {
			playerController.addEventListener("onStateChange", 
				({ data }) => setPlayerState(data));
		}

		return () => playerController.clearEventListeners();
	}, [playerController]);

    // functions that alter the playstate aren't guaranteed to change the actual state of the player
    const togglePlayState = () => {
		if (!playerController) return;

        switch (playerController.getPlayerState()) {
            case PlayerStates.PLAYING:
				playerController.pause();
				setNextStateIsPlay(false);
				break;
            case PlayerStates.PAUSED:
				playerController.play();
				setNextStateIsPlay(true);
                break;
            case PlayerStates.BUFFERING:
                // need to handle this weird because "buffering" is not a true state
				// but YT includes it anyway
				setNextStateIsPlay(state => !state);
                break;
            default:
                playerController.play();
				setNextStateIsPlay();
        }
    };

	const toggleLoop = () => setIsLoop((state => !state));

    useEffect(() => {
        if (playerState === PlayerStates.ENDED) {
			if (isLoop) {
				playerController.seekTo(0);
			} else if (isAutoplay) {
				goToNextTrack();
			}
        }
    }, [playerState, isLoop, isAutoplay, playerController]);

    return (
        <div className={styles.module}>
            <div className={styles.embedContainer}>
                <YouTubePlayerIFrame
                    trackId={currentTrack.externalId}
                    onPlayerReady={setPlayerController}
                />
            </div>
            <div className={styles.playerControls}>
                <div className={styles.settings}>
					<Button id={styles.loopBtn} onClick={toggleLoop}>
                        <span className="material-icons">{isLoop ? "repeat_one_on" : "repeat_one"}</span>
                    </Button>
                    <Button id={styles.prevTrackBtn} onClick={goToPreviousTrack}>
                        <span className="material-icons">skip_previous</span>
                    </Button>
                    <Button id={styles.playBtn} onClick={togglePlayState}>
                        {playerState === PlayerStates.PLAYING ||
                        (playerState === PlayerStates.BUFFERING && nextStateIsPlay) ? (
                            <span className="material-icons">pause</span>
                        ) : (
                        	<span className="material-icons">play_arrow</span>
                        )}
                    </Button>
                    <Button id={styles.nextTrackBtn} onClick={goToNextTrack}>
						<span className="material-icons">skip_next</span>
                    </Button>
					<Button id={styles.volumeBtn} onClick={() => {}}>
						<span className="material-icons">volume_up</span>
                    </Button>
                </div>
                <div className={styles.progressBar}></div>
            </div>
        </div>
    );
};

export default PlayerWithEmbedModule;
