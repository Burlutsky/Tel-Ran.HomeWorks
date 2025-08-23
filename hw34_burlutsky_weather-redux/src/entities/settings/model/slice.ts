import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Units = 'metric' | 'imperial';
export type Theme = 'system' | 'light' | 'dark';

export type SettingsState = {
    units: Units;       // °C vs °F
    theme: Theme;
    language: 'en' | 'ru' | 'he';
};

const initialState: SettingsState = {
    units: 'metric',
    theme: 'system',
    language: 'en',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUnits(state, action: PayloadAction<Units>) { state.units = action.payload; },
        setTheme(state, action: PayloadAction<Theme>) { state.theme = action.payload; },
        setLanguage(state, action: PayloadAction<'en' | 'ru' | 'he'>) { state.language = action.payload; },
    },
});

export const { setUnits, setTheme, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
