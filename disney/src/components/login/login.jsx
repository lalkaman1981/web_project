import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_styles from "../../assets/styles/login/login.module.css";
import disneyLogo from "../../assets/images/login_register/Disneppp.png";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Need to add email or password");
            return;
        }

        setError("");

        try {
            const response = await fetch("http://localhost:3000/searchUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                navigate("/", {
                    state: {
                        email,
                        password
                    }
                });
            } else if (response.status === 404) {
                setError(data.error || "Wrong email or password");
            } else {
                setError("Something went wrong");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Can't connect to the server");
        }
    };

    return (
        <div className={login_styles.main_bg}>
            <img
                className={login_styles.small_image}
                src={disneyLogo}
                alt="Disney+ Logo"
            />
            <h2 className={login_styles.log}>Log in with your email</h2>

            {error && <div className={login_styles.error}>{error}</div>}

            <input
                className={login_styles.input_log}
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className={login_styles.input_log}
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="submit"
                className={login_styles.button_log}
                onClick={handleLogin}
            >
                CONTINUE
            </button>

            <div>
                <span className={login_styles.text_log}>First time on Disney+?</span>
                <a href="/registration" className={login_styles.subs}>
                    Subscribe
                </a>
            </div>
        </div>
    );
};

export default Login;
