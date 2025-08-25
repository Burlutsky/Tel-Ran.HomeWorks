export type HeroType = {
    name: string,
    img: string
};

export  type HeroInfo = Record<string, string>;

export type Friend = {
    id: string;
    name: string;
    img: string;
    apiId: string;
};

export type Person = {
    id?: string | number;
    name: string;
    image?: string;
    [key: string]: unknown;
};

export type PeopleSearchResult = Person[];


