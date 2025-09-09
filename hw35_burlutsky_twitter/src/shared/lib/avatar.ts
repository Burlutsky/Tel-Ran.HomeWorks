// src/shared/lib/avatar.ts

// NOTE: Create a DiceBear avatar URL with a deterministic seed.
// You can switch style to "identicon", "bottts", "adventurer", etc.
export function avatarUrlBySeed(seed: string | number, size: number = 96) {
    const s = String(seed)
    return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(s)}&size=${size}`
}
