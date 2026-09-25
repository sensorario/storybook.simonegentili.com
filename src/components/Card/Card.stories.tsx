import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: { children: <p style={{ margin: 0 }}>Un contenuto qualsiasi dentro una card.</p> },
};

export const WithHeaderAndActions: Story = {
    args: {
        header: (
            <>
                <strong>Discussione con il capo</strong>
                <span style={{ fontSize: 12, color: 'var(--sg-text-muted)' }}>12/09</span>
            </>
        ),
        children: (
            <div style={{ display: 'flex', gap: 6 }}>
                <Badge>ansia</Badge>
                <Badge>rabbia</Badge>
            </div>
        ),
        actions: (
            <>
                <a href="#">Continua la catena</a>
                <a href="#">Elimina</a>
            </>
        ),
    },
};

export const Mini: Story = { args: { variant: 'mini', children: 'Card compatta' } };

export const InteractiveLink: Story = {
    args: {
        as: 'a',
        href: '#',
        interactive: true,
        header: <strong>Quadrato</strong>,
        children: 'Gestione task e progetti.',
    },
};
