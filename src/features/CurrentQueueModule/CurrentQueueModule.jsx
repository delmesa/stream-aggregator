import { hostNames } from "@/utils/hostNames";
import { useSession } from "../sessions/hooks/useSession";
import styles from "./CurrentQueueModule.module.css";

/**
 * Displays items in the current play queue.
 * @returns {JSX.Element}
 */
const CurrentQueueModule = () => {
    const { collection, position } = useSession((state) => state);

    return (
        <div className={styles.queueModule}>
            {collection.content.map((track, index) => (
                <div className={(index === position) && styles.activeTrack} key={index}>
                    <p className={styles.trackIndex}>{index + 1}</p>
                    <p className={styles.trackTitle}>{track.title}</p>
                    <p className={styles.trackArtist}>
                        {track.artist || "Unknown"}
                    </p>
                    <p className={styles.trackHost}>{hostNames[track.host]}</p>
                </div>
            ))}
        </div>
    );
};

export default CurrentQueueModule;
