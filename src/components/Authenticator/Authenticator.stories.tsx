import type { Meta, StoryObj } from '@storybook/react';
import Authenticator from './Authenticator';

const meta: Meta<typeof Authenticator> = {
    title: 'Components/Authenticator',
    component: Authenticator,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Authenticator>;

export const Default: Story = {
    args: {
        isLoggedIn: false,
        handleLogin: () => alert('Login clicked'),
        handleLogout: () => alert('Logout clicked'),
    },
};

export const LoggedIn: Story = {
    args: {
        isLoggedIn: true,
        handleLogin: () => alert('Login clicked'),
        handleLogout: () => alert('Logout clicked'),
    },
};
