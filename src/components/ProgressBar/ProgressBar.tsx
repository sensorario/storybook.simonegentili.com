import type { ReactNode } from 'react';
import './ProgressBar.css';

export type ProgressTone = 'accent' | 'success' | 'danger';

interface ProgressBarProps {
    value: number;
    max?: number;
    /** Shown next to the track, e.g. "3/10" or "120g / 200g". */
    label?: ReactNode;
    /** Accessible name when there's no visible label saying what is being measured. */
    ariaLabel?: string;
    tone?: ProgressTone;
    size?: 'sm' | 'md';
    className?: string;
}

export const ProgressBar = ({
    value,
    max = 100,
    label,
    ariaLabel,
    tone = 'accent',
    size = 'md',
    className,
}: ProgressBarProps) => {
    const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

    return (
        <div className={['sg-progress', `sg-progress--${tone}`, `sg-progress--${size}`, className].filter(Boolean).join(' ')}>
            <div
                className="sg-progress-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-label={ariaLabel}
            >
                <div className="sg-progress-fill" style={{ width: `${percent}%` }} />
            </div>
            {label !== undefined && <span className="sg-progress-label">{label}</span>}
        </div>
    );
};

export default ProgressBar;
