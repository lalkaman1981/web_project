import { useEffect, useState } from 'react';

import PlayLogo from "../../assets/images/home/play.svg";

import Overlay1 from "../../assets/images/home/overlay1.png";
import Overlay2 from "../../assets/images/home/overlay2.png";
import OverlayTop from "../../assets/images/home/overlayTop.png";

import styles from "../../assets/styles/originals/originals.module.css";

import Header from "../global_components/header.jsx"
import Footer from "../global_components/footer.jsx"
import ContentRow from '../global_components/content_row.jsx';

import VideoPlayer from '../global_components/video_player.jsx';
import Toast from '../global_components/toast.jsx';
import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import { fetchMovies, fetchLogo, fetchPopularMovie, IMAGE_BASE_URL } from '../../utils/movieApi';

function Originals() {
    const [newContent, setNewContent] = useState([]);
    const [series, setSeries] = useState([]);
    const [movies, setMovies] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [movie, setMovie] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const {
        trailerKey,
        noTrailerMessage,
        playTrailer,
        closeTrailer,
        closeMessage
    } = useTrailerPlayer();

    useEffect(() => {
        fetchMovies('/movie/now_playing?language=en-US&page=1').then(setNewContent);
        fetchMovies('/tv/popular?language=en-US&page=1').then(setSeries);
        fetchMovies('/movie/top_rated?language=en-US&page=1').then(setMovies);
        fetchMovies('/movie/upcoming?language=en-US&page=1').then(setShorts);

        const getMovieAndLogo = async () => {
            const mostPopularMovie = await fetchPopularMovie();
            setMovie(mostPopularMovie);
            const logo = await fetchLogo(mostPopularMovie.id);
            setLogoUrl(logo);
        };
        getMovieAndLogo();

        const interval = setInterval(getMovieAndLogo, 86400000);
        return () => clearInterval(interval);
    }, []);

    if (!movie) return <div>Loading...</div>;
    if (!logoUrl) return <div>Loading...</div>;

    const bgImage = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
    const movieDecrp = `${movie.overview}`;

    return (
        <div className={styles.OriginalsContainer}>
            <img className={styles.bg_image} src={bgImage} alt="Background" />
            <img className={styles.Overlay1} src={Overlay1} alt="Overlay" />
            <img className={styles.Overlay2} src={Overlay2} alt="Overlay" />
            <img className={styles.OverlayTop} src={OverlayTop} alt="Overlay" />
            <Header activePath={"/originals"} />

            <section className={styles.film}>
                <div className={styles.film_logo_text}>
                    <img className={styles.logo_img} src={logoUrl} alt="Movie Logo" />
                    <p className={styles.film_text}>
                        {movieDecrp}
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
            <div className={styles.content_container}>
                <ContentRow title="New Releases" items={newContent} playTrailer={playTrailer} />
                <ContentRow title="Series" items={series} playTrailer={playTrailer} />
                <ContentRow title="Movies" items={movies} playTrailer={playTrailer} />
                <ContentRow title="Shorts" items={shorts} playTrailer={playTrailer} />
            </div>
            {trailerKey && (
                <VideoPlayer
                    videoKey={trailerKey}
                    onClose={closeTrailer}
                />
            )}
            {noTrailerMessage && (
                <Toast
                    message={noTrailerMessage}
                    onClose={closeMessage}
                />
            )}
            <Footer />
        </div>
    );
}

export default Originals;