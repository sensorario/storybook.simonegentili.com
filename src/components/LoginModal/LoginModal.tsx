import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';
import './LoginModal.css';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <Modal open={open} onClose={onClose} title={t('auth.login')}>
            <form onSubmit={handleSubmit}>
                <Input label={t('auth.username')} value={username} onChange={e => setUsername(e.target.value)} autoFocus />
                <PasswordInput label={t('auth.password')} value={password} onChange={e => setPassword(e.target.value)} />
                <Button label={t('auth.login')} type="submit" style={{ width: '100%' }} />
            </form>
        </Modal>
    );
};

export default LoginModal;
