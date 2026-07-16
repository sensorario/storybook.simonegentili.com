import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SetPasswordModal } from './SetPasswordModal';
import Button from '../Button/Button';

const meta: Meta<typeof SetPasswordModal> = {
    title: 'Components/SetPasswordModal',
    component: SetPasswordModal,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof SetPasswordModal>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        const handleSubmit = (newPassword: string) => {
            alert(`Nuova password: ${newPassword}`);
            setOpen(false);
        };
        return (
            <>
                <Button label="Apri Set Password" onClick={() => setOpen(true)} />
                <SetPasswordModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
            </>
        );
    },
};
