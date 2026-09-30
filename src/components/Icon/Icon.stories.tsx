import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Line icons (24x24, stroke, multi-element) for toolbars and UI controls. For solid single-path icons (app icons in AppLauncher, eddiethor covers and PDF export) use `Logo` instead.',
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
    args: {
        name: 'check',
    },
};

const ALL_NAMES: IconName[] = [
    'menu',
    'layout',
    'edit',
    'help-circle',
    'check',
    'x',
    'file-plus',
    'link',
    'share-2',
    'download',
    'book',
    'book-closed',
    'printer',
    'eye',
    'columns',
    'sidebar-left',
    'sidebar-right',
    'play',
    'pause',
    'volume-2',
    'tech-node',
    'tech-go',
    'tech-php',
    'grid',
    'lock',
    'list-check',
];

export const AllIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {ALL_NAMES.map((name) => (
                <div
                    key={name}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12,
                    }}
                >
                    <Icon name={name} size={24} />
                    <span>{name}</span>
                </div>
            ))}
        </div>
    ),
};
