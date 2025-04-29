import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { ContentRow } from "../originals/originals.jsx";
import disneyLogo from "../../assets/images/home/disney.svg";
import "../../assets/styles/user/user.css";

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWMyYzUyODg1MzJhZGM1ZjFjZGYxMmMyMGZmNDM1ZSIsIm5iZiI6MTc0NDU3OTczMC40NCwic3ViIjoiNjdmYzJjOTJjMWUwYTcwOGNiYWNmMTY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QkT_EiCyUhEy5XHr04DFn6RQw9vNmgCv1QgEhzvELiI";
const API_URL = "https://api.themoviedb.org/3";

function Profile() {
    const location = useLocation();
    const { email = "", password = "" } = location.state || {};

    const [movieIds, setMovieIds] = useState([]);
    const [movies, setMovies] = useState([]);
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
                console.log('Obtained user:', data1);
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
                    throw new Error("can't get favourites films");
                }

                const data2 = await resp2.json();
                console.log('Obtained Film ID:', data2);
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
            <div>
                <p>Error occured. go back to<Link to="/registration">Registration</Link>.</p>
                <p><em>{error}</em></p>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="navbar">
                <div className="logo">
                    <img src={disneyLogo}></img>
                </div>
                <nav className="nav-links">
                    <Link to="/" state={{ email, password }}>Home</Link>
                    <Link to="/series" state={{ email, password }}>Series</Link>
                    <Link to="/movies" state={{ email, password }}>Movies</Link>
                    <Link to="/originals" state={{ email, password }}>Originals</Link>
                </nav>
            </header>
            <main>
                <h2>Your favourite films</h2>
                {movies.length > 0 ? (
                    <ContentRow title="Favorites" items={movies} />
                ) : (
                    <p>You don't have favourite films yet.</p>
                )}
            </main>
        </div>
    );
}

export default Profile;
