// src/features/auth/api/authMapping.ts
import type { DummyJsonAuthDto, AuthProfile } from '@/shared/types/auth'
import { avatarUrlBySeed } from '@/shared/lib/avatar'

export function mapAuthDtoToProfile(dto: DummyJsonAuthDto): {
    token: string
    refreshToken?: string
    profile: AuthProfile
} {
    const fullName = `${dto.firstName} ${dto.lastName}`.trim()
    const avatarUrl = avatarUrlBySeed(dto.username || dto.id)

    const token = dto.token ?? dto.accessToken
    if (!token) {
        throw new Error('Auth token is missing in response')
    }

    return {
        token,
        refreshToken: dto.refreshToken,
        profile: {
            id: dto.id,
            username: dto.username,
            fullName,
            email: dto.email,
            gender: dto.gender,
            avatarUrl,
        },
    }
}

// NOTE: Extract a human-readable error message from RTK Query error shapes
export function getLoginErrorMessage(err: unknown): string {
    const fallback = 'Login failed'
    if (typeof err !== 'object' || err === null) return fallback
    const outer = 'error' in (err as any) ? (err as any).error : err
    if (typeof outer !== 'object' || outer === null) return fallback
    const data = (outer as any).data
    if (data && typeof data === 'object' && typeof (data as any).message === 'string') {
        return (data as any).message as string
    }
    if (typeof (outer as any).message === 'string') return (outer as any).message as string
    return fallback
}
