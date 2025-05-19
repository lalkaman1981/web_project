import { useEffect, useState } from 'react';

import styles from "../../assets/styles/originals/originals.module.css";

import Header from "../global_components/header.jsx"
import Footer from "../global_components/footer.jsx"
import ContentRow from '../global_components/content_row.jsx';

import VideoPlayer from '../global_components/video_player.jsx';
import Toast from '../global_components/toast.jsx';
import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import { fetchMovies, fetchLogo, fetchPopularMovie } from '../../utils/movieApi';
import FeaturedMovie from '../global_components/featured_movie.jsx';

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