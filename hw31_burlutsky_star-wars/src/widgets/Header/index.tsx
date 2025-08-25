// src/widgets/Header/index.tsx
import Navigation from '@widgets/Navigation';
import { useContext } from 'react';
import { SWContext } from '@shared/lib/SWContext';
import { useMainHero } from '@shared/lib/hooks';
import { friends } from '@shared/config/friends';
import styles from './Header.module.css';

const Header = () => {
    const { mainHero } = useContext(SWContext);
    const hero = useMainHero(friends);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Navigation />
                <h1 className={styles.title}>{hero?.name ?? mainHero}</h1>
            </div>
        </header>
    );
};

export default Header;
