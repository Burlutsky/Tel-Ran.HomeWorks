import { Outlet } from 'react-router-dom';
import Header from '@widgets/Header';
import Footer from '@widgets/Footer';
import styles from './MainLayout.module.css';

const MainLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={`${styles.main} container`}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
