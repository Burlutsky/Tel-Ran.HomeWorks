// src/entities/post/api/postsApi.ts
import { baseApi } from '@/shared/api/baseApi'

export interface JsonPlaceholderPostDto {
    userId: number
    id: number
    title: string
    body: string
}

// Domain model used by UI
export interface Post {
    id: number
    title: string
    body: string
    authorUserId: number
}

function mapPost(dto: JsonPlaceholderPostDto): Post {
    return {
        id: dto.id,
        title: dto.title,
        body: dto.body,
        authorUserId: dto.userId,
    }
}

export const postsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPostsPage: build.query<
            { items: Post[]; page: number; limit: number },
            { page: number; limit: number }
        >({
            // NOTE: JSONPlaceholder supports _page and _limit
            query: ({ page, limit }) => ({
                url: `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
                method: 'GET',
            }),
            // NOTE: We use an absolute URL above, so baseUrl from baseApi is not applied.
            transformResponse: (resp: JsonPlaceholderPostDto[], _meta, arg) => ({
                items: resp.map(mapPost),
                page: arg.page,
                limit: arg.limit,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map((p) => ({ type: 'Post' as const, id: p.id })),
                        { type: 'PostsPage' as const, id: `${result.page}-${result.limit}` },
                    ]
                    : [{ type: 'PostsPage' as const, id: 'empty' }],
        }),

        getPostById: build.query<Post, number>({
            query: (id) => ({
                url: `https://jsonplaceholder.typicode.com/posts/${id}`,
                method: 'GET',
            }),
            transformResponse: (dto: JsonPlaceholderPostDto) => mapPost(dto),
            providesTags: (_result, _err, id) => [{ type: 'Post', id }],
        }),
    }),
    overrideExisting: false,
})

export const { useGetPostsPageQuery, useGetPostByIdQuery } = postsApi
