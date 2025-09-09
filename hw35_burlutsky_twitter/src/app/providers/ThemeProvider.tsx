// src/app/providers/ThemeProvider.tsx
import * as React from 'react'
import { useMemo } from 'react'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { useTranslation } from 'react-i18next'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import rtlPlugin from 'stylis-plugin-rtl'

// NOTE: Create two Emotion caches: LTR (default) and RTL (with stylis RTL plugin)
const createEmotionCacheLTR = () =>
    createCache({
        key: 'mui',
        prepend: true,
    })

const createEmotionCacheRTL = () =>
    createCache({
        key: 'mui-rtl',
        prepend: true,
        // NOTE: This is the official way to enable RTL processing for Emotion
        stylisPlugins: [rtlPlugin],
    })

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation()
    const isRTL = i18n.language === 'he'

    // NOTE: Material 3-like tokens (MUI v6 uses CSS vars and M3 by default)
    const theme = useMemo(
        () =>
            createTheme({
                direction: isRTL ? 'rtl' : 'ltr',
                cssVariables: true,
                shape: { borderRadius: 12 },
                typography: {
                    fontFamily:
                        '"Roboto","Roboto Flex",system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,"Noto Sans","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                },
                components: {
                    MuiButton: {
                        defaultProps: { variant: 'contained' },
                    },
                },
            }),
        [isRTL],
    )

    const cache = useMemo(() => (isRTL ? createEmotionCacheRTL() : createEmotionCacheLTR()), [isRTL])

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}
