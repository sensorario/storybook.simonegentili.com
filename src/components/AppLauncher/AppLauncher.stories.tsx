import type { Meta, StoryObj } from '@storybook/react';
import AppLauncher from './AppLauncher';

const DEMO_APPS = {
    apps: [
        { name: 'simonegentili.com', url: 'https://simonegentili.com' },
        { name: 'Quadrato', url: 'https://quadrato.simonegentili.com', color: '#3d5fc4', icon: 'sparkles' },
        { name: 'Tome', url: 'https://tome.simonegentili.com' },
        { name: 'Gantt', url: 'https://gantt.simonegentili.com', color: '#f97316' },
        { name: 'Guitar', url: 'https://guitar.simonegentili.com', color: '#059669', icon: 'joystick' },
        { name: 'Bookcrossing', url: 'https://bookcrossing.simonegentili.com' },
        { name: 'Hermesmetis', url: 'https://hermesmetis.simonegentili.com', locked: true, color: '#e11d48', icon: 'brain' },
    ],
};

const meta: Meta<typeof AppLauncher> = {
    title: 'Components/AppLauncher',
    component: AppLauncher,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: 360 }}>
                <Story />
            </div>
        ),
    ],
};
export default meta;

type Story = StoryObj<typeof AppLauncher>;

export const Default: Story = {
    args: {
        appsUrl: `data:application/json,${encodeURIComponent(JSON.stringify(DEMO_APPS))}`,
    },
};

export const Live: Story = {};
