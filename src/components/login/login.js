import { useState } from 'react';
import styles from "../../assets/styles/login.module.css";
import disneyLogo from "../../assets/images/login/Disneppp.png";


const DisneyLogin = () => {
    return (
        <div>
            <img 
                src={disneyLogo} 
                alt="Disney+ Logo" 
            />
            <h2>Log in with your email</h2>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    required
                />
                <button type="submit">
                    CONTINUE
                </button>
            </form>

            <div>
                First time on Disney+? <a href="#">Subscribe</a>
            </div>
        </div>
    );
};

export default DisneyLogin;