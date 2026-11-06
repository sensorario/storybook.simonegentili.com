import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditableTime } from './EditableTime';

const meta: Meta<typeof EditableTime> = {
    title: 'Components/EditableTime',
    component: EditableTime,
};

export default meta;
type Story = StoryObj<typeof EditableTime>;

// An activity of Hermes Metis' Attività, as its card shows it: a double click on the time.
export const Default: Story = {
    render: () => {
        const [time, setTime] = useState('15:35');
        return (
            <p>
                <EditableTime value={time} onSave={setTime} /> · <strong>Cucinato</strong>
            </p>
        );
    },
};

// While the page is saving something else.
export const Disabled: Story = {
    args: { value: '07:45', onSave: () => {}, disabled: true },
};
