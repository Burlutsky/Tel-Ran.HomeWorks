import { baseUrl } from '@shared/config/sw';
import { getInfo } from '@shared/lib/tools';
import type { PeopleSearchResult, Person } from '@shared/types/sw';

const PEOPLES = `${baseUrl}peoples`;

export const getByApiId = async (apiId: string): Promise<any> => {
    const clean = apiId.trim().replace(/^\/+/, '');
    return getInfo(`${baseUrl}${clean}`);
};

export const searchPeople = async (query: string): Promise<PeopleSearchResult> => {
    const url = `${PEOPLES}?search=${encodeURIComponent(query)}`;
    const data = await getInfo(url);
    // API может вернуть либо { results: [...] }, либо просто массив.
    const arr = Array.isArray(data) ? data : (data?.results ?? []);
    return arr as PeopleSearchResult;
};

export const getPerson = async (id: string | number): Promise<Person> => {
    const url = `${baseUrl}peoples/${id}`;
    return getInfo(url);
};

export const coercePersonId = (p: Person, idx?: number): string => {
    const fromId = p.id != null ? String(p.id) : '';
    const fromUrl = typeof p['url'] === 'string'
        ? (p['url'] as string).split('/').filter(Boolean).pop() ?? ''
        : '';
    const fallback = idx != null ? String(idx) : '';
    return fromId || fromUrl || fallback;
};
