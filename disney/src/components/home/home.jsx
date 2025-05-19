import { useEffect, useState } from 'react';

import styles from "../../assets/styles/home/home.module.css";
import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import Header from "../global_components/header.jsx";
import FeaturedMovie from '../global_components/featured_movie.jsx';
import { fetchLogo, fetchPopular, PopularType } from '../../utils/movieApi';
import VideoPlayer from '../global_components/video_player.jsx';

import { checkUser } from '../../utils/addFavorite';
import ErrorComp from '../global_components/error.jsx';


function Home() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    const [movie, setMovie] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);

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

    const {
        trailerKey,
        noTrailerMessage,
        playTrailer,
        closeTrailer,
        closeMessage
    } = useTrailerPlayer();

    useEffect(() => {
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

    if (!authChecked) {
        return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return <ErrorComp error="User not found. Please log in." />;
    }

    if (!movie || !logoUrl) return <div>Loading...</div>;

    return (
        <div className={styles.HomeContainer}>
            <Header activePath={"/"} />

            <FeaturedMovie
                movie={movie}
                logoUrl={logoUrl}
                playTrailer={playTrailer}
            />
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
        </div>
    );
}
export default Home;