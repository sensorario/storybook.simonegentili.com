import { useTranslation } from 'react-i18next';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, sgI18n } from '../../i18n';
import './LanguageSwitcher.css';

interface LanguageSwitcherProps {
    className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
    const { t, i18n } = useTranslation('sg', { i18n: sgI18n });

    return (
        <select
            className={['sg-language-switcher', className].filter(Boolean).join(' ')}
            value={i18n.resolvedLanguage}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            aria-label={t('languageSwitcher.label')}
        >
            {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{LANGUAGE_NAMES[lang]}</option>
            ))}
        </select>
    );
};

export default LanguageSwitcher;
