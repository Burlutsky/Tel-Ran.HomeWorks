import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchPeople, coercePersonId } from '@shared/api/swapi';
import type { Person } from '@shared/types/sw';

const StarWars = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQ = searchParams.get('q') ?? '';
    const [query, setQuery] = useState(initialQ);
    const [results, setResults] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const canSearch = useMemo(() => query.trim().length >= 2, [query]);

    const runSearch = async (q: string) => {
        if (!canSearch) {
            setResults([]);
            setError(null);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const list = await searchPeople(q);
            setResults(list);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Search failed');
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setSearchParams(q => {
            if (query) q.set('q', query);
            else q.delete('q');
            return q;
        });
        await runSearch(query);
    };

    useEffect(() => {
        if (initialQ) {
            runSearch(initialQ);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main style={{ padding: 24 }}>
            <h2>Star Wars</h2>

            <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search character..."
                />
                <button type="submit" disabled={!canSearch}>
                    Search
                </button>
            </form>

            {loading && <p>Loading…</p>}
            {error && <p style={{ color: 'crimson' }}>{error}</p>}

            {!loading && !error && results.length > 0 && (
                <ul style={{ display: 'grid', gap: 8, padding: 0, listStyle: 'none' }}>
                    {results.map((p, i) => {
                        const id = coercePersonId(p, i);
                        return (
                            <li
                                key={`${id}-${p.name}`}
                                style={{ padding: 12, border: '1px solid #eee', cursor: 'pointer' }}
                                onClick={() => navigate(`/star_wars/${id}`)}
                            >
                                <strong>{p.name}</strong>
                            </li>
                        );
                    })}
                </ul>
            )}

            {!loading && !error && results.length === 0 && canSearch && (
                <p>Nothing found.</p>
            )}
        </main>
    );
};

export default StarWars;
