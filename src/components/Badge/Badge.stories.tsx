import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Tones: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 8 }}>
            <Badge>neutral</Badge>
            <Badge tone="accent">accent</Badge>
            <Badge tone="success">success</Badge>
            <Badge tone="danger">danger</Badge>
        </div>
    ),
};

const EMOTIONS = ['ansia', 'rabbia', 'tristezza', 'gioia'];

export const Selectable: Story = {
    render: () => {
        const [picked, setPicked] = useState<string[]>(['ansia']);
        const toggle = (e: string) => setPicked((p) => (p.includes(e) ? p.filter((x) => x !== e) : [...p, e]));
        return (
            <div style={{ display: 'flex', gap: 8 }}>
                {EMOTIONS.map((e) => (
                    <Badge key={e} selected={picked.includes(e)} onClick={() => toggle(e)}>{e}</Badge>
                ))}
            </div>
        );
    },
};

export const Removable: Story = {
    render: () => {
        const [members, setMembers] = useState(['sensorario', 'mario', 'lucia']);
        return (
            <div style={{ display: 'flex', gap: 8 }}>
                {members.map((m) => (
                    <Badge key={m} onRemove={() => setMembers(members.filter((x) => x !== m))}>{m}</Badge>
                ))}
            </div>
        );
    },
};
