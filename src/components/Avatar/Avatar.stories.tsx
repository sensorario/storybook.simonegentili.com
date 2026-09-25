import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const PHOTO =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="#8fb3a1"/><circle cx="40" cy="32" r="14" fill="#f4e3cf"/><rect x="18" y="52" width="44" height="28" rx="14" fill="#f4e3cf"/></svg>');

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initial: Story = { args: { name: 'sensorario' } };

export const Image: Story = { args: { src: PHOTO, name: 'sensorario' } };

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name="Simone" size={24} />
            <Avatar name="Simone" />
            <Avatar name="Simone" size={48} />
            <Avatar src={PHOTO} name="Simone" size={80} />
        </div>
    ),
};
