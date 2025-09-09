// src/App.tsx
import * as React from 'react'
import { useEffect } from 'react' // <-- import useEffect
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LanguageSwitcher } from '@/features/settings/ui/LanguageSwitcher'
import FeedPage from '@/pages/FeedPage'
import LoginPage from '@/pages/LoginPage'
import type { RootState } from '@/app/store' // <-- no .ts extension

export default function App() {
    // NOTE: Get both `i18n` and `t`
    const { i18n, t } = useTranslation()
    const token = useSelector((s: RootState) => s.auth.token)

    useEffect(() => {
        // NOTE: Keep <html dir> synced with language for proper LTR/RTL
        document.documentElement.dir = i18n.language === 'he' ? 'rtl' : 'ltr'
    }, [i18n.language])

    if (!token) {
        return <LoginPage />
    }

    return (
        <div>
            <header style={{ padding: '1rem', borderBottom: '1px solid gray' }}>
                <LanguageSwitcher />
            </header>
            <main style={{ padding: '1rem' }}>
                <h1>{t('common.welcome', { name: 'Alex' })}</h1>
                {/* NOTE: Render feed inside main so layout is consistent */}
                <FeedPage />
            </main>
        </div>
    )
}
