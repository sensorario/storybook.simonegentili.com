import type { Meta, StoryObj } from '@storybook/react';
import { CookieConsent } from './CookieConsent';

const meta: Meta<typeof CookieConsent> = {
  title: 'CookieConsent',
  component: CookieConsent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CookieConsent>;

export const Default: Story = {};
