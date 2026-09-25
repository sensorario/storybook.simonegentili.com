import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './StatusMessage.css';

export type StatusKind = 'info' | 'empty' | 'loading' | 'error';

interface StatusMessageProps {
    kind?: StatusKind;
    /** Draws a tinted box around the text instead of plain colored text. */
    boxed?: boolean;
    /** Defaults to the translated "Loading…" for `kind="loading"`. */
    children?: ReactNode;
    className?: string;
}

export const StatusMessage = ({ kind = 'info', boxed = false, children, className }: StatusMessageProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });

    return (
        <p
            className={['sg-status', `sg-status--${kind}`, boxed ? 'sg-status--boxed' : '', className].filter(Boolean).join(' ')}
            role={kind === 'error' ? 'alert' : kind === 'loading' ? 'status' : undefined}
        >
            {kind === 'loading' && <span className="sg-status-spinner" aria-hidden="true" />}
            {children ?? (kind === 'loading' ? t('status.loading') : null)}
        </p>
    );
};

export default StatusMessage;
