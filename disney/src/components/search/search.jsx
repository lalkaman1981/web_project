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


const API_URL = "https://api.themoviedb.org/3";
const SEARCH_API = `${API_URL}/search/multi`;
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;


export default function SearchPage() {
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
