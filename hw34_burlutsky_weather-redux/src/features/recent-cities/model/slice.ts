import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type RecentCitiesState = {
    cities: string[];     // упорядоченный список, без дублей (последние сверху)
    maxItems: number;     // лимит хранения
};

const initialState: RecentCitiesState = {
    cities: [],
    maxItems: 16,
};

const norm = (s: string) => s.trim();

const recentCitiesSlice = createSlice({
    name: 'recentCities',
    initialState,
    reducers: {
        addRecentCity(state, action: PayloadAction<string>) {
            const name = norm(action.payload);
            if (!name) return;
            const lower = name.toLowerCase();
            state.cities = [name, ...state.cities.filter(c => c.toLowerCase() != lower)]
                .slice(0, state.maxItems);
        },
        removeRecentCity(state, action: PayloadAction<string>) {
            const lower = norm(action.payload).toLowerCase();
            state.cities = state.cities.filter(c => c.toLowerCase() !== lower);
        },
        clearRecentCities(state) {
            state.cities = [];
        },
        setRecentCities(state, action: PayloadAction<string[]>) {
            state.cities = action.payload ?? [];
        },
    },
});

export const {
    addRecentCity,
    removeRecentCity,
    clearRecentCities,
    setRecentCities,
} = recentCitiesSlice.actions;

export default recentCitiesSlice.reducer;
