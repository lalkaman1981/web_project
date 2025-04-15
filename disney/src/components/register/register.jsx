import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import register_styles from "../../assets/styles/register/register.module.css";
import login_styles from "../../assets/styles/login/login.module.css";
import disneyLogo from "../../assets/images/login/Disneppp.png";


const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!email || !password || !repeatPassword || !agree) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={login_styles.main_bg}>
    
            <a href="/login" className={register_styles.link_reg}>Login</a>

            <img className={login_styles.small_image}
                src={disneyLogo}
                alt="Disney+ Logo"
            />
            <h2 className={login_styles.log}>Enter with your email</h2>

            <input className={login_styles.input_log}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input className={login_styles.input_log}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <input className={login_styles.input_log}
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
            />

            <label>
                <input type="checkbox" class="checkbox-input" checked={agree}
                    onChange={(e) => setAgree(e.target.checked)} />
                <span className={register_styles.text_reg}>Yes! I want to receive updates, special offers, and other <br />
                    information from Disney+ and the Walt Disney Family of Companies.</span>
            </label>

            {error && <div className={register_styles.error}>{error}</div>}

            <button type="submit" className={login_styles.button_log} onClick={handleSubmit}>
                CONTINUE
            </button>
        </div>
    );
};

export default Register;