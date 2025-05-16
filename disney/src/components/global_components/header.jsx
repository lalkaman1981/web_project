import React from 'react';

import disneyLogo2 from "../../assets/images/home/logoDisney.png";
import avatarLogo from "../../assets/images/home/Avatar.svg";

import homeLogo from "../../assets/images/originals/home.svg";
import SeriesLogo from "../../assets/images/home/tv.svg";
import filmsLogo from "../../assets/images/home/movie.svg";
import OriginalsLogo from "../../assets/images/originals/star.svg";
import SearchLogo from "../../assets/images/home/search.svg";
import PlusLogo from "../../assets/images/home/plus.svg";

import styles from "../../assets/styles/originals/originals.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <nav className={styles.header_nav_left}>
                <img className={styles.disney_logo} src={disneyLogo2} alt="Disney+" />
                <a className={styles.header_link} href="/">
                    <img src={homeLogo} alt="" />
                    Home
                </a>
                <a className={styles.header_link} href="/series">
                    <img src={SeriesLogo} alt="" />
                    Series
                </a>
                <a className={styles.header_link} href="/film">
                    <img src={filmsLogo} alt="" />
                    Movies
                </a>
                <a className={styles.header_link} data-special="true" href="/originals">
                    <img src={OriginalsLogo} alt="" />
                    Originals
                </a>
            </nav>
            <nav className={styles.header_nav_right}>
                <a className={styles.header_link} href="/search">
                    <img src={SearchLogo} alt="" />
                    Search
                </a>
                <a className={styles.header_link} href="/user">
                    <img className="avatar" src={avatarLogo} alt="Avatar" />
                </a>
            </nav>
        </header>
    )
}

export default Header;
