import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FontPicker from './FontPicker';

const meta: Meta<typeof FontPicker> = {
    title: 'Components/FontPicker',
    component: FontPicker,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FontPicker>;

// System-safe font stacks only, so the picker renders sensibly even in an
// environment (like a fresh Storybook checkout) with no custom webfonts
// loaded - a real consumer passes its own curated, webfont-backed list.
const SAMPLE_OPTIONS = [
    "'Georgia', serif",
    "'Arial', sans-serif",
    "'Courier New', monospace",
    "'Times New Roman', serif",
    "'Verdana', sans-serif",
];

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState(SAMPLE_OPTIONS[0]);
        return <FontPicker value={value} onChange={setValue} options={SAMPLE_OPTIONS} />;
    },
};
