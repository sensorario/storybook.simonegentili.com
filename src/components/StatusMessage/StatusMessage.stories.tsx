import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusMessage } from './StatusMessage';

const meta: Meta<typeof StatusMessage> = {
    title: 'Components/StatusMessage',
    component: StatusMessage,
};

export default meta;
type Story = StoryObj<typeof StatusMessage>;

export const Loading: Story = { args: { kind: 'loading' } };

export const Empty: Story = { args: { kind: 'empty', children: 'Nessun episodio registrato.' } };

export const Error: Story = { args: { kind: 'error', children: 'Impossibile caricare i dati.' } };

export const ErrorBoxed: Story = { args: { kind: 'error', boxed: true, children: 'Impossibile caricare i dati.' } };

export const InfoBoxed: Story = { args: { kind: 'info', boxed: true, children: 'Le modifiche vengono salvate automaticamente.' } };
