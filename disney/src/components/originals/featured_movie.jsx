import PlayLogo from "../../assets/images/home/play.svg";
import styles from "../../assets/styles/originals/originals.module.css";

function FeaturedMovie({ movie, logoUrl, playTrailer }) {
    if (!movie || !logoUrl) return null;

    return (
        <section className={styles.film}>
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
