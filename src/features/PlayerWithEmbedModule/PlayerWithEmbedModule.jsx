import { useCurrentTrack } from "../sessions/hooks/useSession";
import YouTubePlayerIFrame from "./components/YouTubePlayerIFrame/YouTubePlayerIFrame";
import styles from "./PlayerWithEmbedModule.module.css";

/**
 * An embedded media player from the track's host with custom controls.
 * @returns {JSX.Element}
 */
const PlayerWithEmbedModule = () => {
	const currentTrack = useCurrentTrack();

    return (
		<div className={styles.module}>
			<div className={styles.embedContainer}>
				<YouTubePlayerIFrame 
					trackId={currentTrack.externalId}
				/>
			</div>
			<div className={styles.playerControls}>

			</div>
		</div>
	);
};

export default PlayerWithEmbedModule;
