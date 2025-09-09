// src/__tests__/smoke.test.ts
// NOTE: Basic smoke test to ensure Vitest is wired correctly
import { describe, it, expect } from 'vitest'

describe('smoke', () => {
    it('works', () => {
        expect(1 + 1).toBe(2)
    })
})
