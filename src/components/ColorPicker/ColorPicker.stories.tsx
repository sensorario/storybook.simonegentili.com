import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
    title: 'Components/ColorPicker',
    component: ColorPicker,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

const SAMPLE_SWATCHES = [
    '#000000',
    '#ffffff',
    '#3d5fc4',
    '#cf4a5c',
    '#1f8f5e',
    '#f6c343',
    '#8e6fce',
    '#2e4aa0',
    '#e2e7f8',
    '#647089',
    '#1f2a3c',
    '#ffb703',
];

// Controlled at the story level (not just a fixed `value` arg) so picking a
// swatch or typing a custom color in Storybook's own canvas actually shows
// the swatch/toggle label update, the same way a real consumer's own state
// would.
export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('#3d5fc4');
        return <ColorPicker value={value} onChange={setValue} swatches={SAMPLE_SWATCHES} />;
    },
};
