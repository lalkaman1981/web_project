import styles from "../../assets/styles/footer/footer.module.css";
import disneyLogo2 from "../../assets/images/login_register/Disneppp.png";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <img src={disneyLogo2} alt="Disney+" className={styles.logo} />

                <ul className={styles.links}>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Underwriting agreement</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Compatible devices</a></li>
                    <li><a href="#">About Disney+</a></li>
                    <li><a href="#">Personalized advertising</a></li>
                </ul>

                <p className={styles.info}>
                    Disney+ is a paid subscription service and its content is subject<br/> to availability.
                    The Disney+ service is marketed by Disney DTC LATAM, Inc,<br/>
                    2400 W Alameda AVE, Burbank CA 91521.
                </p>

                <p className={styles.copyright}>
                    © Disney. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
