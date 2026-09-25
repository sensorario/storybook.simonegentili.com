import i18next, { type i18n } from 'i18next';
import { setI18n } from 'react-i18next';
import { writeCookie } from '../auth';
import it from './locales/it.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import ja from './locales/ja.json';

export const SUPPORTED_LANGUAGES = ['it', 'en', 'fr', 'de', 'es', 'ja'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
    it: 'Italiano',
    en: 'English',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    ja: '日本語',
};

export const LANGUAGE_COOKIE = 'sg-language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'it';

const isSupported = (value: string | null | undefined): value is SupportedLanguage =>
    !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

export const readLanguageCookie = (): SupportedLanguage | null => {
    const entry = document.cookie.split('; ').find((e) => e.startsWith(`${LANGUAGE_COOKIE}=`));
    const value = entry?.slice(LANGUAGE_COOKIE.length + 1);
    return isSupported(value) ? value : null;
};

// Scoped to .simonegentili.com (see cookieScope) so every sibling app shares the choice.
const writeLanguageCookie = (lng: string) => writeCookie(LANGUAGE_COOKIE, lng, 31536000, 'lax');

// The library owns the instance and its components always pass it to
// useTranslation explicitly: apps that never call createI18n still get
// translated components instead of raw keys.
export const sgI18n: i18n = i18next.createInstance();

sgI18n.init({
    resources: {
        it: { sg: it },
        en: { sg: en },
        fr: { sg: fr },
        de: { sg: de },
        es: { sg: es },
        ja: { sg: ja },
    },
    lng: readLanguageCookie() ?? DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    ns: ['sg', 'translation'],
    defaultNS: 'translation',
    initAsync: false,
    interpolation: {
        escapeValue: false,
    },
});

sgI18n.on('languageChanged', writeLanguageCookie);

type AppResources = Partial<Record<SupportedLanguage, Record<string, unknown>>>;

/** Adds the app's own texts (default namespace) to the shared instance and makes it the one react-i18next hooks use. */
export const createI18n = ({ resources }: { resources: AppResources }): i18n => {
    for (const [lng, bundle] of Object.entries(resources)) {
        sgI18n.addResourceBundle(lng, 'translation', bundle, true, true);
    }
    setI18n(sgI18n);
    return sgI18n;
};
