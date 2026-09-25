import type { CSSProperties } from 'react';
import './Avatar.css';

interface AvatarProps {
    src?: string | null;
    /** Alt text, and its first letter is shown when there's no image. */
    name?: string | null;
    size?: number;
    className?: string;
}

export const Avatar = ({ src, name, size = 32, className }: AvatarProps) => {
    const classes = ['sg-avatar', className].filter(Boolean).join(' ');
    const style = { '--avatar-size': `${size}px` } as CSSProperties;

    if (src) return <img className={classes} style={style} src={src} alt={name ?? ''} />;

    return (
        <span className={classes} style={style} role="img" aria-label={name ?? undefined}>
            {name?.trim().charAt(0).toUpperCase() || '?'}
        </span>
    );
};

export default Avatar;
