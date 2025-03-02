import CurrentPlayingModule from "@/features/CurrentlyPlayingModule/CurrentPlayingModule";
import styles from "./PlaySession.module.css";
import CurrentQueueModule from "@/features/CurrentQueueModule/CurrentQueueModule";
import CurrentSessionControlsModule from "@/config/CurrentSessionControlsModule/CurrentSessionControlsModule";

/**
 * The page that holds the video player and play queue.
 * @returns {JSX.Element}
 */
const PlaySession = () => {
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
