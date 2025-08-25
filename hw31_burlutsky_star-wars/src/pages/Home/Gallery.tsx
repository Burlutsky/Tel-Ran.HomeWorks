import { useNavigate } from 'react-router-dom';
import { friends } from '@shared/config/friends';
import styles from './Gallery.module.css';

const Gallery = () => {
    const navigate = useNavigate();

    return (
        <section className="stack-3">
            <h3>Gallery</h3>
            <div className={styles.grid}>
                {friends.map((f) => (
                    <div
                        key={f.id}
                        className={styles.card}
                        onClick={() => navigate(`/home/${f.id}`)}
                    >
                        <img className={styles.thumb} src={`/images/${f.img}`} alt={f.name} />
                        <div className={styles.caption}>{f.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
