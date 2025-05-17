import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../global_components/header.jsx";
import styles from "../../assets/styles/search/search.module.css";

const API_URL = "https://api.themoviedb.org/3";
const SEARCH_API = `${API_URL}/search/multi`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";
const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;


export default function SearchPage() {
    const { state } = useLocation();
    const query = state?.query ?? "";

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <Header/>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Results for your search: <span>“{query}”</span>
                </h1>

                {loading && <p className={styles.message}>Downloading results...</p>}
                {error   && <p className={styles.messageError}>{error}</p>}

                {!loading && !error && results.length === 0 && (
                    <p className={styles.message}>No results were found.</p>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className={styles.grid}>
                        {results.map((item) => {
                        const title = item.title || item.name;
                        const img   = item.backdrop_path;
                        return (
                            <div key={item.id} className={styles.card}>
                                {img ? (
                                <img
                                    src={`${IMAGE_BASE_URL}${img}`}
                                    alt={title}
                                    className={styles.cardImage}
                                />
                                ) : (
                                    <div className={styles.cardPlaceholder}>No Image</div>
                                )}
                                <div className={styles.cardTitle}>{title}</div>
                            </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
