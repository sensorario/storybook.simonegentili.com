import type { Meta, StoryObj } from '@storybook/react';
import AppAccessGate from './AppAccessGate';

// Stubs the two Heimdall calls, pretending the page Storybook runs on is an app with the given access.
const stubHeimdall = (access: string) => {
    window.fetch = async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.endsWith('/access')) {
            return new Response(JSON.stringify({
                apps: [{ name: 'Guitar', url: window.location.origin, slug: 'guitar', access }],
            }));
        }
        return new Response('{}', { status: 201 });
    };
};

const meta: Meta<typeof AppAccessGate> = {
    title: 'Components/AppAccessGate',
    component: AppAccessGate,
    tags: ['autodocs'],
    args: { token: 'demo-token', heimdallUrl: 'https://heimdall.example' },
};
export default meta;

type Story = StoryObj<typeof AppAccessGate>;

export const NotGranted: Story = {
    decorators: [(Story) => { stubHeimdall('none'); return <Story />; }],
};

export const Pending: Story = {
    decorators: [(Story) => { stubHeimdall('pending'); return <Story />; }],
};

export const Rejected: Story = {
    decorators: [(Story) => { stubHeimdall('rejected'); return <Story />; }],
};
