import type { Meta, StoryObj } from '@storybook/react';
import { SGFooter } from './SGFooter';

const meta: Meta<typeof SGFooter> = {
  title: 'SG/Footer',
  component: SGFooter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SGFooter>;

export const Default: Story = {};
