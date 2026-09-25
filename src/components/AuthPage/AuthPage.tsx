import type { ReactNode } from 'react';
import './AuthPage.css';

interface AuthPageProps {
    title: ReactNode;
    children?: ReactNode;
    /** Links under the card, e.g. back to the home page (router-specific, so the app passes it). */
    footer?: ReactNode;
    className?: string;
}

// Centered card for register / registered / confirm pages.
export const AuthPage = ({ title, children, footer, className }: AuthPageProps) => (
    <div className={['sg-auth-page', className].filter(Boolean).join(' ')}>
        <div className="sg-auth-page-card">
            <h1 className="sg-auth-page-title">{title}</h1>
            {children}
        </div>
        {footer && <div className="sg-auth-page-footer">{footer}</div>}
    </div>
);

export default AuthPage;
