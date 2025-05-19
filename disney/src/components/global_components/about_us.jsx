import { useNavigate } from "react-router-dom";

import Header from "../global_components/header.jsx";
import styles from "../../assets/styles/about_us/about_us.module.css";

import Person1 from "../../assets/images/user_images/me_funny.jpg";
import Person2 from "../../assets/images/user_images/oleg.jpg";
import Person3 from "../../assets/images/user_images/vlad.jpg";

function AboutUs() {
    const navigate = useNavigate();

    const handleLink = (link) => {
        navigate(link);
    };

    return (
        <div>
            <Header />
            <div className={styles.about_us}>
                <text>Here are some information about us:</text>
                <div className={styles.images}>
                    <div className={styles.person}>
                        <img src={Person1} className={styles.pers_img} />
                        <p>Sigma 1</p>
                    </div>
                    <div className={styles.person}>
                        <img src={Person2} className={styles.pers_img} />
                        <p>Sigma 2</p>
                    </div>
                    <div className={styles.person}>
                        <img src={Person3} className={styles.pers_img} />
                        <p>Sigma 3</p>
                    </div>
                </div>
                <button
                    className={styles.go_back_btn}
                    onClick={() => handleLink("/")}
                >
                    Go back
                </button>
            </div>
        </div>
    );
}

export default AboutUs;
