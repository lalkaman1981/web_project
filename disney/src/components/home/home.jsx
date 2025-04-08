import disneyLogo from "../../assets/images/home/disney.png";
import StarWarsLogo from "../../assets/images/home/star_wars.png";
import MarvelLogo from "../../assets/images/home/marvel.png";
import NatureLogo from "../../assets/images/home/nature.png";
import PixarLogo from "../../assets/images/home/pixar.png";
import avatarLogo from "../../assets/images/home/Avatar.png";

import bg from "../../assets/images/home/cover.png";

import disneyLogo2 from "../../assets/images/login/Disneppp.png";

import homeLogo from "../../assets/images/home/home.png";
import SeriesLogo from "../../assets/images/home/tv.png";
import filmsLogo from "../../assets/images/home/movie.png";
import OriginalsLogo from "../../assets/images/home/star.png";

import FilmLogo from "../../assets/images/home/logo.png";

import styles from "../../assets/styles/home/home.module.css";


function Home(){
    return(
        <div className={styles.HomeContainer}>
            <img className={styles.bg_image} src={bg}></img>
            <header className={styles.header}>
                <nav class={styles.header_nav_left}>
                    <img src={disneyLogo2}></img>
                    <a className={styles.header_link} href="#">Home
                        <img src={homeLogo} alt="" />
                    </a>
                    <a className={styles.header_link} href="#">Series
                        <img src={SeriesLogo} alt="" />
                    </a>
                    <a className={styles.header_link} href="#">Movies
                        <img src={filmsLogo} alt="" />
                    </a>
                    <a className={styles.header_link} href="#">Originals
                        <img src={OriginalsLogo} alt="" />
                    </a>
                </nav>
                <nav className={styles.header_nav_right}>
                    <a className={styles.header_link} href="#">Search</a>
                    <a className={styles.header_link} href="#">My list</a>
                    <a className={styles.header_link} href="#">
                        <img className="avatar" src={avatarLogo}></img>
                    </a>
                </nav>
            </header>

            <section className={styles.film}>
                <div className={styles.film_logo_text}>
                    <img src={FilmLogo} alt="" />
                    <p className={styles.film_text}></p>
                </div>
                <div className={styles.film_bttns}>
                    <button className={styles.film_btn_play}></button>
                    <button className={styles.film_btn_info}></button>
                </div>
            </section>

            <footer className={styles.footer}>
                <a href="#">
                    <img src={disneyLogo} alt="Disney" />
                </a>
                <a href="#">
                    <img src={PixarLogo} alt="Pixar" />
                </a>
                <a href="#">
                    <img src={MarvelLogo} alt="Marvel" />
                </a>
                <a href="#">
                    <img src={StarWarsLogo} alt="Star Wars" />
                </a>
                <a href="#">
                    <img src={NatureLogo} alt="National Geographic" />
                </a>
            </footer>
        </div>
    );
}
export default Home