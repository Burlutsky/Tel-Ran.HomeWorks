import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = { id: number; name: string } | null;

type AuthState = {
    isAuthenticated: boolean;
    user: User;
};

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSucceeded(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { loginSucceeded, logout } = authSlice.actions;
export default authSlice.reducer;
