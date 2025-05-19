import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import disneyLogo2 from "../../assets/images/login_register/Disneppp.png";
import avatarLogo from "../../assets/images/header_icons/Avatar.svg";

import homeLogo from "../../assets/images/header_icons/home.svg";
import homeLogoB from "../../assets/images/header_icons/home_b.svg";

import SeriesLogo from "../../assets/images/header_icons/tv.svg";
import SeriesLogoB from "../../assets/images/header_icons/tv_b.svg";

import filmsLogo from "../../assets/images/header_icons/movie.svg";
import filmsLogoB from "../../assets/images/header_icons/movie_b.svg";

import OriginalsLogo from "../../assets/images/header_icons/star.svg";
import OriginalsLogoB from "../../assets/images/header_icons/star_b.svg";

import SearchBar from "./search_bar.jsx";
import styles from "../../assets/styles/originals/originals.module.css";

import Profile from "../user/user.jsx"

function Header({ activePath = "" }) {
    const navigate = useNavigate();

    const links = [
        { path: "/", label: "Home", icon: homeLogo, activeIcon: homeLogoB },
        { path: "/series", label: "Series", icon: SeriesLogo, activeIcon: SeriesLogoB },
        { path: "/movies", label: "Movies", icon: filmsLogo, activeIcon: filmsLogoB },
        { path: "/originals", label: "Originals", icon: OriginalsLogo, activeIcon: OriginalsLogoB, special: true },
    ];

    const handleLink = (link) => navigate(link);

    const [isOpen, setIsOpen] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        function handleOutsideClick(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [isOpen]);


    const doSearch = (q) => navigate("/search", { state: { query: q } });

    const linkClass = (path) =>
        `${activePath === path ? styles.activeLink : styles.header_link}`;

    const userBGStyles = (isOpen) =>
        `${styles.header_link_one} ${isOpen === true ? styles.header_link_one_active : ""} ${styles.user_wrapper}`;

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav_left}>
                <img className={styles.disney_logo} src={disneyLogo2} alt="Disney+" />

                {links.map(({ path, label, icon, activeIcon, special }) => (
                    <a
                        key={path}
                        href={path}
                        className={linkClass(path)}
                        data-special={special || undefined}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLink(path);
                        }}
                    >
                        <img
                            src={activePath === path ? activeIcon : icon}
                            alt={label}
                        />
                        {label}
                    </a>
                ))}
            </nav>

            <nav className={styles.header_nav_right}>
                <SearchBar onSearch={doSearch} />
                <div
                    ref={wrapperRef}
                    className={userBGStyles(isOpen)}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(open => !open);
                    }}
                >
                    <img src={avatarLogo} alt="Avatar" className={styles.pointer_im} />
                    {isOpen && <div onClick={e => e.stopPropagation()}>
                        <Profile />
                    </div>}
                </div>
            </nav>
        </header>
    );
}

export default Header;
