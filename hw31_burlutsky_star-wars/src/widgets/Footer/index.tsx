import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <span>© {new Date().getFullYear()} Star Wars Demo</span>
                <span>Vite + React + TS</span>
            </div>
        </footer>
    );
};

export default Footer;
