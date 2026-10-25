import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StepRange } from './StepRange';

const meta: Meta<typeof StepRange> = {
    title: 'Components/StepRange',
    component: StepRange,
};

export default meta;
type Story = StoryObj<typeof StepRange>;

// Quadrato's task list: each step holds the tasks of the ones before it too.
const LEVELS = [
    { value: 'expired', label: 'Scaduti', count: 0, tone: 'danger' as const },
    { value: 'day', label: 'Oggi', count: 2 },
    { value: 'week', label: '7 giorni', count: 6 },
    { value: 'month', label: '4 settimane', count: 11 },
    { value: 'all', label: 'Tutti', count: 30 },
];

export const Default: Story = {
    render: () => {
        const [level, setLevel] = useState('week');
        return (
            <div style={{ maxWidth: 480 }}>
                <StepRange ariaLabel="Scadenze" items={LEVELS} value={level} onChange={setLevel} />
            </div>
        );
    },
};

export const WithOverdue: Story = {
    render: () => {
        const [level, setLevel] = useState('expired');
        return (
            <div style={{ maxWidth: 480 }}>
                <StepRange
                    ariaLabel="Scadenze"
                    items={LEVELS.map((item) => ({ ...item, count: item.count + 3 }))}
                    value={level}
                    onChange={setLevel}
                />
            </div>
        );
    },
};
