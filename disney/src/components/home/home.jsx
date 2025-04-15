import React, { useEffect, useState } from 'react';

import disneyLogo from "../../assets/images/home/disney.png";
import disneyLogo2 from "../../assets/images/home/logoDisney.png";
import StarWarsLogo from "../../assets/images/home/star_wars.png";
import MarvelLogo from "../../assets/images/home/marvel.png";
import NatureLogo from "../../assets/images/home/nature.png";
import PixarLogo from "../../assets/images/home/pixar.png";
import avatarLogo from "../../assets/images/home/Avatar.png";


import homeLogo from "../../assets/images/home/home.png";
import SeriesLogo from "../../assets/images/home/tv.png";
import filmsLogo from "../../assets/images/home/movie.png";
import OriginalsLogo from "../../assets/images/home/star.png";
import SearchLogo from "../../assets/images/home/serach.png";
import PlusLogo from "../../assets/images/home/plus.png";

import PlayLogo from "../../assets/images/home/play.png";
import InfoLogo from "../../assets/images/home/info.png";


import Overlay1 from "../../assets/images/home/overlay1.png";
import Overlay2 from "../../assets/images/home/overlay1.png";
import OverlayTop from "../../assets/images/home/overlaytop.png";

import styles from "../../assets/styles/home/home.module.css";


const API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";


function Home(){
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
    
    console.log(movie)

    const bgImage = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
    const movieDecrp = `${movie.overview}`;
    
    return(
        <div className={styles.HomeContainer}>
            <img className={styles.bg_image} src={bgImage}></img>
            <img className={styles.Overlay1} src={Overlay1}></img>
            <img className={styles.Overlay2} src={Overlay2}></img>
            <img className={styles.OverlayTop} src={OverlayTop}></img>
            <header className={styles.header}>
                <nav className={styles.header_nav_left}>
                    <img className={styles.disney_logo} src={disneyLogo2}></img>
                    <a className={styles.header_link} href="#">
                        <img src={homeLogo} alt="" />
                        Home
                    </a>
                    <a className={styles.header_link} href="#">
                        <img src={SeriesLogo} alt="" />
                        Series
                    </a>
                    <a className={styles.header_link} href="#">
                        <img src={filmsLogo} alt="" />
                        Movies
                    </a>
                    <a className={styles.header_link} href="#">
                        <img src={OriginalsLogo} alt="" />
                        Originals
                    </a>
                </nav>
                <nav className={styles.header_nav_right}>
                    <a className={styles.header_link} href="#">
                        <img src={SearchLogo} alt="" />
                        Search</a>
                    <a className={styles.header_link} href="#">
                        <img src={PlusLogo} alt="" />
                        My list</a>
                    <a className={styles.header_link} href="#">
                        <img className="avatar" src={avatarLogo}></img>
                    </a>
                </nav>
            </header>

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
export default Home