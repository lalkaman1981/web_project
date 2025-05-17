import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import PlayLogo from "../../assets/images/home/play.svg";
import InfoLogo from "../../assets/images/home/info.svg";

import Overlay1 from "../../assets/images/home/overlay1.png";
import Overlay2 from "../../assets/images/home/overlay1.png";
import OverlayTop from "../../assets/images/home/overlayTop.png";

import styles from "../../assets/styles/originals/originals.module.css";

import Header from "../global_components/header.jsx"

import VideoPlayer from '../global_components/video_player.jsx';
import Toast from '../global_components/toast.jsx';

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWMyYzUyODg1MzJhZGM1ZjFjZGYxMmMyMGZmNDM1ZSIsIm5iZiI6MTc0NDU3OTczMC40NCwic3ViIjoiNjdmYzJjOTJjMWUwYTcwOGNiYWNmMTY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QkT_EiCyUhEy5XHr04DFn6RQw9vNmgCv1QgEhzvELiI";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";


const ContentRow = ({ title, items }) => {
    const [trailerKey, setTrailerKey] = useState(null);
    const rowRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
    const [initialScrollY, setInitialScrollY] = useState(0);
    const [showToLeft, setShowToLeft] = useState(false);
    const [noTrailerMessage, setNoTrailerMessage] = useState(null);
    const itemsPerPage = 5;
    const previewRef = useRef(null);
    const previewWidth = 400;
    const previewMargin = 10;

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = items.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    useEffect(() => {
        return () => {
            if (hoverIntentTimerRef.current) {
                clearTimeout(hoverIntentTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (showPreview) {
            const handleScroll = () => {
                const scrollDiff = Math.abs(window.scrollY - initialScrollY);
                if (scrollDiff > 20) {
                    setShowPreview(false);
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [showPreview, initialScrollY]);

    const handleDotClick = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const hoverIntentTimerRef = useRef(null);
    const hoverIntentThreshold = 300;

    const handleMouseEnter = (item, event) => {
        if (hoverIntentTimerRef.current) {
            clearTimeout(hoverIntentTimerRef.current);
        }

        const currentTarget = event.currentTarget;

        hoverIntentTimerRef.current = setTimeout(() => {
            if (currentTarget.matches(':hover')) {
                const rect = currentTarget.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                const windowWidth = window.innerWidth;

                const rowRect = rowRef.current.getBoundingClientRect();
                const rowTop = rowRect.top + scrollTop;

                const wouldOverflowRight = (rect.right + previewWidth + previewMargin) > windowWidth;

                setHoveredItem(item);
                setInitialScrollY(scrollTop);
                setShowToLeft(wouldOverflowRight);

                if (wouldOverflowRight) {
                    setPreviewPosition({
                        top: rowTop + (rect.top - rowRect.top),
                        left: rect.left - previewWidth - previewMargin
                    });
                } else {
                    setPreviewPosition({
                        top: rowTop + (rect.top - rowRect.top),
                        left: rect.right + scrollLeft + previewMargin
                    });
                }

                setShowPreview(true);
            }
        }, hoverIntentThreshold);
    };

    const handleMouseLeave = (item, event) => {
        if (hoverIntentTimerRef.current) {
            clearTimeout(hoverIntentTimerRef.current);
            hoverIntentTimerRef.current = null;
        }

        if (previewRef.current && !previewRef.current.contains(event.relatedTarget)) {
            const timeout = setTimeout(() => {
                const isOverPreview = previewRef.current && previewRef.current.matches(':hover');
                if (!isOverPreview) {
                    setShowPreview(false);
                }
            }, 100);

            return () => clearTimeout(timeout);
        }
    };

    const handlePreviewMouseLeave = (event) => {
        const relatedTarget = event.relatedTarget;
        const isGoingToCard = relatedTarget && relatedTarget.classList.contains(styles.content_card);

        if (!isGoingToCard) {
            setShowPreview(false);
        }
    };


    const handlePlayClick = async (item) => {
        const endpoint = item.title
            ? `/movie/${item.id}/videos`
            : `/tv/${item.id}/videos`;

        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                }
            });
            const data = await res.json();
            const trailer = data.results.find(
                v => v.type === 'Trailer' && v.site === 'YouTube'
            );

            if (trailer) {
                setTrailerKey(trailer.key);
                setNoTrailerMessage(null);
            } else {
                setTrailerKey(null);
                setNoTrailerMessage('Trailer not available');
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
            setTrailerKey(null);
            setNoTrailerMessage('Failed to load trailer');
        }
    };


    return (
        <div className={styles.content_row} ref={rowRef}>
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
                            onMouseEnter={(e) => handleMouseEnter(item, e)}
                            onMouseLeave={(e) => handleMouseLeave(item, e)}
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
                <div
                    ref={previewRef}
                    className={`${styles.preview_window} ${showToLeft ? styles.preview_left_position : ''}`}
                    style={{
                        position: 'absolute !important',
                        top: `${previewPosition.top}px`,
                        left: `${previewPosition.left}px`,
                        transform: 'none',
                        zIndex: 1000
                    }}
                    onMouseLeave={handlePreviewMouseLeave}
                >
                    <div className={styles.preview_left}>
                        <img
                            src={`${IMAGE_BASE_URL}${hoveredItem.poster_path}`}
                            alt={hoveredItem.title || hoveredItem.name}
                        />
                    </div>
                    <div className={styles.preview_right}>
                        <h3>{hoveredItem.title || hoveredItem.name}</h3>
                        <button
                            className={styles.preview_button}
                            onClick={() => handlePlayClick(hoveredItem)}
                        >
                            Play
                        </button>
                        <button className={styles.preview_button}>Add to Favourites</button>
                    </div>
                </div>
            )}
            {trailerKey && (
                <VideoPlayer
                    videoKey={trailerKey}
                    onClose={() => setTrailerKey(null)}
                />
            )}

            {noTrailerMessage && (
                <Toast
                    message={noTrailerMessage}
                    onClose={() => setNoTrailerMessage(null)}
                />
            )}
        </div>
    );
};

function Originals() {

    const location = useLocation();
    const { email = "", password = "" } = location.state || {};

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
            <Header password={password} email={email} />

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