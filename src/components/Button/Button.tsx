import React from 'react';
import './Button.css';
import { Icon, type IconName } from '../Icon/Icon';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    // Rendered before the label. Optional and additive - existing
    // text-only callers are unaffected.
    icon?: IconName;
    // Visually hides the label (kept in the DOM for screen readers, and
    // used as the native title/tooltip when the caller doesn't pass its
    // own) instead of removing it - a toolbar button reads as icon-only
    // without losing its accessible name.
    iconOnly?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
    label,
    icon,
    iconOnly,
    className,
    title,
    ...props
}) => (
    <button
        className={['custom-button', icon ? 'custom-button-with-icon' : '', className]
            .filter(Boolean)
            .join(' ')}
        title={title ?? (iconOnly ? label : undefined)}
        {...props}
    >
        {icon && <Icon name={icon} />}
        <span className={iconOnly ? 'custom-button-label-visually-hidden' : undefined}>
            {label}
        </span>
    </button>
);

export default Button;
