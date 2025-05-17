import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { ContentRow } from "../originals/originals.jsx";
import "../../assets/styles/user/user.css";

import Header from "../global_components/header.jsx"
import ErrorComp from "../global_components/error.jsx"

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWMyYzUyODg1MzJhZGM1ZjFjZGYxMmMyMGZmNDM1ZSIsIm5iZiI6MTc0NDU3OTczMC40NCwic3ViIjoiNjdmYzJjOTJjMWUwYTcwOGNiYWNmMTY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QkT_EiCyUhEy5XHr04DFn6RQw9vNmgCv1QgEhzvELiI";

function Favorites() {
    const location = useLocation();
    const { email = "", password = "" } = location.state || {};

    const [movieIds, setMovieIds] = useState([]);
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState("");

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

                setMovieIds(data2 || []);
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
                console.log('Obtained Film ID:', results);
                setMovies(results);
            } catch (e) {
                console.error('Error fetching movie details:', e);
                setError('Error while getting films data');
            }
        })();
    }, [movieIds]);

    if (error) {
        return (
            <ErrorComp error={error} />
        );
    }

    return (
        <div className="app">
            <Header password={password} email={email} />
            <main>
                <h2>Your favorite films</h2>
                {movies.length > 0 ? (
                    <ContentRow items={movies} />
                ) : (
                    <p>You don't have favourite films yet.</p>
                )}

                <h2>Your favorite series</h2>
                {movies.length > 0 ? (
                    <ContentRow items={movies} />
                ) : (
                    <p>You don't have favorite films yet.</p>
                )}

            </main>
        </div>
    );
}

export default Favorites;
