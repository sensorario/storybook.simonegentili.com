import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';
import './SetPasswordModal.css';

interface SetPasswordModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (newPassword: string) => void;
}

export const SetPasswordModal: React.FC<SetPasswordModalProps> = ({ open, onClose, onSubmit }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword === '' || confirmPassword === '') {
            setError('Inserisci ed conferma la nuova password.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Le password non coincidono.');
            return;
        }

        setError('');
        onSubmit(newPassword);
    };

    return (
        <Modal open={open} onClose={onClose} title="Imposta una nuova password">
            <form className="set-password-modal-form" onSubmit={handleSubmit}>
                <PasswordInput label="Nuova password" value={newPassword} onChange={e => setNewPassword(e.target.value)} autoFocus />
                <PasswordInput label="Conferma password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {error && <p className="set-password-modal-error">{error}</p>}
                <Button label="Salva password" type="submit" style={{ width: '100%' }} />
            </form>
        </Modal>
    );
};

export default SetPasswordModal;
