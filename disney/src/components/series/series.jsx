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

import { getAllFavorites, checkUser } from '../../utils/addFavorite';

import ErrorComp from '../global_components/error.jsx';

function Series() {
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');

    const [favorites, setFavorites] = useState({ filmIds: [], seriesIds: [] });

    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            const exists = await checkUser({ email, password });
            setIsAuthenticated(exists);
            setAuthChecked(true);
        })();
    }, [email, password]);

    useEffect(() => {
        if (!isAuthenticated) return;

        const getMovieAndLogo = async () => {
            const mostPopular = await fetchPopular(PopularType.ALL);
            setMovie(mostPopular);
            const logo = await fetchLogo(mostPopular.id);
            setLogoUrl(logo);
        };
        getMovieAndLogo();

        const interval = setInterval(getMovieAndLogo, 86400000);
        return () => clearInterval(interval);
    }, [isAuthenticated]);

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

    const [airing, setAiring] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
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
        fetchMovies('/tv/airing_today?language=en-US&page=1').then(setAiring);
        fetchMovies('/tv/popular?language=en-US&page=1').then(setPopular);
        fetchMovies('/tv/top_rated?language=en-US&page=1').then(setTopRated);
        fetchMovies('/tv/on_the_air?language=en-US&page=1').then(setOnTheAir);

        const getMovieAndLogo = async () => {
            const mostPopular = await fetchPopular(PopularType.TV);
            setMovie(mostPopular);
            const logo = await fetchLogo(mostPopular.id);
            setLogoUrl(logo);
        };
        getMovieAndLogo();

        const interval = setInterval(getMovieAndLogo, 86400000);
        return () => clearInterval(interval);
    }, []);

    if (!authChecked) {
        return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return <ErrorComp error="User not found. Please log in." />;
    }

    if (!movie || !logoUrl) return <div>Loading...</div>;

    return (
        <div className={styles.OriginalsContainer}>
            <Header activePath={"/series"} />

            <FeaturedMovie
                movie={movie}
                logoUrl={logoUrl}
                playTrailer={playTrailer}
            />

            <div className={styles.content_container}>
                <ContentRow
                    title="Airing Today"
                    items={airing}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites}/>
                <ContentRow
                    title="Popular"
                    items={popular}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites}/>
                <ContentRow
                    title="Top Rated"
                    items={topRated}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites}/>
                <ContentRow
                    title="On The Air"
                    items={onTheAir}
                    playTrailer={playTrailer}
                    favorites={favorites}
                    setFavorites={setFavorites}/>
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

export default Series;
