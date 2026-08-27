import React from 'react';
import './Icon.css';

// A small, hand-authored line-icon set (24x24, stroke-based, currentColor)
// shared across every app that consumes this library, so a toolbar built
// from these always looks consistent regardless of which app renders it.
// Add new names here rather than inlining one-off SVGs in a consuming app.
export type IconName =
    | 'menu'
    | 'layout'
    | 'edit'
    | 'help-circle'
    | 'check'
    | 'file-plus'
    | 'link'
    | 'share-2'
    | 'download'
    | 'book'
    | 'printer'
    | 'eye'
    | 'columns';

const ICON_PATHS: Record<IconName, React.ReactNode> = {
    menu: (
        <>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </>
    ),
    layout: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="9" x2="9" y2="21" />
        </>
    ),
    edit: (
        <>
            <path d="M4 20l1-4L16 5l3 3L8 19l-4 1z" />
            <line x1="14" y1="7" x2="17" y2="10" />
        </>
    ),
    'help-circle': (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" />
            <line x1="12" y1="17" x2="12" y2="17.01" />
        </>
    ),
    check: <polyline points="4 12 9 17 20 6" />,
    'file-plus': (
        <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <polyline points="14 3 14 8 19 8" />
            <line x1="12" y1="12" x2="12" y2="17" />
            <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
        </>
    ),
    link: (
        <>
            <path d="M9 15l6-6" />
            <path d="M8 13.5 5.5 16a3 3 0 0 0 4.24 4.24l2.5-2.5" />
            <path d="M16 10.5 18.5 8a3 3 0 0 0-4.24-4.24l-2.5 2.5" />
        </>
    ),
    'share-2': (
        <>
            <circle cx="6" cy="12" r="2.4" />
            <circle cx="18" cy="6" r="2.4" />
            <circle cx="18" cy="18" r="2.4" />
            <line x1="8.2" y1="10.8" x2="15.8" y2="7.2" />
            <line x1="8.2" y1="13.2" x2="15.8" y2="16.8" />
        </>
    ),
    download: (
        <>
            <path d="M12 3v12" />
            <polyline points="7 11 12 16 17 11" />
            <path d="M5 19h14" />
        </>
    ),
    book: (
        <>
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5z" />
            <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5z" />
        </>
    ),
    printer: (
        <>
            <path d="M6 9V3h12v6" />
            <rect x="4" y="9" width="16" height="8" rx="1.5" />
            <path d="M6 17v4h12v-4" />
        </>
    ),
    eye: (
        <>
            <path d="M2 12c2.5-5 7-8 10-8s7.5 3 10 8c-2.5 5-7 8-10 8s-7.5-3-10-8z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    columns: (
        <>
            <rect x="3" y="4" width="8" height="16" rx="1.5" />
            <rect x="13" y="4" width="8" height="16" rx="1.5" />
        </>
    ),
};

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    name: IconName;
    size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 18, ...props }) => (
    <svg
        className="sg-icon"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
    >
        {ICON_PATHS[name]}
    </svg>
);

export default Icon;
