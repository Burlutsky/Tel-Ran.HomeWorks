import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CurrentWeather, OpenWeatherCurrentDTO } from './types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_URL as string;

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getCurrentByCity: build.query<CurrentWeather, string>({
            query: (city) =>
                `/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`,
            transformResponse: (resp: OpenWeatherCurrentDTO): CurrentWeather => ({
                temperature: resp.main?.temp ?? NaN,
                windSpeed: resp.wind?.speed ?? NaN,
                description: resp.weather?.[0]?.description ?? '',
                timeISO: new Date(resp.dt * 1000).toISOString(),
                icon: resp.weather?.[0]?.icon ?? '01d',
                main: resp.weather?.[0]?.main ?? '',
            }),
        }),
    }),
});

export const { useGetCurrentByCityQuery } = weatherApi;
