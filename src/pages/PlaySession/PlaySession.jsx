import CurrentPlayingModule from "@/features/CurrentlyPlayingModule/CurrentPlayingModule";
import styles from "./PlaySession.module.css";
import CurrentQueueModule from "@/features/CurrentQueueModule/CurrentQueueModule";
import CurrentSessionControlsModule from "@/features/CurrentSessionControlsModule/CurrentSessionControlsModule";
import { useParams } from "react-router-dom";
import { setCurrentSession } from "@/features/sessions/hooks/useSession";

/**
 * The page that holds the video player and play queue.
 * @returns {JSX.Element}
 */
const PlaySession = () => {
	const { sessionId } = useParams();
	setCurrentSession(sessionId);
	
    return (
        <div id={styles.page}>
            <section className={styles.miniHome}>
                <p>minihome</p>
            </section>
            <section className={styles.playerArea}>
                <p>playerarea</p>
            </section>
            <section className={styles.sessionArea}>
                <CurrentPlayingModule />
                <CurrentQueueModule />
				<CurrentSessionControlsModule />
            </section>
        </div>
    );
};

export default PlaySession;
