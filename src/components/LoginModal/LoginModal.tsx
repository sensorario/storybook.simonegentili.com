import React, { useState } from 'react';
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <Modal open={open} onClose={onClose} title="Login">
            <form onSubmit={handleSubmit}>
                <Input label="Username" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
                <PasswordInput label="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button label="Login" type="submit" style={{ width: '100%' }} />
            </form>
        </Modal>
    );
};

export default LoginModal;
