import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {City} from './types';

type LocationState = {
    selectedCity: City;
};

const initialState: LocationState = {
    // дефолт: Хайфа
    selectedCity: {id: 'haifa', name: 'Haifa', country: 'IL', lat: 32.7940, lon: 34.9896},
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        selectCity(state, action: PayloadAction<City>) {
            state.selectedCity = action.payload;
        },
    },
});

export const {selectCity} = locationSlice.actions;
export default locationSlice.reducer;
