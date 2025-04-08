import disneyLogo from "../../assets/images/home/disney.png";
import disneyLogo2 from "../../assets/images/home/logoDisney.png";
import StarWarsLogo from "../../assets/images/home/star_wars.png";
import MarvelLogo from "../../assets/images/home/marvel.png";
import NatureLogo from "../../assets/images/home/nature.png";
import PixarLogo from "../../assets/images/home/pixar.png";
import avatarLogo from "../../assets/images/home/Avatar.png";

import bg from "../../assets/images/home/cover.png";

import homeLogo from "../../assets/images/home/home.png";
import SeriesLogo from "../../assets/images/home/tv.png";
import filmsLogo from "../../assets/images/home/movie.png";
import OriginalsLogo from "../../assets/images/home/star.png";
import SearchLogo from "../../assets/images/home/serach.png";
import PlusLogo from "../../assets/images/home/plus.png";

import PlayLogo from "../../assets/images/home/play.png";
import InfoLogo from "../../assets/images/home/info.png";


import FilmLogo from "../../assets/images/home/Movielogo.png";

import styles from "../../assets/styles/home/home.module.css";


function Home(){
    const filmDescr = "La película de Disney y Pixar “Luca” está ambientada en un pueblo de la costa italiana y cuenta la historia de un adolescente que pasa un verano inolvidable lleno de aventuras junto con su nuevo amigo Alberto.";
    return(
        <div className={styles.HomeContainer}>
            <img className={styles.bg_image} src={bg}></img>
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
                    <img src={FilmLogo} alt="" />
                    <p className={styles.film_text}>
                        {filmDescr}
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