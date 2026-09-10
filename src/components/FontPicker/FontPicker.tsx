import React, { useEffect, useRef, useState } from 'react';
import './FontPicker.css';

// A native <select>'s <option> font-family styling is unreliable (macOS in
// particular renders the OS-level list widget and ignores it), so this is a
// plain div/button dropdown built from scratch - every entry then always
// renders in its own real font, in every browser.
const fontLabel = (f: string) => f.split(',')[0].replace(/'/g, '');

export interface FontPickerProps {
    value: string;
    onChange: (fontFamily: string) => void;
    // No default font list here on purpose - this component has no opinion
    // on which fonts a given app wants to offer, only on how picking one
    // works. Each entry is a full CSS font-family value (e.g. "'Oswald',
    // sans-serif"), not just a bare family name, so it can be applied
    // directly as this dropdown's own inline style.
    options: string[];
}

export const FontPicker: React.FC<FontPickerProps> = ({ value, onChange, options }) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const onDocMouseDown = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', onDocMouseDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onDocMouseDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="sg-font-picker">
            <button
                type="button"
                className="sg-font-picker-toggle"
                onClick={() => setOpen((o) => !o)}
                style={{ fontFamily: value }}
            >
                <span className="sg-font-picker-toggle-label">{fontLabel(value)}</span>
                <span className="sg-font-picker-toggle-caret">{open ? '▲' : '▼'}</span>
            </button>

            {open && (
                <ul className="sg-font-picker-list">
                    {options.map((f) => (
                        <li key={f}>
                            <button
                                type="button"
                                className={`sg-font-picker-option${f === value ? ' active' : ''}`}
                                onClick={() => {
                                    onChange(f);
                                    setOpen(false);
                                }}
                                style={{ fontFamily: f }}
                            >
                                {fontLabel(f)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FontPicker;
