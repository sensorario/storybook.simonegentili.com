import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginPrompt } from './LoginPrompt';

const meta: Meta<typeof LoginPrompt> = {
    title: 'Components/LoginPrompt',
    component: LoginPrompt,
};

export default meta;
type Story = StoryObj<typeof LoginPrompt>;

export const TextOnly: Story = { args: { children: 'Accedi per visualizzare le sessioni.' } };

export const WithButton: Story = {
    args: {
        children: 'Devi accedere per usare Nutrimondo.',
        onLogin: () => {},
    },
};

export const WithRegisterLink: Story = {
    args: {
        children: 'Accedi per aggiungere un nuovo punto bookcrossing.',
        onLogin: () => {},
        footer: <>Non hai un account? <a href="#">Registrati</a></>,
    },
};
