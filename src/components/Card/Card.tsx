import { createElement, type ReactNode } from 'react';
import './Card.css';

interface CardProps {
    /** Rendered next to each other at the top: title on the left, e.g. a date on the right. */
    header?: ReactNode;
    /** Row of links/buttons below the content. */
    actions?: ReactNode;
    children?: ReactNode;
    variant?: 'default' | 'mini';
    /** Lifts on hover, for cards that are themselves a link or a button. */
    interactive?: boolean;
    as?: 'div' | 'li' | 'article' | 'section' | 'a';
    href?: string;
    className?: string;
}

export const Card = ({
    header,
    actions,
    children,
    variant = 'default',
    interactive = false,
    as = 'div',
    href,
    className,
}: CardProps) =>
    createElement(
        as,
        {
            className: ['sg-card', `sg-card--${variant}`, interactive ? 'sg-card--interactive' : '', className]
                .filter(Boolean)
                .join(' '),
            href,
        },
        header && <div className="sg-card-header">{header}</div>,
        children,
        actions && <div className="sg-card-actions">{actions}</div>,
    );

export default Card;
