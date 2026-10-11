import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateNav } from './DateNav';

const meta: Meta<typeof DateNav> = {
    title: 'Components/DateNav',
    component: DateNav,
};

export default meta;
type Story = StoryObj<typeof DateNav>;

const today = () => new Date().toLocaleDateString('sv-SE');

// A diary (Nutrimondo, Farmaci): up to today, with the app's ← → and t.
export const UpToToday: Story = {
    render: () => {
        const [day, setDay] = useState(today);
        return <DateNav value={day} onChange={setDay} max={today()} shortcuts />;
    },
};

// A planner (quadrato): the days to come too.
export const IntoTheFuture: Story = {
    render: () => {
        const [day, setDay] = useState(today);
        return <DateNav value={day} onChange={setDay} />;
    },
};

export const Disabled: Story = {
    args: { value: '2026-10-09', onChange: () => {}, disabled: true },
};
