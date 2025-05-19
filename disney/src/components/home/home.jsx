import { useEffect, useState } from 'react';

import styles from "../../assets/styles/home/home.module.css";
import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import Header from "../global_components/header.jsx";
import FeaturedMovie from '../global_components/featured_movie.jsx';
import { fetchLogo, fetchPopularMovie } from '../../utils/movieApi';
import VideoPlayer from '../global_components/video_player.jsx';


function Home() {
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