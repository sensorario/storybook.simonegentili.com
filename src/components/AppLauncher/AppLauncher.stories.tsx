import type { Meta, StoryObj } from '@storybook/react';
import AppLauncher from './AppLauncher';

const DEMO_APPS = {
    apps: [
        { name: 'simonegentili.com', url: 'https://simonegentili.com' },
        { name: 'Quadrato', url: 'https://quadrato.simonegentili.com' },
        { name: 'Tome', url: 'https://tome.simonegentili.com' },
        { name: 'Gantt', url: 'https://gantt.simonegentili.com' },
        { name: 'Guitar', url: 'https://guitar.simonegentili.com' },
        { name: 'Bookcrossing', url: 'https://bookcrossing.simonegentili.com' },
        { name: 'Hermesmetis', url: 'https://hermesmetis.simonegentili.com', locked: true },
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
