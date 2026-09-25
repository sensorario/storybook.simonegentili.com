import type { Meta, StoryObj } from '@storybook/react-vite';
import { VersionNumber } from './VersionNumber';

const meta: Meta<typeof VersionNumber> = {
    title: 'Components/VersionNumber',
    component: VersionNumber,
    args: { version: '1.2.93' },
};

export default meta;

export const Default: StoryObj<typeof VersionNumber> = {};
