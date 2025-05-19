import { useNavigate } from "react-router-dom";

import Header from "../global_components/header.jsx"
import styles from "../../assets/styles/about_us/about_us.module.css";

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
                <div>

                </div>
                <button type="button" onClick={() => handleLink("/")}>
                    Go back
                </button>
            </div>
        </div>
    );
}

export default AboutUs;