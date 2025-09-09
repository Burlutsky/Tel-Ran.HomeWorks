// src/features/settings/ui/LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next'

// NOTE: Simple language switcher for demo purposes
export function LanguageSwitcher() {
    const { i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
    <button onClick={() => changeLanguage('en')}>EN</button>
    <button onClick={() => changeLanguage('ru')}>RU</button>
    <button onClick={() => changeLanguage('he')}>HE</button>
    </div>
)
}
