import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/user/user.css"

function DeleteUser({setDel}) {
    const navigate = useNavigate();
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');

    const [checkPassword, setCheckPassword] = useState("");
    const [error, setError] = useState("");

    const handlePassword = async (e) => {
        e.preventDefault();

        if (!checkPassword) {
            setError("Password is required");
            return;
        }

        if (checkPassword !== password) {
            setError("Wrong password");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/removeUser", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                navigate("/login");
            } else {
                setError("Server error occurred");
            }
        } catch {
            setError("Can't connect to server");
        }
    };

    const handleDestruction = () => {
        setDel(false);
    }

    return (
        <div className="middle_screen">
            <form onSubmit={handlePassword} className="flex_assets">
                <input
                    type="password"
                    placeholder="password"
                    required
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    className="input_delete"
                />
                {error && <p>{error}</p>}
                <button type="submit" className="button_log">
                    Delete account
                </button>
            </form>
            <button type="button" className="button_log" onClick={() => handleDestruction()}>
                Go back
            </button>
        </div>
    );
}

export default DeleteUser;
