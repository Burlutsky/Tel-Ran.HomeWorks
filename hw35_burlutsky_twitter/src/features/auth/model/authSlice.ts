// src/features/auth/model/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthProfile, AuthState } from '@/shared/types/auth'

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    profile: null,
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setPending(state) {
            state.status = 'loading'
            state.error = null
        },
        setCredentials(
            state,
            action: PayloadAction<{ token: string; refreshToken?: string | null; profile: AuthProfile }>
        ) {
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken ?? null
            state.profile = action.payload.profile
            state.status = 'succeeded'
            state.error = null
        },
        setError(state, action: PayloadAction<string>) {
            state.status = 'failed'
            state.error = action.payload
        },
        logout(state) {
            state.token = null
            state.refreshToken = null
            state.profile = null
            state.status = 'idle'
            state.error = null
        },
    },
})

export const { setPending, setCredentials, setError, logout } = authSlice.actions
export const authReducer = authSlice.reducer
