import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './Toggle';

const meta: Meta<typeof Toggle> = {
    title: 'Components/Toggle',
    component: Toggle,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return <Toggle checked={checked} onChange={setChecked} label="Modalità zen" />;
    },
};
