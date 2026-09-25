import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const SECTIONS = [
    { value: 'giornate', label: 'Giornate' },
    { value: 'riepiloghi', label: 'Riepiloghi' },
    { value: 'clienti', label: 'Clienti' },
];

export const Underline: Story = {
    render: () => {
        const [tab, setTab] = useState('giornate');
        return <Tabs ariaLabel="Sezioni" items={SECTIONS} value={tab} onChange={setTab} />;
    },
};

export const Pills: Story = {
    render: () => {
        const [tab, setTab] = useState('tutti');
        return (
            <Tabs
                variant="pills"
                items={[
                    { value: 'tutti', label: 'Tutti' },
                    { value: 'lavoro', label: 'Lavoro' },
                    { value: 'casa', label: 'Casa' },
                    { value: 'archivio', label: 'Archivio', disabled: true },
                ]}
                value={tab}
                onChange={setTab}
            />
        );
    },
};

export const Segmented: Story = {
    render: () => {
        const [tab, setTab] = useState('edit');
        return (
            <div style={{ maxWidth: 320 }}>
                <Tabs
                    variant="segmented"
                    items={[
                        { value: 'edit', label: 'Modifica' },
                        { value: 'preview', label: 'Anteprima' },
                    ]}
                    value={tab}
                    onChange={setTab}
                />
            </div>
        );
    },
};
