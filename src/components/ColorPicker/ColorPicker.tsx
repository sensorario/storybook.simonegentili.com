import React, { useEffect, useRef, useState } from 'react';
import './ColorPicker.css';

export interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    // No default swatch set here on purpose - this component has no
    // opinion on what colors a given app's palette should offer, only on
    // how picking one works (a popover grid, plus a native color input as
    // an escape hatch for anything outside the curated set).
    swatches: string[];
}

// A swatch button that opens a small popover grid - the native <input
// type="color"> has no way to show a curated palette (it's the OS's own
// picker UI, or nothing), so this builds the grid itself and keeps the
// native input only as an escape hatch for a color outside that set.
export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, swatches }) => {
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
        <div ref={rootRef} className="sg-color-picker">
            <button
                type="button"
                className="sg-color-picker-toggle"
                onClick={() => setOpen((o) => !o)}
            >
                <span className="sg-color-picker-swatch" style={{ background: value }} />
                <span className="sg-color-picker-toggle-label">{value}</span>
            </button>

            {open && (
                <div className="sg-color-picker-popover">
                    <div className="sg-color-picker-grid">
                        {swatches.map((swatch) => (
                            <button
                                key={swatch}
                                type="button"
                                title={swatch}
                                className={`sg-color-picker-swatch-button${
                                    swatch.toLowerCase() === value?.toLowerCase() ? ' active' : ''
                                }`}
                                style={{ background: swatch }}
                                onClick={() => {
                                    onChange(swatch);
                                    setOpen(false);
                                }}
                            />
                        ))}
                    </div>
                    <label className="sg-color-picker-custom">
                        Colore personalizzato
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
