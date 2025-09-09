// src/entities/user/api/usersApi.ts
import { baseApi } from '@/shared/api/baseApi'
import type { DummyJsonUserDto } from '@/shared/types/user'
import type { User } from '@/shared/types/user'
import { avatarUrlBySeed } from '@/shared/lib/avatar'

// NOTE: Map DummyJSON user DTO to domain model used by UI
function mapUserDto(dto: DummyJsonUserDto): User {
    const fullName = `${dto.firstName} ${dto.lastName}`.trim()
    return {
        id: dto.id,
        fullName,
        username: dto.username,
        email: dto.email,
        gender: dto.gender,
        age: dto.age,
        avatarUrl: avatarUrlBySeed(dto.username || dto.id),
    }
}

interface UsersResponse {
    users: DummyJsonUserDto[]
    total: number
    skip: number
    limit: number
}

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUsersPage: build.query<
            { items: User[]; total: number; skip: number; limit: number },
            { limit: number; skip: number }
        >({
            query: ({ limit, skip }) => ({
                url: `/users?limit=${limit}&skip=${skip}`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map((u) => ({ type: 'User' as const, id: u.id })),
                        { type: 'UsersPage' as const, id: `${result.skip}-${result.limit}` },
                    ]
                    : [{ type: 'UsersPage' as const, id: 'empty' }],
            transformResponse: (resp: UsersResponse) => ({
                items: resp.users.map(mapUserDto),
                total: resp.total,
                skip: resp.skip,
                limit: resp.limit,
            }),
        }),

        getUserById: build.query<User, number>({
            query: (id) => ({ url: `/users/${id}`, method: 'GET' }),
            transformResponse: (dto: DummyJsonUserDto) => mapUserDto(dto),
            providesTags: (_result, _err, id) => [{ type: 'User', id }],
        }),
    }),
})

export const { useGetUsersPageQuery, useGetUserByIdQuery } = usersApi
