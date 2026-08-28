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
    // Position is an offset from the centered layout .modal-overlay already
    // gives .modal-content via flexbox, not an absolute coordinate - so a
    // freshly-opened modal is always centered regardless of where a
    // previous instance was left, and dragging never has to fight the
    // centering for its starting point.
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const dragOrigin = React.useRef<{
        pointerX: number;
        pointerY: number;
        offsetX: number;
        offsetY: number;
    } | null>(null);
    const [dragging, setDragging] = useState(false);

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

    // A consumer that toggles `open` on one long-lived Modal instance
    // (rather than mounting a fresh one per popup, as this library's own
    // callers do) would otherwise reopen wherever the last drag left off.
    // Adjusting state during render (React's documented pattern for
    // deriving state from a prop change) rather than in an effect, since
    // this is synchronizing with `open`, not an external system.
    const [wasOpen, setWasOpen] = useState(open);
    if (open !== wasOpen) {
        setWasOpen(open);
        if (open) setDragOffset({ x: 0, y: 0 });
    }

    if (!open) return null;

    function startDrag(e: React.PointerEvent<HTMLDivElement>) {
        // Let the close button (and any other header control) handle its
        // own click instead of starting a drag.
        if ((e.target as HTMLElement).closest('.modal-close')) return;
        dragOrigin.current = {
            pointerX: e.clientX,
            pointerY: e.clientY,
            offsetX: dragOffset.x,
            offsetY: dragOffset.y,
        };
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function continueDrag(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragOrigin.current) return;
        const { pointerX, pointerY, offsetX, offsetY } = dragOrigin.current;
        setDragOffset({
            x: offsetX + (e.clientX - pointerX),
            y: offsetY + (e.clientY - pointerY),
        });
    }

    function endDrag() {
        dragOrigin.current = null;
        setDragging(false);
    }

    return (
        <div
            className={`modal-overlay${closing ? ' modal-overlay-closing' : ''}`}
            onClick={() => closeWith(onClose)}
        >
            <div
                className={`modal-content${className ? ` ${className}` : ''}${closing ? ' modal-content-closing' : ''}`}
                // CSS custom properties, not a `transform` set here directly
                // - Modal.css's keyframes need to read the same offset so
                // the open/close animations build on top of it instead of
                // snapping back to center when the animation's own
                // transform briefly overrides an inline one (see its
                // comment on .modal-content).
                style={
                    {
                        '--drag-x': `${dragOffset.x}px`,
                        '--drag-y': `${dragOffset.y}px`,
                    } as React.CSSProperties
                }
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`modal-header${dragging ? ' modal-header-dragging' : ''}`}
                    onPointerDown={startDrag}
                    onPointerMove={continueDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                >
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
