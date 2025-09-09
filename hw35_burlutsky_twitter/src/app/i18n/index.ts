// src/app/i18n/index.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './resources/en.json'
import ru from './resources/ru.json'
import he from './resources/he.json'

// NOTE: Initialize i18n with 3 languages and browser detection
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            he: { translation: he }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // NOTE: React already escapes
        }
    })

export default i18n
