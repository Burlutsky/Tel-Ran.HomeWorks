import {createSlice} from "@reduxjs/toolkit";
import type {AuthUserType} from "../../utils/app-types.ts";

const initialState:{authUser: AuthUserType|null} = {authUser: null}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = {...action.payload}
        },
        resetAuthUser: state => {
            state.authUser = null
        }
    }
});

export const {setAuthUser, resetAuthUser} = authSlice.actions;
export const authReducer = authSlice.reducer;