import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
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
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword === '' || confirmPassword === '') {
            setError(t('setPassword.errorEmpty'));
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(t('setPassword.errorMismatch'));
            return;
        }

        setError('');
        onSubmit(newPassword);
    };

    return (
        <Modal open={open} onClose={onClose} title={t('setPassword.title')}>
            <form className="set-password-modal-form" onSubmit={handleSubmit}>
                <PasswordInput label={t('setPassword.newPassword')} value={newPassword} onChange={e => setNewPassword(e.target.value)} autoFocus />
                <PasswordInput label={t('setPassword.confirmPassword')} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                {error && <p className="set-password-modal-error">{error}</p>}
                <Button label={t('setPassword.submit')} type="submit" style={{ width: '100%' }} />
            </form>
        </Modal>
    );
};

export default SetPasswordModal;
