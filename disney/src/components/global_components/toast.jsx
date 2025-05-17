import React, { useEffect } from 'react';
import styles from "../../assets/styles/video_player/video_player.module.css";

export default function Toast({ message, onClose, duration = 1000 }) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={styles.toast}>
            {message}
        </div>
    );
}