import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import { Button } from '../Button/Button';
import './LoginPrompt.css';

interface LoginPromptProps {
    /** What logging in unlocks, e.g. "Accedi per vedere le sessioni." */
    children?: ReactNode;
    /** Shows a login button, e.g. `() => headerRef.current?.openLoginModal()`. */
    onLogin?: () => void;
    /** Extra content under the button, e.g. a link to the registration page. */
    footer?: ReactNode;
    className?: string;
}

export const LoginPrompt = ({ children, onLogin, footer, className }: LoginPromptProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });

    return (
        <div className={['sg-login-prompt', className].filter(Boolean).join(' ')}>
            <p className="sg-login-prompt-message">{children ?? t('loginPrompt.message')}</p>
            {onLogin && <Button label={t('auth.login')} onClick={onLogin} />}
            {footer && <div className="sg-login-prompt-footer">{footer}</div>}
        </div>
    );
};

export default LoginPrompt;
