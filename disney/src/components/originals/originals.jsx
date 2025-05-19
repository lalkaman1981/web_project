import { useEffect, useState } from 'react';

import styles from "../../assets/styles/originals/originals.module.css";

import Header from "../global_components/header.jsx"
import Footer from "../global_components/footer.jsx"
import ContentRow from '../global_components/content_row.jsx';

import VideoPlayer from '../global_components/video_player.jsx';
import Toast from '../global_components/toast.jsx';
import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import { fetchMovies, fetchLogo, fetchPopular, PopularType } from '../../utils/movieApi';
import FeaturedMovie from '../global_components/featured_movie.jsx';
import { getAllFavorites } from '../../utils/addFavorite';

function Originals() {
    const nextYear = new Date().getFullYear() + 1;
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [ukrainianMovies, setUkrainianMovies] = useState([]);
    const [nextYearMovies, setNextYearMovies] = useState([]);
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
        fetchMovies('/movie/popular?language=en-US&page=1').then(setPopularMovies);
        fetchMovies('/tv/popular?language=en-US&page=1').then(setPopularSeries);
        fetchMovies('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=uk').then(setUkrainianMovies);
        fetchMovies(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=${nextYear}`).then(setNextYearMovies);

        const getMovieAndLogo = async () => {
            const mostPopular = await fetchPopular(PopularType.ALL);
            setMovie(mostPopular);
            const logo = await fetchLogo(mostPopular.id);
            setLogoUrl(logo);
        };
        getMovieAndLogo();

        const interval = setInterval(getMovieAndLogo, 86400000);
        return () => clearInterval(interval);
    }, []);

    if (!movie || !logoUrl) return <div>Loading...</div>;

    return (
        <div className={styles.OriginalsContainer}>
            <Header activePath={"/originals"} />

            <FeaturedMovie
                movie={movie}
                logoUrl={logoUrl}
                playTrailer={playTrailer}
            />

            <div className={styles.content_container}>
                <ContentRow
                    title="Popular Movies"
                    items={popularMovies}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
                <ContentRow
                    title="Popular Series"
                    items={popularSeries}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
                <ContentRow title="Ukrainian Movies"
                    items={ukrainianMovies}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites} />
                <ContentRow
                    title={`Year ${nextYear} Movies`}
                    items={nextYearMovies}
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