import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

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
