import { useEffect, useState } from 'react';
import { baseUrl } from '@shared/config/sw';
import { getInfo } from '@shared/lib/tools';
import styles from './FarGalaxy.module.css';

type FilmInfo = {
    title: string;
    episode_id: number;
    release_date: string;
    opening_crawl: string;
};

const FarGalaxy = () => {
    const [info, setInfo] = useState<FilmInfo | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const cached = localStorage.getItem('farGalaxy');
                if (cached) {
                    const parsed = JSON.parse(cached) as FilmInfo;
                    if (!cancelled) setInfo(parsed);
                    return;
                }
                const data = await getInfo(`${baseUrl}films/1`);
                const normalized: FilmInfo = {
                    title: data.title,
                    episode_id: data.episode_id,
                    release_date: data.release_date,
                    opening_crawl: data.opening_crawl
                };
                localStorage.setItem('farGalaxy', JSON.stringify(normalized));
                if (!cancelled) setInfo(normalized);
            } catch (e) {
                console.error(e);
            }
        };

        load();
        return () => { cancelled = true; };
    }, []);

    if (!info) {
        return <p>Loading…</p>;
    }

    return (
        <section className={styles.block}>
            <div className={styles.label}>Far Galaxy</div>
            <h4 className={styles.title}>{info.title}</h4>
            <div className={styles.meta}>
                Episode {info.episode_id} • {info.release_date}
            </div>
            <p className={styles.crawl}>{info.opening_crawl}</p>
        </section>
    );
};

export default FarGalaxy;
