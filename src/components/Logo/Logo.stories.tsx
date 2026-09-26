import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';
import { LOGOS, type LogoKey } from './logos';

const meta: Meta<typeof Logo> = {
    title: 'Components/Logo',
    component: Logo,
};

export default meta;

export const All: StoryObj<typeof Logo> = {
    render: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 96px)', gap: 16 }}>
            {(Object.keys(LOGOS) as LogoKey[]).map((key) => (
                <div key={key} style={{ textAlign: 'center', fontSize: 12, color: 'var(--sg-text-muted)' }}>
                    <Logo name={key} size={32} color="var(--sg-text)" />
                    <div>{LOGOS[key].label}</div>
                </div>
            ))}
        </div>
    ),
};
