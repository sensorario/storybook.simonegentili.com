import { LOGOS, type LogoKey } from './logos';

interface LogoProps {
    name: LogoKey;
    size?: number;
    /** Defaults to the text color around it. */
    color?: string;
    /** Accessible name; without it the logo is decorative. */
    title?: string;
    className?: string;
}

export const Logo = ({ name, size = 24, color = 'currentColor', title, className }: LogoProps) => {
    const { viewBox, path } = LOGOS[name];

    return (
        <svg
            className={['sg-logo', className].filter(Boolean).join(' ')}
            width={size}
            height={size}
            viewBox={viewBox.join(' ')}
            fill={color}
            role={title ? 'img' : undefined}
            aria-label={title}
            aria-hidden={title ? undefined : true}
        >
            <path d={path} />
        </svg>
    );
};

export default Logo;
