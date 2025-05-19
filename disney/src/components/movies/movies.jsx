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

function Movies() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
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
        fetchMovies('/movie/now_playing?language=en-US&page=1').then(setNowPlaying);
        fetchMovies('/movie/popular?language=en-US&page=1').then(setPopular);
        fetchMovies('/movie/top_rated?language=en-US&page=1').then(setTopRated);
        fetchMovies('/movie/upcoming?language=en-US&page=1').then(setUpcoming);

        const getMovieAndLogo = async () => {
            const mostPopular = await fetchPopular(PopularType.MOVIE);
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
            <Header activePath={"/movies"} />

            <FeaturedMovie
                movie={movie}
                logoUrl={logoUrl}
                playTrailer={playTrailer}
            />

            <div className={styles.content_container}>
                <ContentRow title="Now Playing" items={nowPlaying} playTrailer={playTrailer} />
                <ContentRow title="Popular" items={popular} playTrailer={playTrailer} />
                <ContentRow title="Top Rated" items={topRated} playTrailer={playTrailer} />
                <ContentRow title="Upcoming" items={upcoming} playTrailer={playTrailer} />
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

export default Movies;
