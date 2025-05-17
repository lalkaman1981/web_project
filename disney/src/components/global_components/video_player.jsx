import React from 'react';
import ReactPlayer from 'react-player';
import styles from "../../assets/styles/video_player/video_player.module.css";


export default function VideoPlayer({ videoKey, onClose }) {
    const embedUrl = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;

    return (
        <div className={styles.video_modal_overlay} onClick={onClose}>
            <div className={styles.video_modal_content} onClick={e => e.stopPropagation()}>
                <button className={styles.video_modal_close} onClick={onClose}>×</button>
                <ReactPlayer
                    url={embedUrl}
                    playing
                    controls
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}
