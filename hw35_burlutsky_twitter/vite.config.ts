// vite.config.ts

// IMPORTANT: use defineConfig from 'vitest/config' so the `test` field is typed
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

// NOTE: Full configuration for React + TS path aliases + PWA + Vitest.
// - Aliases are resolved via `vite-tsconfig-paths` using your tsconfig paths.
// - PWA is configured with a minimal manifest and auto-update SW.
// - Vitest is set to JSDOM environment with a setup file for Testing Library.

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({
            // NOTE: Keep PWA config minimal; extend later with real icons and branding.
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'robots.txt'],
            manifest: {
                name: 'Twitter Lite',
                short_name: 'TwLite',
                start_url: '/',
                display: 'standalone',
                background_color: '#111111',
                theme_color: '#111111',
                icons: [
                    // TODO: Provide real icons in /public and reference here
                    // { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                    // { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                    // { src: '/pwa-512x512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
                ],
            },
        }),
    ],

    // NOTE: Vitest configuration lives here for convenience.
    test: {
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        css: true,
        globals: true,
        // include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)', 'tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'], // optional
    },

    // NOTE: Add custom dev server options if needed.
    // server: {
    //   port: 5173,
    //   open: true,
    // },
})
