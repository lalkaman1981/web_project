import { useEffect, useState } from 'react';
import { useLocation, Link } from "react-router-dom";

import disneyLogo from "../../assets/images/home/disney.svg";
import StarWarsLogo from "../../assets/images/home/star_wars.svg";
import MarvelLogo from "../../assets/images/home/marvel.svg";
import NatureLogo from "../../assets/images/home/nature.svg";
import PixarLogo from "../../assets/images/home/pixar.svg";


import PlayLogo from "../../assets/images/home/play.svg";
import InfoLogo from "../../assets/images/home/info.svg";


import Overlay1 from "../../assets/images/home/overlay1.png";
import Overlay2 from "../../assets/images/home/overlay1.png";
import OverlayTop from "../../assets/images/home/overlayTop.png";

import styles from "../../assets/styles/home/home.module.css";

import Header from "../global_components/header.jsx"

const API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOWMyYzUyODg1MzJhZGM1ZjFjZGYxMmMyMGZmNDM1ZSIsIm5iZiI6MTc0NDU3OTczMC40NCwic3ViIjoiNjdmYzJjOTJjMWUwYTcwOGNiYWNmMTY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QkT_EiCyUhEy5XHr04DFn6RQw9vNmgCv1QgEhzvELiI";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function Home() {
    const location = useLocation();
    const { email = "", password = "" } = location.state || {};

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch("http://localhost:3000/searchUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (!resp.ok) {
                    throw new Error("User not found or unauthorized");
                }

                const data = await resp.json();
                setUserData(data);
            } catch (e) {
                setError(e.message);
            }
        }
        )();
    }, [email, password]);

    if (error) {
        return (
            <div>
                <p>No user data. Go back to <Link to="/registration">Registration</Link>.</p>
                <p><em>{error}</em></p>
            </div>
        );
    }

    const [movie, setMovie] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);

    const fetchLogo = async (movieId) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
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
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            const data = await response.json();
            const mostPopularMovie = data.results[0];
            setMovie(mostPopularMovie);
            fetchLogo(mostPopularMovie.id)
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        fetchMovie();

        const interval = setInterval(fetchMovie, 86400000);

        return () => clearInterval(interval);
    }, []);

    if (!movie) return <div>Loading...</div>;
    if (!logoUrl) return <div>Loading...</div>;

    const bgImage = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
    const movieDecrp = `${movie.overview}`;

    return (
        <div className={styles.HomeContainer}>
            <img className={styles.bg_image} src={bgImage}></img>
            <img className={styles.Overlay1} src={Overlay1}></img>
            <img className={styles.Overlay2} src={Overlay2}></img>
            <img className={styles.OverlayTop} src={OverlayTop}></img>
            <Header password={password} email={email} />

            <section className={styles.film}>
                <div className={styles.film_logo_text}>
                    <img className={styles.logo_img} src={logoUrl} alt="" />
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

            <footer className={styles.footer}>
                <button className={styles.footer_btn} href="#">
                    <img src={disneyLogo} alt="Disney" />
                </button>
                <button className={styles.footer_btn} href="#">
                    <img src={PixarLogo} alt="Pixar" />
                </button>
                <button className={styles.footer_btn} href="#">
                    <img src={MarvelLogo} alt="Marvel" />
                </button>
                <button className={styles.footer_btn} href="#">
                    <img src={StarWarsLogo} alt="Star Wars" />
                </button>
                <button className={styles.footer_btn} href="#">
                    <img src={NatureLogo} alt="National Geographic" />
                </button>
            </footer>
        </div>
    );
}
export default Home;