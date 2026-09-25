import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
    title: 'Components/ProgressBar',
    component: ProgressBar,
    args: { value: 3, max: 10, label: '3/10 file revisionati' },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Success: Story = { args: { tone: 'success', value: 10, label: '10/10' } };

export const Over: Story = { args: { tone: 'danger', value: 240, max: 200, label: '+40g in eccesso' } };

export const WithoutLabel: Story = { args: { label: undefined, ariaLabel: 'Proteine' } };
