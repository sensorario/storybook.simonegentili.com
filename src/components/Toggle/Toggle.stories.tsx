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

export const Row: Story = {
    render: () => {
        const [checked, setChecked] = useState(true);
        return (
            <div style={{ maxWidth: 360 }}>
                <Toggle layout="row" checked={checked} onChange={setChecked} label="Icone panda" icons={<span aria-hidden="true">🐼 🐼</span>} />
            </div>
        );
    },
};
