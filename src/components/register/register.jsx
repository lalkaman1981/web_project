import register_styles from "../../assets/styles/register/register.module.css";
import login_styles from "../../assets/styles/login/login.module.css";
import disneyLogo from "../../assets/images/login/Disneppp.png";


const DisneyLogin = () => {
    return (
        <div className={login_styles.main_bg}>
    
            <a href="/login" className={register_styles.link_reg}>Login</a>

            <img className={login_styles.small_image}
                src={disneyLogo}
                alt="Disney+ Logo"
            />
            <span className={login_styles.text_log}>Step 1 of 4</span>
            <h2 className={login_styles.log}>Enter with your email</h2>

            <input className={login_styles.input_log}
                type="email"
                placeholder="Email address"
                required
            />

            <label>
                <input type="checkbox" checked />
                <span className={`${register_styles.text_reg} ${login_styles.text_log}`}>Yes! I want to receive updates, special offers, and other <br />
                    information from Disney+ and the Walt Disney Family of Companies.</span>
            </label>

            <button type="submit" className={login_styles.button_log}>
                CONTINUE
            </button>

            <span className={`${register_styles.text_reg} ${login_styles.text_log}`}>Disney will use your information to personalize and enhance your Disney+ experience <br />
                and to send you information about Disney+. You <br />
                can change your communication preferences at any time. <br />
                We may use your information as described in our Privacy <br />
                Policy. By clicking Continue, you acknowledge that you have read <br />
                our Privacy Policy.</span>
        </div>
    );
};

export default DisneyLogin;