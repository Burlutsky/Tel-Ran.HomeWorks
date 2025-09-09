// src/shared/types/user.ts

// DTO returned by DummyJSON for /users endpoint
export interface DummyJsonUserDto {
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
}

// Domain model used in app
// NOTE: avatarUrl generated via DiceBear seed = username or id
export interface User {
    id: number
    fullName: string
    username: string
    email: string
    gender?: string
    age?: number
    avatarUrl: string
}
