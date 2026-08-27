import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button label="Apri Modale" onClick={() => setOpen(true)} />
                <Modal open={open} onClose={() => setOpen(false)} title="Titolo Modale">
                    <div>Contenuto della modale</div>
                </Modal>
            </>
        );
    },
};

export const WithIconAndButtons: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button label="Apri Modale" onClick={() => setOpen(true)} />
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Elimina task"
                    icon={<Icon name="edit" />}
                    buttons={[
                        { label: 'Annulla', onClick: () => setOpen(false) },
                        { label: 'Conferma', onClick: () => setOpen(false) },
                    ]}
                >
                    <div>Questa azione non può essere annullata.</div>
                </Modal>
            </>
        );
    },
};

export const WithCustomFooter: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button label="Apri Modale" onClick={() => setOpen(true)} />
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Titolo Modale"
                    footer={<span>Footer personalizzato</span>}
                >
                    <div>Contenuto della modale</div>
                </Modal>
            </>
        );
    },
};
