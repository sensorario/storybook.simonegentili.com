import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from './Icon';

const meta: Meta<typeof Icon> = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
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
    'printer',
    'eye',
    'columns',
    'tech-node',
    'tech-go',
    'tech-php',
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
