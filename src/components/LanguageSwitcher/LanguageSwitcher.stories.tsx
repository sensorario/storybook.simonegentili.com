import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'Components/LanguageSwitcher',
    component: LanguageSwitcher,
};

export default meta;

export const Default: StoryObj<typeof LanguageSwitcher> = {};
