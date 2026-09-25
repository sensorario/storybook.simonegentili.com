import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        label: 'Click me',
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
            <Button label="Salva" />
            <Button variant="secondary" label="Annulla" />
            <Button variant="danger" label="Elimina" />
        </div>
    ),
};
