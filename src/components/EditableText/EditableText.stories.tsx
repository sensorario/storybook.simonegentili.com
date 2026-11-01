import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditableText } from './EditableText';

const meta: Meta<typeof EditableText> = {
    title: 'Components/EditableText',
    component: EditableText,
};

export default meta;
type Story = StoryObj<typeof EditableText>;

// An ABC record's text (Hermes Metis): a double click to change it.
export const Default: Story = {
    render: () => {
        const [text, setText] = useState('Il capo non risponde alla mia email.');
        return (
            <p>
                <strong>A · Evento attivante</strong> <EditableText value={text} onSave={setText} />
            </p>
        );
    },
};

export const Empty: Story = {
    render: () => {
        const [text, setText] = useState('');
        return <EditableText value={text} onSave={setText} placeholder="Doppio clic per scrivere" />;
    },
};
