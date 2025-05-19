import { useEffect, useState } from 'react';

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
import FeaturedMovie from './featured_movie.jsx';
import { getAllFavorites } from '../../utils/addFavorite';

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

    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');

    const [favorites, setFavorites] = useState({ filmIds: [], seriesIds: [] });

    useEffect(() => {
        async function fetchFavs() {
            try {
                const data = await getAllFavorites({ email, password });
                setFavorites(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchFavs();
    }, [email, password]);

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

    return (
        <div className={styles.OriginalsContainer}>
            <img className={styles.bg_image} src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} alt="Background" />
            <img className={styles.Overlay1} src={Overlay1} alt="Overlay" />
            <img className={styles.Overlay2} src={Overlay2} alt="Overlay" />
            <img className={styles.OverlayTop} src={OverlayTop} alt="Overlay" />
            <Header activePath={"/originals"} />

            <FeaturedMovie
                movie={movie}
                logoUrl={logoUrl}
                playTrailer={playTrailer}
            />

            <div className={styles.content_container}>
                <ContentRow
                    title="New Releases"
                    items={newContent}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
                <ContentRow
                    title="Series"
                    items={series}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
                <ContentRow title="Movies"
                    items={movies}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
                <ContentRow
                    title="Shorts"
                    items={shorts}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
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