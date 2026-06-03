import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import LoginModal from './LoginModal';
import Button from '../Button/Button';

const meta: Meta<typeof LoginModal> = {
    title: 'Components/LoginModal',
    component: LoginModal,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        const handleLogin = (username: string, password: string) => {
            alert(`Login: ${username} / ${password}`);
            setOpen(false);
        };
        return (
            <>
                <Button label="Apri Login" onClick={() => setOpen(true)} />
                <LoginModal open={open} onClose={() => setOpen(false)} onLogin={handleLogin} />
            </>
        );
    },
};
