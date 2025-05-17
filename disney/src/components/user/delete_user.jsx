import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../global_components/header.jsx";

function DeleteUser() {
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

        console.log(email);

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

    const handleLink = (link) => {
        navigate(link);
    };

    return (
        <div>
            <Header/>
            <div>
                <form onSubmit={handlePassword}>
                    <input
                        type="password"
                        placeholder="password"
                        required
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                    />
                    {error && <p>{error}</p>}
                    <button type="submit">
                        Delete account
                    </button>
                </form>
                <button type="button" onClick={() => handleLink("/user")}>
                    Go back
                </button>
            </div>
        </div>
    );
}

export default DeleteUser;
