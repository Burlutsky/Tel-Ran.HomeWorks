// src/pages/FeedPage/index.tsx
import { useGetPostsPageQuery } from '@/entities/post/api/postsApi'

export default function FeedPage() {
    // NOTE: Simple pagination demo: first page only
    const { data, isLoading, isError } = useGetPostsPageQuery({ page: 1, limit: 10 })

    if (isLoading) return <div>Loading posts...</div>
    if (isError || !data) return <div>Failed to load posts</div>

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data.items.map((p) => (
                    <li key={p.id}>
                        <strong>#{p.id}</strong> {p.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

