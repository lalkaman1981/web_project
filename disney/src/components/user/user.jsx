import { useNavigate, useLocation } from "react-router-dom";
import Header from "../global_components/header.jsx";

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
            <div>

                <button
                    type="button"
                    onClick={() => handleLink("/favorites")}
                >
                    Favorites
                </button>

                <button
                    onClick={handleLogout}
                >
                    Log out
                </button>

                <button
                    type="button"
                    onClick={() => handleLink("/delete_user")}
                >
                    Delete account
                </button>

                <button
                    type="button"
                    onClick={() => handleLink("/about_us")}
                >
                    About us
                </button>

            </div>
        </div>
    );
}

export default Profile;
