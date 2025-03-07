import CurrentlyPlayingModule from "@/features/CurrentlyPlayingModule/CurrentlyPlayingModule";
import styles from "./PlaySession.module.css";
import CurrentQueueModule from "@/features/CurrentQueueModule/CurrentQueueModule";
import CurrentSessionControlsModule from "@/features/CurrentSessionControlsModule/CurrentSessionControlsModule";
import { useParams } from "react-router-dom";
import { setCurrentSession } from "@/features/sessions/hooks/useSession";
import { useEffect } from "react";
import { useState } from "react";
import PlayerWithEmbedModule from "@/features/PlayerWithEmbedModule/PlayerWithEmbedModule";

/**
 * The page that holds the video player and play queue.
 * @returns {JSX.Element}
 */
const PlaySession = () => {
    const { sessionId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setCurrentSession(sessionId);
        setIsLoading(false);
    }, [sessionId]);

    return (
        <div id={styles.page}>
            <section className={styles.miniHome}>
                <p>minihome</p>
            </section>
            <section className={styles.playerArea}>
				{isLoading ? (
					<div>
						<p>...</p>
					</div>
				) : (
					<div>
						<PlayerWithEmbedModule />
					</div>
				)}
            </section>
            <section className={styles.sessionArea}>
                {isLoading ? (
                    <div>
                        <p>...</p>
                    </div>
                ) : (
                    <>
                        <CurrentlyPlayingModule />
                        <CurrentQueueModule />
                        <CurrentSessionControlsModule />
                    </>
                )}
            </section>
        </div>
    );
};

export default PlaySession;
