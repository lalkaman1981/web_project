import { useNavigate, useLocation } from "react-router-dom";
import Header from "../global_components/header.jsx";
import styles from "../../assets/styles/login/login.module.css"

function Profile() {
    const navigate = useNavigate();

    const handleLink = (link) => {
        navigate(link);
    };

    const handleLogout = () => {
        localStorage.setItem('email', "");
        localStorage.setItem('password', "");
        navigate('/login');
    };

    return (
        <div>
            <Header/>
            <div className={styles.button_assets}>

                <button
                    type="button"
                    onClick={() => handleLink("/favorites")}
                    className={styles.button_log}
                >
                    Favorites
                </button>

                <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.button_log}
                >
                    Log out
                </button>

                <button
                    type="button"
                    onClick={() => handleLink("/delete_user")}
                    className={styles.button_log}
                >
                    Delete account
                </button>

                <button
                    type="button"
                    onClick={() => handleLink("/about_us")}
                    className={styles.button_log}
                >
                    About us
                </button>

            </div>
        </div>
    );
}

export default Profile;
