import React from 'react';
import './Modal.css';

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {title && <h2 className="modal-title">{title}</h2>}
                <button className="modal-close" onClick={onClose}>&times;</button>
                <div className="modal-children">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
