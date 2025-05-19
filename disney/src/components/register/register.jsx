import { useState } from "react";
import { useNavigate } from "react-router-dom";
import register_styles from "../../assets/styles/register/register.module.css";
import login_styles from "../../assets/styles/login/login.module.css";
import disneyLogo from "../../assets/images/login_register/Disneppp.png";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setEmailError("");
        setPasswordError("");

        let isValid = true;

        if (!email || !password || !repeatPassword) {
            setError("Please fill in all required fields.");
            isValid = false;
        }

        if (email && !validateEmail(email)) {
            setEmailError(
                "Invalid email format. Please enter a valid email address."
            );
            isValid = false;
        }

        if (password && !validatePassword(password)) {
            setPasswordError(
                "Password must be at least 8 characters \nlong and include at least one letter and one number."
            );
            isValid = false;
        }

        if (password !== repeatPassword) {
            setError("Passwords do not match.");
            isValid = false;
        }

        if (!agree) {
            setError("You must agree to the terms to register.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Registration failed. Please try again."
                );
            }
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={login_styles.main_bg}>
            <a href="/login" className={register_styles.link_reg}>
                Login
            </a>

            <img
                className={login_styles.small_image}
                src={disneyLogo}
                alt="Disney+ Logo"
            />
            <h2 className={login_styles.log}>Create your account</h2>

            <input
                className={`${login_styles.input_log} ${
                    emailError ? register_styles.input_error_highlight : ""
                }`}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (error) setError("");
                }}
                required
                aria-describedby="email-error"
            />
            {emailError && (
                <div id="email-error" className={register_styles.error_message}>
                    {emailError}
                </div>
            )}

            <input
                className={`${login_styles.input_log} ${
                    passwordError ? register_styles.input_error_highlight : ""
                }`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                    if (error) setError("");
                }}
                required
                aria-describedby="password-error"
            />
            {passwordError && (
                <div
                    id="password-error"
                    className={register_styles.error_message}
                >
                    {passwordError}
                </div>
            )}

            <input
                className={`${login_styles.input_log} ${
                    error && error.includes("match")
                        ? register_styles.input_error_highlight
                        : ""
                }`}
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    if (error && error.includes("match")) setError("");
                    else if (error) setError("");
                }}
                required
            />

            <div className={register_styles.checkbox_container}>
                <input
                    type="checkbox"
                    id="agree-checkbox"
                    className={register_styles.checkbox_input}
                    checked={agree}
                    onChange={(e) => {
                        setAgree(e.target.checked);
                        if (error && error.includes("agree")) setError("");
                    }}
                />
                <label
                    htmlFor="agree-checkbox"
                    className={register_styles.text_reg}
                >
                    Yes! I want to receive updates, special offers, and other{" "}
                    <br />
                    information from Disney+ and the Walt Disney Family of
                    Companies.
                </label>
            </div>

            {error && <div className={register_styles.error}>{error}</div>}

            <button
                type="submit"
                className={login_styles.button_log}
                onClick={handleSubmit}
            >
                CONTINUE
            </button>
        </div>
    );
};

export default Register;
