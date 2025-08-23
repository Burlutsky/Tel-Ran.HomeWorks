import {configureStore} from '@reduxjs/toolkit';
import {weatherApi} from '@/shared/api/weatherApi';
import locationReducer from '@/entities/location/model/slice';
import recentCitiesReducer from '@/features/recent-cities/model/slice';
import settingsReducer from '@/entities/settings/model/slice';
import {loadJSON, saveJSON} from '@/shared/lib/storage';
import type {SettingsState} from '@/entities/settings/model/slice';

const STORAGE_KEYS = {
    recentCities: 'weather.recentCities',
    settings: 'weather.settings',
};

const defaultSettings: SettingsState = {
    units: 'metric',
    theme: 'system',
    language: 'en',
};

const preloadedState = {
    recentCities: {
        cities: loadJSON<string[]>(STORAGE_KEYS.recentCities, ['Haifa', 'Tel Aviv', 'Jerusalem']),
        maxItems: 16,
    },
    settings: loadJSON<SettingsState>(STORAGE_KEYS.settings, defaultSettings),
};

export const store = configureStore({
    reducer: {
        location: locationReducer,
        recentCities: recentCitiesReducer,
        settings: settingsReducer,
        [weatherApi.reducerPath]: weatherApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(weatherApi.middleware),
    preloadedState,
});


store.subscribe(() => {
    const s = store.getState();
    saveJSON(STORAGE_KEYS.recentCities, s.recentCities.cities);
    saveJSON(STORAGE_KEYS.settings, s.settings);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
