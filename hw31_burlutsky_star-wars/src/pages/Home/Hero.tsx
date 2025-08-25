import { useMainHero } from '@shared/lib/hooks';
import { friends } from '@shared/config/friends';
import FarGalaxy from './FarGalaxy';
import styles from './Hero.module.css';

const Hero = () => {
    const mainHeroInfo = useMainHero(friends);

    return (
        <section className={styles.section}>
            <img
                className={styles.portrait}
                src={`/images/${mainHeroInfo.img}`}
                alt={mainHeroInfo.name}
            />
            <div className={styles.right}>
                {/* <h2 className={styles.title}>{mainHeroInfo.name}</h2>  <-- удалить */}
                <FarGalaxy />
            </div>
        </section>
    );
};

export default Hero;
