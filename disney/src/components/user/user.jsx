import { useNavigate } from "react-router-dom";
import { useState} from "react";
import "../../assets/styles/user/user.css"
import DeleteUser from"./delete_user.jsx"

function Profile() {
    const navigate = useNavigate();

    const [isDelOpen, setDel] = useState(false);

    const handleLink = (link) => {
        navigate(link);
    };

    const handleLogout = () => {
        localStorage.setItem('email', "");
        localStorage.setItem('password', "");
        navigate('/login');
    };

    const handleDelete = (isDelOpen) => {
        setDel(!isDelOpen);
        console.log(isDelOpen);
    }

    return (
        <div className="button_assets">

            <button
                type="button"
                onClick={() => handleLink("/favorites")}
                className="button_log pointer_btn"
            >
                Favorites
            </button>

            <button
                type="button"
                onClick={handleLogout}
                className="button_log pointer_btn"
            >
                Log out
            </button>

            <button
                type="button"
                onClick={() => handleDelete(isDelOpen)}
                className="button_log pointer_btn"
            >
                Delete account
            </button>

            <button
                type="button"
                onClick={() => handleLink("/about_us")}
                className="button_log pointer_btn"
            >
                About us
            </button>

            {isDelOpen && <DeleteUser setDel={setDel} />}
        </div>
    );
}

export default Profile;
