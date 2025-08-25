import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPerson } from '@shared/api/swapi';
import { baseUrl } from '@shared/config/sw';
import type { Person } from '@shared/types/sw';
import styles from './Details.module.css';

const API_ORIGIN = baseUrl.replace(/\/v1\/?$/, '/');

const StarWarsDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState<Person | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const person = await getPerson(id);
                if (!cancelled) setData(person);
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const imageUrl =
        data && typeof data.image === 'string' && data.image.trim().length > 0
            ? `${API_ORIGIN}${data.image}`
            : '';

    return (
        <main className="stack-3">
            <p>
                <Link to="/star_wars">← Back to search</Link>
            </p>

            {loading && <p>Loading…</p>}
            {error && <p style={{ color: 'crimson' }}>{error}</p>}

            {!loading && !error && data && (
                <section className={styles.card}>
                    {imageUrl ? (
                        <img className={styles.poster} src={imageUrl} alt={String(data.name)} />
                    ) : (
                        <div className={styles.poster} aria-label="No image available" />
                    )}

                    <div>
                        <h2 className={styles.title}>{String(data.name ?? 'Unknown')}</h2>
                        <div className={styles.meta}>ID: {id}</div>

                        <div className={styles.kv}>
                            {'height' in data && (
                                <>
                                    <div className={styles.k}>Height</div>
                                    <div>{String((data as any).height)}</div>
                                </>
                            )}

                            {'mass' in data && (
                                <>
                                    <div className={styles.k}>Mass</div>
                                    <div>{String((data as any).mass)}</div>
                                </>
                            )}

                            {'gender' in data && (
                                <>
                                    <div className={styles.k}>Gender</div>
                                    <div>{String((data as any).gender)}</div>
                                </>
                            )}

                            {'birth_year' in data && (
                                <>
                                    <div className={styles.k}>Birth Year</div>
                                    <div>{String((data as any).birth_year)}</div>
                                </>
                            )}

                            {'homeworld' in data && (
                                <>
                                    <div className={styles.k}>Homeworld</div>
                                    <div>{String((data as any).homeworld)}</div>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
};

export default StarWarsDetails;
