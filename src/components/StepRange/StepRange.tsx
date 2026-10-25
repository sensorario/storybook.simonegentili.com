import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import './StepRange.css';

export type StepRangeItem<T extends string | number> = {
    value: T;
    label: ReactNode;
    /** Shown under the label: how many things this step holds, the ones before it included. */
    count?: number;
    /** danger: the count turns red when it's above 0. */
    tone?: 'danger';
};

interface StepRangeProps<T extends string | number> {
    items: StepRangeItem<T>[];
    value: T;
    onChange: (value: T) => void;
    /** Accessible name of the group. */
    ariaLabel?: string;
    className?: string;
}

// A row of steps where each one includes those to its left (e.g. overdue → today → this week → all):
// picking one fills the bar up to it. The caller renders what the step shows.
export const StepRange = <T extends string | number>({ items, value, onChange, ariaLabel, className }: StepRangeProps<T>) => {
    const groupRef = useRef<HTMLDivElement>(null);
    const current = items.findIndex((item) => item.value === value);

    // A ladder, not a carousel: the arrows stop at the ends.
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const next =
            e.key === 'ArrowRight' ? Math.min(current + 1, items.length - 1)
            : e.key === 'ArrowLeft' ? Math.max(current - 1, 0)
            : e.key === 'Home' ? 0
            : e.key === 'End' ? items.length - 1
            : null;
        if (next === null) return;
        e.preventDefault();
        onChange(items[next].value);
        groupRef.current?.querySelector<HTMLButtonElement>(`[data-value="${String(items[next].value)}"]`)?.focus();
    };

    return (
        <div
            ref={groupRef}
            role="radiogroup"
            aria-label={ariaLabel}
            className={['sg-step-range', className].filter(Boolean).join(' ')}
            onKeyDown={handleKeyDown}
        >
            {items.map((item, index) => {
                const selected = index === current;
                return (
                    <button
                        key={item.value}
                        type="button"
                        role="radio"
                        data-value={String(item.value)}
                        aria-checked={selected}
                        tabIndex={selected ? 0 : -1}
                        className={[
                            'sg-step-range-item',
                            index <= current ? 'sg-step-range-item--filled' : '',
                            selected ? 'sg-step-range-item--active' : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => onChange(item.value)}
                    >
                        <span>{item.label}</span>
                        {item.count !== undefined && (
                            <span
                                className={[
                                    'sg-step-range-count',
                                    item.tone === 'danger' && item.count > 0 ? 'sg-step-range-count--danger' : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ')}
                            >
                                {item.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default StepRange;
