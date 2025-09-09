// src/shared/api/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '@/app/store'

// NOTE: Shared RTKQ base with auth header from Redux state.

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState)?.auth?.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            return headers
        },
    }),
    tagTypes: ['Auth', 'User', 'UsersPage', 'Post', 'PostsPage', 'Comments'], // <-- add Post/PostsPage/Comments
    endpoints: () => ({}),
})
