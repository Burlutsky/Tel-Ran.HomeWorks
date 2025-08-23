export interface OpenWeatherCurrentDTO {
    main: {
        temp: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string;
        icon: string;
        main: string;
    }[];
    dt: number; // unix timestamp
}

export type CurrentWeather = {
    temperature: number;
    windSpeed: number;
    description: string;
    timeISO: string;
    icon: string;
    main: string;
};
