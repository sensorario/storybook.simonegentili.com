import React from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './Authenticator.css';

type AuthenticatorProps = {
    isLoggedIn: boolean;
    handleLogin: () => void;
    handleLogout: () => void;
    /** What the logout button says instead of "Esci", e.g. while impersonating someone. */
    logoutLabel?: string;
};

export const Authenticator: React.FC<AuthenticatorProps> = ({
    isLoggedIn,
    handleLogin,
    handleLogout,
    logoutLabel,
}: AuthenticatorProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    return <>{
        isLoggedIn
            ? <button onClick={handleLogout} className="sg-authenticator-button">{logoutLabel ?? t('auth.logout')}</button>
            : <button onClick={handleLogin} className="sg-authenticator-button">{t('auth.login')}</button>
    }</>
}

export default Authenticator;