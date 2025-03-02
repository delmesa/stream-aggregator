import styles from "./PlaySession.module.css";

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
                <div className={styles.currentlyPlayingContainer}>
                    <p>currentplaying</p>
                </div>
                <div className={styles.queueContainer}>
                    <p>queue</p>
                </div>
                <div className={styles.sessionControls}>
                    <p>sessioncontrols</p>
                </div>
            </section>
        </div>
    );
};

export default PlaySession;
