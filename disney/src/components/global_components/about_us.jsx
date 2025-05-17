import { useNavigate } from "react-router-dom";

import Header from "../global_components/header.jsx"

function AboutUs() {

    const navigate = useNavigate();

    const handleLink = (link) => {
        navigate(link);
    };

    return (
        <div>
            <Header/>
            <div>
                <text>
                    Here are some information about us:
                </text>
                <button type="button" onClick={() => handleLink("/user")}>
                    Go back
                </button>
            </div>
        </div>
    );
}

export default AboutUs;