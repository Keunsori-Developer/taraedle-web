import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { CONFIG } from './constant/config'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export const localeLanguageKey = 'i18nextLng'

i18next
    .use(HttpApi)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        backend: {
            loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}json`,
        },
        fallbackLng: CONFIG.defaultLang,
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        saveMissing: true,
    })

    export default i18next