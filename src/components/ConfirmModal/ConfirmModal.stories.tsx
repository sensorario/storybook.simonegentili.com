import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmModal } from './ConfirmModal';
import { Button } from '../Button/Button';

const meta: Meta<typeof ConfirmModal> = {
    title: 'Components/ConfirmModal',
    component: ConfirmModal,
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button label="Svuota completati" onClick={() => setOpen(true)} />
                <ConfirmModal open={open} title="Svuotare i task completati?" onConfirm={() => setOpen(false)} onCancel={() => setOpen(false)}>
                    <p>I task completati verranno archiviati.</p>
                </ConfirmModal>
            </>
        );
    },
};

export const Danger: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button variant="danger" label="Elimina task" onClick={() => setOpen(true)} />
                <ConfirmModal
                    open={open}
                    danger
                    title="Eliminare il task?"
                    confirmLabel="Elimina"
                    onConfirm={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                >
                    <p>Questa azione non può essere annullata.</p>
                </ConfirmModal>
            </>
        );
    },
};
