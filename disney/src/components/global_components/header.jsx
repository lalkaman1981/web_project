import { useNavigate } from "react-router-dom";
import disneyLogo2 from "../../assets/images/home/logoDisney.png";
import avatarLogo from "../../assets/images/home/Avatar.svg";

import homeLogo from "../../assets/images/originals/home.svg";
import SeriesLogo from "../../assets/images/home/tv.svg";
import filmsLogo from "../../assets/images/home/movie.svg";
import OriginalsLogo from "../../assets/images/originals/star.svg";

import SearchBar from "./search_bar.jsx";
import styles from "../../assets/styles/originals/originals.module.css";


function Header({ activePath = "" }) {
    const navigate = useNavigate();

    const handleLink = (link) => {
        navigate(link);
    };
    const doSearch = (q) => {
        navigate("/search", { state: { query: q } });
    };

    console.log(activePath)

    const linkClass = (path) =>
        `${activePath === path ? styles.activeLink : styles.header_link}`;

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav_left}>
                <img className={styles.disney_logo} src={disneyLogo2} alt="Disney+" />

                <a
                    href="/"
                    className={linkClass("/")}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLink("/");
                    }}
                >
                    <img src={homeLogo} alt="" />
                    Home
                </a>

                <a
                    href="/series"
                    className={linkClass("/series")}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLink("/series");
                    }}
                >
                    <img src={SeriesLogo} alt="" />
                    Series
                </a>

                <a
                    href="/film"
                    className={linkClass("/film")}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLink("/film");
                    }}
                >
                    <img src={filmsLogo} alt="" />
                    Movies
                </a>

                <a
                    data-special="true"
                    href="/originals"
                    className={linkClass("/originals")}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLink("/originals");
                    }}
                >
                    <img src={OriginalsLogo} alt="" />
                    Originals
                </a>
            </nav>

            <nav className={styles.header_nav_right}>
                <SearchBar onSearch={doSearch} />
                <a
                    href="/user"
                    className={styles.header_link}
                    onClick={(e) => {
                        e.preventDefault();
                        handleLink("/user");
                    }}
                >
                    <img className="avatar" src={avatarLogo} alt="Avatar" />
                </a>
            </nav>
        </header>
    );
}

export default Header;
