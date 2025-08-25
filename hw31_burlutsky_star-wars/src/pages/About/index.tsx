import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMainHero } from '@shared/lib/hooks';
import { friends } from '@shared/config/friends';
import { getByApiId } from '@shared/api/swapi';
import styles from './About.module.css';

const About = () => {
    const hero = useMainHero(friends); // { id, name, img, apiId }
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const portraitSrc = useMemo(() => `/images/${hero.img}`, [hero.img]);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);
            setData(null);
            try {
                const details = await getByApiId(hero.apiId);
                if (!cancelled) {
                    setData(details);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : 'Failed to load.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => { cancelled = true; };
    }, [hero.apiId]);

    const isTransport = data && (('model' in data) || ('manufacturer' in data) || ('vehicle_class' in data) || ('starship_class' in data));
    const isPerson = data && !isTransport;

    return (
        <div className={styles.wrap}>
            <p>
                <Link to={`/home/${hero.id}`}>← Back to {hero.name}</Link>
            </p>

            <section className={styles.card}>
                <img className={styles.portrait} src={portraitSrc} alt={hero.name} />

                <div className={styles.block}>
                    <h2 className={styles.title}>{hero.name}</h2>

                    {loading && <div className={styles.meta}>Loading…</div>}
                    {error && <div className={styles.meta} style={{ color: 'crimson' }}>{error}</div>}

                    {!loading && !error && data && (
                        <>
                            {isPerson && (
                                <div className={styles.kv}>
                                    {'name' in data && (<><div className={styles.k}>Name</div><div>{String(data.name)}</div></>)}
                                    {'height' in data && (<><div className={styles.k}>Height</div><div>{String(data.height)}</div></>)}
                                    {'mass' in data && (<><div className={styles.k}>Mass</div><div>{String(data.mass)}</div></>)}
                                    {'gender' in data && (<><div className={styles.k}>Gender</div><div>{String(data.gender)}</div></>)}
                                    {'birth_year' in data && (<><div className={styles.k}>Birth Year</div><div>{String(data.birth_year)}</div></>)}
                                    {'homeworld' in data && (<><div className={styles.k}>Homeworld</div><div>{String(data.homeworld)}</div></>)}
                                </div>
                            )}

                            {isTransport && (
                                <div className={styles.kv}>
                                    {'name' in data && (<><div className={styles.k}>Name</div><div>{String(data.name)}</div></>)}
                                    {'model' in data && (<><div className={styles.k}>Model</div><div>{String(data.model)}</div></>)}
                                    {'manufacturer' in data && (<><div className={styles.k}>Manufacturer</div><div>{String(data.manufacturer)}</div></>)}
                                    {'starship_class' in data && (<><div className={styles.k}>Class</div><div>{String((data as any).starship_class)}</div></>)}
                                    {'vehicle_class' in data && (<><div className={styles.k}>Class</div><div>{String((data as any).vehicle_class)}</div></>)}
                                    {'crew' in data && (<><div className={styles.k}>Crew</div><div>{String((data as any).crew)}</div></>)}
                                    {'passengers' in data && (<><div className={styles.k}>Passengers</div><div>{String((data as any).passengers)}</div></>)}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default About;
