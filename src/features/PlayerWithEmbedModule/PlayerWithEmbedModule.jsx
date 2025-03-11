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
import { PlayerStates } from "./constants/player";

/**
 * An embedded media player from the track's host with custom controls.
 * @returns {JSX.Element}
 */
const PlayerWithEmbedModule = () => {
    const currentTrack = useCurrentTrack();
    // only intended for the player to communicate its state—does not change actual player state
    const [playerState, setPlayerState] = useState(PlayerStates.UNSTARTED);
	const [isLoop, setIsLoop] = useState(false);
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
        }
    };

	const toggleLoop = () => setIsLoop((state => !state));

    useEffect(() => {
        if (playerState === PlayerStates.ENDED) {
			if (isLoop) {
				// go to beginning of track
			} else {
				goToNextTrack();
			}
        }
    }, [playerState, isLoop]);

    useEffect(() => {
        setShouldPlay(isAutoplay);
		setIsLoop(false);
    }, [isAutoplay, currentTrack]);

    return (
        <div className={styles.module}>
            <div className={styles.embedContainer}>
                <YouTubePlayerIFrame
                    trackId={currentTrack.externalId}
                    shouldPlay={shouldPlay}
					loop={isLoop}
                    autoplay={isAutoplay}
                    setPlayerState={setPlayerState}
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
                        (playerState === PlayerStates.BUFFERING && shouldPlay) ? (
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
