import login_styles from "../../assets/styles/login/login.module.css";
import disneyLogo from "../../assets/images/login/Disneppp.png";

const DisneyLogin = () => {
    return (
        <div className={login_styles.main_bg}>
            <img className={login_styles.small_image}
                src={disneyLogo}
                alt="Disney+ Logo"
            />
            <h2 className={login_styles.log}>Log in with your email</h2>

            <input className={login_styles.input_log}
                type="email"
                placeholder="Email address"
                required
            />

            <button type="submit" className={login_styles.button_log}>
                CONTINUE
            </button>


            <div>
                <span className={login_styles.text_log}>First time on Disney+?</span>
                <a href="/registration" className={login_styles.subs}>Subscribe</a>
            </div>

        </div>
    );
};

export default DisneyLogin;