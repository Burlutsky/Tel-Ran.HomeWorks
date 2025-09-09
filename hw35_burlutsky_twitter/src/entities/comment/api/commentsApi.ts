// src/entities/comment/api/commentsApi.ts
import { baseApi } from '@/shared/api/baseApi'

export interface JsonPlaceholderCommentDto {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export interface Comment {
    id: number
    postId: number
    authorEmail: string
    body: string
}

function mapComment(dto: JsonPlaceholderCommentDto): Comment {
    return {
        id: dto.id,
        postId: dto.postId,
        authorEmail: dto.email,
        body: dto.body,
    }
}

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCommentsByPost: build.query<Comment[], number>({
            query: (postId) => ({
                url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
                method: 'GET',
            }),
            transformResponse: (resp: JsonPlaceholderCommentDto[]) => resp.map(mapComment),
            providesTags: (_result, _err, postId) => [{ type: 'Comments', id: postId }],
        }),
    }),
    overrideExisting: false,
})

export const { useGetCommentsByPostQuery } = commentsApi
