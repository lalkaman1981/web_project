import React from "react";
import {useLocation, Link } from 'react-router-dom';
import "../../assets/styles/user/user.css";

function Profile() {

    const location = useLocation();
    const { email = "", password = "" } = location.state || {};

    return (
        <div className="app">
            <header className="navbar">
                <div className="logo">MyApp+</div>
                <nav className="nav-links">
                    <Link to="/" state={{ email, password }}>
                        Home
                    </Link>
                    <Link to="/series" state={{ email, password }}>
                        Series
                    </Link>
                    <Link to="/movies" state={{ email, password }}>
                        Movies
                    </Link>
                    <Link to="/originals" state={{ email, password }}>
                        Originals
                    </Link>
                </nav>
            </header>
            <body>
                
            </body>
        </div>
    );
}


export default Profile;
