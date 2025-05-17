import { useEffect, useState } from 'react';

import PlayLogo from "../../assets/images/home/play.svg";
import InfoLogo from "../../assets/images/home/info.svg";

import Overlay1 from "../../assets/images/home/overlay1.png";
import Overlay2 from "../../assets/images/home/overlay1.png";
import OverlayTop from "../../assets/images/home/overlayTop.png";

import styles from "../../assets/styles/originals/originals.module.css";

import Header from "../global_components/header.jsx"

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const ContentRow = ({ title, items }) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = items.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    const handleDotClick = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleMouseEnter = (item) => {
        const timeout = setTimeout(() => {
            setHoveredItem(item);
            setShowPreview(true);
        }, 400);
        item.hoverTimeout = timeout;
    };

    const handleMouseLeave = (item) => {
        clearTimeout(item.hoverTimeout);
        setShowPreview(false);
        setHoveredItem(null);
    };

    return (
        <div className={styles.content_row}>
            <div className={styles.content_name_and_dots}>
                <h2 className={styles.white_text}>{title}</h2>
                <div className={styles.slider_dots}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.dot} ${index === currentPage ? styles.active : ''}`}
                            onClick={() => handleDotClick(index)}
                        ></span>
                    ))}
                </div>
            </div>
            <div className={styles.content_slider}>
                <div className={styles.content_cards}>
                    {currentItems.map(item => (
                        <div
                            key={item.id}
                            className={styles.content_card}
                            onMouseEnter={() => handleMouseEnter(item)}
                            onMouseLeave={() => handleMouseLeave(item)}
                        >
                            <img
                                src={`${IMAGE_BASE_URL}${item.backdrop_path}`}
                                alt={item.title || item.name}
                            />
                            <div className={styles.card_title}>
                                {item.title || item.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showPreview && hoveredItem && (
                <div className={styles.preview_window}>
                    <div className={styles.preview_left}>
                        <img
                            src={`${IMAGE_BASE_URL}${hoveredItem.poster_path}`}
                            alt={hoveredItem.title || hoveredItem.name}
                        />
                    </div>
                    <div className={styles.preview_right}>
                        <h3>{hoveredItem.title || hoveredItem.name}</h3>
                        <button className={styles.preview_button}>Play</button>
                        <button className={styles.preview_button}>Add to Favourites</button>
                    </div>
                </div>
            )}
        </div>
    );
};

function Originals() {

    const [newContent, setNewContent] = useState([]);
    const [series, setSeries] = useState([]);
    const [movies, setMovies] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [movie, setMovie] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);

    const fetchMovies = async (endpoint, setter) => {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            const data = await response.json();
            setter(data.results);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    const fetchLogo = async (movieId) => {
        try {
            const response = await fetch(`${API_URL}/movie/${movieId}/images`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            const data = await response.json();
            const enLogos = data.logos?.filter(logo => logo.iso_639_1 === 'en');
            if (enLogos && enLogos.length > 0) {
                setLogoUrl(`${IMAGE_BASE_URL}${enLogos[0].file_path}`);
            }
        } catch (error) {
            console.error('Error fetching logo:', error);
        }
    };

    const fetchMovie = async () => {
        try {
            const response = await fetch(`${API_URL}/movie/popular?language=en-US&page=1`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            const data = await response.json();
            const mostPopularMovie = data.results[0];
            setMovie(mostPopularMovie);
            fetchLogo(mostPopularMovie.id);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        fetchMovies('/movie/now_playing?language=en-US&page=1', setNewContent);
        fetchMovies('/tv/popular?language=en-US&page=1', setSeries);
        fetchMovies('/movie/top_rated?language=en-US&page=1', setMovies);
        fetchMovies('/movie/upcoming?language=en-US&page=1', setShorts);
        fetchMovie();

        const interval = setInterval(fetchMovie, 86400000);

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
            <Header/>

            <section className={styles.film}>
                <div className={styles.film_logo_text}>
                    <img className={styles.logo_img} src={logoUrl} alt="Movie Logo" />
                    <p className={styles.film_text}>
                        {movieDecrp}
                    </p>
                </div>
                <div className={styles.film_bttns}>
                    <button className={styles.film_btn_play}>
                        <img src={PlayLogo} alt="" />
                        Watch Now
                    </button>
                    <button className={styles.film_btn_info}>
                        <img src={InfoLogo} alt="" />
                        More Information
                    </button>
                </div>
            </section>

            <div className={styles.content_container}>
                <ContentRow title="New Releases" items={newContent} />
                <ContentRow title="Series" items={series} />
                <ContentRow title="Movies" items={movies} />
                <ContentRow title="Shorts" items={shorts} />
            </div>
        </div>
    );
}


export default Originals;
export { ContentRow };