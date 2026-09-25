import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './VersionNumber.css';

interface VersionNumberProps {
    /** Usually the app's own __APP_VERSION__, defined in its vite.config. */
    version: string;
    className?: string;
}

export const VersionNumber = ({ version, className }: VersionNumberProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });

    return (
        <p className={['sg-version', className].filter(Boolean).join(' ')}>
            {t('version.label')} v{version}
        </p>
    );
};

export default VersionNumber;
