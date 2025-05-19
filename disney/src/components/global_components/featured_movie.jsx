import PlayLogo from "../../assets/images/home/play.svg";
import styles from "../../assets/styles/originals/originals.module.css";

import Overlay1 from "../../assets/images/home/overlay1.png";
import Overlay2 from "../../assets/images/home/overlay2.png";
import OverlayTop from "../../assets/images/home/overlayTop.png";
import { IMAGE_BASE_URL } from '../../utils/movieApi';

function FeaturedMovie({ movie, logoUrl, playTrailer }) {
    if (!movie || !logoUrl) return null;

    return (
        <section className={styles.film}>
            <img className={styles.bg_image} src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} alt="Background" />
            <img className={styles.Overlay1} src={Overlay1} alt="Overlay" />
            <img className={styles.Overlay2} src={Overlay2} alt="Overlay" />
            <img className={styles.OverlayTop} src={OverlayTop} alt="Overlay" />
            <div className={styles.film_logo_text}>
                <img className={styles.logo_img} src={logoUrl} alt="Movie Logo" />
                <p className={styles.film_text}>
                    {movie.overview}
                </p>
            </div>
            <div className={styles.film_bttns}>
                <button
                    className={styles.film_btn_play}
                    onClick={() => playTrailer(movie)}
                >
                    <img src={PlayLogo} alt="" />
                    Watch Now
                </button>
            </div>
        </section>
    );
}

export default FeaturedMovie;
