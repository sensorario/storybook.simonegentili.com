import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import './Tabs.css';

export type TabItem<T extends string | number> = {
    value: T;
    label: ReactNode;
    disabled?: boolean;
};

interface TabsProps<T extends string | number> {
    items: TabItem<T>[];
    value: T;
    onChange: (value: T) => void;
    /** underline: page sections; pills: filters; segmented: a few mutually exclusive views. */
    variant?: 'underline' | 'pills' | 'segmented';
    /** Accessible name of the tab list. */
    ariaLabel?: string;
    className?: string;
}

// Only the tab strip: the caller renders the active panel however it likes
// (route, conditional, all mounted and hidden...).
export const Tabs = <T extends string | number>({
    items,
    value,
    onChange,
    variant = 'underline',
    ariaLabel,
    className,
}: TabsProps<T>) => {
    const listRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const enabled = items.filter((item) => !item.disabled);
        const current = enabled.findIndex((item) => item.value === value);
        const next =
            e.key === 'ArrowRight' ? enabled[(current + 1) % enabled.length]
            : e.key === 'ArrowLeft' ? enabled[(current - 1 + enabled.length) % enabled.length]
            : e.key === 'Home' ? enabled[0]
            : e.key === 'End' ? enabled[enabled.length - 1]
            : null;
        if (!next) return;
        e.preventDefault();
        onChange(next.value);
        listRef.current?.querySelector<HTMLButtonElement>(`[data-value="${String(next.value)}"]`)?.focus();
    };

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-label={ariaLabel}
            className={['sg-tabs', `sg-tabs--${variant}`, className].filter(Boolean).join(' ')}
            onKeyDown={handleKeyDown}
        >
            {items.map((item) => {
                const selected = item.value === value;
                return (
                    <button
                        key={item.value}
                        type="button"
                        role="tab"
                        data-value={String(item.value)}
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        disabled={item.disabled}
                        className={selected ? 'sg-tab sg-tab--active' : 'sg-tab'}
                        onClick={() => onChange(item.value)}
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};

export default Tabs;
