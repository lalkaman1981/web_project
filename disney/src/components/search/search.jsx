import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../global_components/header.jsx";
import Footer from "../global_components/footer.jsx"
import styles from "../../assets/styles/search/search.module.css";
import originalsStyles from "../../assets/styles/originals/originals.module.css";
import ContentCard from "../global_components/content_card.jsx";
import useContentRowLogic from "../../hooks/useContentRowLogic";
import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import VideoPlayer from '../global_components/video_player.jsx';
import Toast from '../global_components/toast.jsx';

import { getAllFavorites, checkUser } from '../../utils/addFavorite';
import ErrorComp from '../global_components/error.jsx';

const API_URL = "https://api.themoviedb.org/3";
const SEARCH_API = `${API_URL}/search/multi`;
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;


export default function SearchPage() {
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');
    const { state } = useLocation();
    const query = state?.query ?? "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use content row logic for preview window and hover
    const {
        hoveredItem,
        showPreview,
        previewPosition,
        showToLeft,
        previewRef,
        handleMouseEnter,
        handleMouseLeave,
        handlePreviewMouseLeave,
    } = useContentRowLogic(results, originalsStyles, results.length || 1);
    const {
        trailerKey,
        noTrailerMessage,
        playTrailer,
        closeTrailer,
        closeMessage
    } = useTrailerPlayer();

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
        if (!query) {
            setLoading(false);
            return;
        }
        setLoading(true);
        fetch(`${SEARCH_API}?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, {
            headers: {
                accept: "application/json",
                Authorization: BEARER_TOKEN,
            },
        })
            .then((r) => r.json())
            .then((data) => {
                setResults(data.results || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Search error:", err);
                setError("Failed to load results.");
                setLoading(false);
            });
    }, [query]);

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

    if (!authChecked) {
        return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return <ErrorComp error="User not found. Please log in." />;
    }

    return (
        <div className={styles.searchPage}>
            <Header />

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Results for your search: <span>“{query}”</span>
                </h1>

                {loading && <p className={styles.message}>Downloading results...</p>}
                {error && <p className={styles.messageError}>{error}</p>}

                {!loading && !error && results.length === 0 && (
                    <p className={styles.message}>No results were found.</p>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className={styles.grid}>
                        {results.map((item, index) => (
                            <ContentCard
                                key={item.id}
                                item={item}
                                index={index}
                                isPartiallyVisible={false}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                styles={originalsStyles}
                                playTrailer={playTrailer}
                            />
                        ))}
                        {showPreview && hoveredItem && (
                            <ContentCard.Preview
                                hoveredItem={hoveredItem}
                                previewRef={previewRef}
                                previewPosition={previewPosition}
                                showToLeft={showToLeft}
                                styles={originalsStyles}
                                playTrailer={playTrailer}
                                onMouseLeave={handlePreviewMouseLeave}
                                favorites={favorites}
                                setFavorites={setFavorites}
                            />
                        )}
                    </div>
                )}
            </main>
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
