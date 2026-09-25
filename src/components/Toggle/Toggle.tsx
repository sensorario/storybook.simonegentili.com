import React, { type ReactNode } from 'react';
import './Toggle.css';

export interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    /** Shown between the label and the switch, e.g. a preview of what the setting changes. */
    icons?: ReactNode;
    /** "row": label on the left, switch on the right, full width - for a list of settings. */
    layout?: 'inline' | 'row';
}

// A plain checkbox styled as a track/thumb - the visually-hidden <input
// type="checkbox"> is what actually carries the checked state and keyboard/
// screen-reader semantics, the track and thumb spans are purely decorative
// siblings driven off its :checked state.
export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, icons, layout = 'inline' }) => (
    <label className={layout === 'row' ? 'sg-toggle sg-toggle--row' : 'sg-toggle'}>
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sg-toggle-input"
        />
        <span className="sg-toggle-track">
            <span className="sg-toggle-thumb" />
        </span>
        <span className="sg-toggle-label">{label}</span>
        {icons && <span className="sg-toggle-icons">{icons}</span>}
    </label>
);

export default Toggle;
