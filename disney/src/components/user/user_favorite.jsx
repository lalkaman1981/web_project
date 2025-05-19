import { useEffect, useState } from "react";
import ContentRow from "../global_components/content_row.jsx";
import "../../assets/styles/user/user.css";
import originalStyles from "../../assets/styles/originals/originals.module.css";

import Header from "../global_components/header.jsx"
import ErrorComp from "../global_components/error.jsx"
import Footer from "../global_components/footer.jsx"

import useTrailerPlayer from '../../hooks/useTrailerPlayer';
import VideoPlayer from '../global_components/video_player.jsx';
import Toast from '../global_components/toast.jsx';

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;

function Favorites() {
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');

    const [movieIds, setMovieIds] = useState([]);
    const [movies, setMovies] = useState([]);
    const [seriesIds, setSeriesIds] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState("");
    const {
        trailerKey,
        noTrailerMessage,
        playTrailer,
        closeTrailer,
        closeMessage
    } = useTrailerPlayer();

    useEffect(() => {
        (async () => {
            try {

                const resp1 = await fetch("http://localhost:3000/searchUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (!resp1.ok) {
                    throw new Error("No such user");
                }

                const data1 = await resp1.json();

                const userId = data1.id;
                if (!userId) {
                    throw new Error("User ID is undefined");
                }

                const resp2 = await fetch("http://localhost:3000/findAllFavorites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: userId }),
                });

                if (!resp2.ok) {
                    throw new Error("can't get favorites films");
                }

                const data2 = await resp2.json();

                console.log("boba: ", data2)

                setMovieIds(data2.filmIds || []);
                setSeriesIds(data2.seriesIds || []);

            } catch (e) {
                console.error(e);
                setError(e.message);
            }
        })();
    }, [email, password]);

    useEffect(() => {
        if (movieIds.length === 0) return;
        (async () => {
            try {
                const promises = movieIds.map(id =>
                    fetch(`${API_URL}/movie/${id}`, {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${API_KEY}`,
                        },
                    }).then(res => res.json())
                );
                const results = await Promise.all(promises);
                setMovies(results);
            } catch (e) {
                setError('Error while getting films data');
            }
        })();
    }, [movieIds]);

    useEffect(() => {
        if (seriesIds.length === 0) return;
        (async () => {
            try {
                const promises = seriesIds.map(id =>
                    fetch(`${API_URL}/tv/${id}`, {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${API_KEY}`,
                        },
                    }).then(res => res.json())
                );
                const results = await Promise.all(promises);
                setSeries(results);
            } catch (e) {
                setError('Error while getting films data');
            }
        })();
    }, [seriesIds]);

    if (error) {
        return (
            <ErrorComp error={error} />
        );
    }

    return (
        <div className="app">
            <Header />
            <main>
                <div className={originalStyles.content_container}>
                    {movies.length > 0 ? (
                        <ContentRow title="Your favorite films" items={movies} playTrailer={playTrailer} />
                    ) : (
                        <p>You don't have favorite films yet.</p>
                    )}

                    {series.length > 0 ? (
                        <ContentRow title="Your favorite series" items={series} playTrailer={playTrailer} />
                    ) : (
                        <p>You don't have favorite series yet.</p>
                    )}
                </div>
            </main>
            {
                trailerKey && (
                    <VideoPlayer
                        videoKey={trailerKey}
                        onClose={closeTrailer}
                    />
                )
            }
            {
                noTrailerMessage && (
                    <Toast
                        message={noTrailerMessage}
                        onClose={closeMessage}
                    />
                )
            }
            <Footer />
        </div >
    );
}

export default Favorites;
