import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './Badge.css';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'danger';

interface BadgeProps {
    children: ReactNode;
    tone?: BadgeTone;
    /** Makes the badge a toggle button (e.g. a pickable tag); `selected` is its pressed state. */
    onClick?: () => void;
    selected?: boolean;
    /** Adds a "×" button, e.g. to take a user off a role. */
    onRemove?: () => void;
    /** Accessible name of the "×" button. Default: the translated "Remove". */
    removeLabel?: string;
    className?: string;
}

export const Badge = ({ children, tone = 'neutral', onClick, selected = false, onRemove, removeLabel, className }: BadgeProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });

    return (
        <span
            className={['sg-badge', `sg-badge--${tone}`, selected ? 'sg-badge--selected' : '', className]
                .filter(Boolean)
                .join(' ')}
        >
            {onClick ? (
                <button type="button" className="sg-badge-toggle" aria-pressed={selected} onClick={onClick}>
                    {children}
                </button>
            ) : (
                children
            )}
            {onRemove && (
                <button type="button" className="sg-badge-remove" aria-label={removeLabel ?? t('badge.remove')} onClick={onRemove}>
                    &times;
                </button>
            )}
        </span>
    );
};

export default Badge;
