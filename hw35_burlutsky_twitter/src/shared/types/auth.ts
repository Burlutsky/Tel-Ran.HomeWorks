// src/shared/types/auth.ts
export interface DummyJsonAuthDto {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    // Поддерживаем оба формата:
    token?: string
    accessToken?: string
    refreshToken?: string
}

export interface AuthProfile {
    id: number
    username: string
    fullName: string
    email: string
    gender?: string
    avatarUrl: string
}

export interface AuthState {
    token: string | null
    refreshToken?: string | null
    profile: AuthProfile | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}
