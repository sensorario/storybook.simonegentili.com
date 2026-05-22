import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
    title: 'Components/Footer',
    component: Footer,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const WithLinks: Story = {
    args: {
        copyright: '© 2026 simonegentili.com',
        links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Contact', href: '/contact' },
        ],
    },
};

export const CustomCopyright: Story = {
    args: {
        copyright: '© 2026 Simone Gentili. All rights reserved.',
    },
};
