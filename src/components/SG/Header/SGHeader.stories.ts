import type { Meta, StoryObj } from '@storybook/react';
import { SGHeader } from './SGHeader';

const meta: Meta<typeof SGHeader> = {
  title: 'SG/Header',
  component: SGHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SGHeader>;

export const Default: Story = {};