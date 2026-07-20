import type { Meta, StoryObj } from '@storybook/react';
import { QuadratoHeader } from './QuadratoHeader';

const STORY_COOKIE_NAME = 'storybook-demo-token';

const meta: Meta<typeof QuadratoHeader> = {
  title: 'Quadrato/Header',
  component: QuadratoHeader,
  tags: ['autodocs'],
  args: {
    cookieName: STORY_COOKIE_NAME,
    onLogin: (username: string) => alert(`Login: ${username}`),
    onLogout: () => alert('Logout'),
    onUserAuthenticated: (isAuthenticated: boolean, username: string | null) =>
      console.log('onUserAuthenticated', { isAuthenticated, username }),
  },
};

export default meta;
type Story = StoryObj<typeof QuadratoHeader>;

export const LoggedOut: Story = {
  render: (args) => {
    document.cookie = `${STORY_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    return <QuadratoHeader {...args} />;
  },
};

export const LoggedIn: Story = {
  args: {
    username: 'sensorario',
  },
  render: (args) => {
    document.cookie = `${STORY_COOKIE_NAME}=demo-token; path=/`;
    return <QuadratoHeader {...args} />;
  },
};
