import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import './Modal.css';

export type ModalButton = {
    label: string;
    onClick: () => void;
};

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    buttons?: ModalButton[];
    footer?: React.ReactNode;
    // Accessible name for the dismiss button - this library has no i18n
    // dependency of its own, so consumers pass their own translated string.
    closeLabel?: string;
    // Extra class appended to .modal-content, so a consumer can override
    // sizing (width/max-height) for one specific modal instance via its own
    // CSS without needing a prop for every possible dimension.
    className?: string;
}

// Must match the .modal-content-closing / .modal-overlay-closing animation
// duration in Modal.css.
const CLOSE_ANIMATION_MS = 220;

export const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    icon,
    children,
    buttons,
    footer,
    closeLabel = 'Close',
    className,
}) => {
    const [closing, setClosing] = useState(false);

    const closeWith = (callback: () => void) => {
        if (closing) return;
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            callback();
        }, CLOSE_ANIMATION_MS);
    };

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeWith(onClose);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className={`modal-overlay${closing ? ' modal-overlay-closing' : ''}`}
            onClick={() => closeWith(onClose)}
        >
            <div
                className={`modal-content${className ? ` ${className}` : ''}${closing ? ' modal-content-closing' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    {icon && <span className="modal-icon">{icon}</span>}
                    {title && <h2 className="modal-title">{title}</h2>}
                    <button
                        type="button"
                        className="modal-close"
                        aria-label={closeLabel}
                        onClick={() => closeWith(onClose)}
                        disabled={closing}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-children">{children}</div>
                {buttons && (
                    <div className="modal-footer">
                        {buttons.map((button, index) => (
                            <Button
                                key={index}
                                label={button.label}
                                onClick={() => closeWith(button.onClick)}
                                disabled={closing}
                            />
                        ))}
                    </div>
                )}
                {footer && <div className="modal-footer">{footer}</div>}
            </div>
        </div>
    );
};

export default Modal;
