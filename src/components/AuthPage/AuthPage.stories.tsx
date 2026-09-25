import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPage } from './AuthPage';
import { RegisterForm } from '../RegisterForm/RegisterForm';

const meta: Meta<typeof AuthPage> = {
    title: 'Components/AuthPage',
    component: AuthPage,
};

export default meta;
type Story = StoryObj<typeof AuthPage>;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const Register: Story = {
    render: () => (
        <AuthPage title="Registrati" footer={<a href="#">Torna alla mappa</a>}>
            <RegisterForm onRegister={() => wait(600)} />
        </AuthPage>
    ),
};

export const RegisterError: Story = {
    render: () => (
        <AuthPage title="Registrati" footer={<a href="#">Torna alla home</a>}>
            <RegisterForm
                onRegister={async () => {
                    await wait(300);
                    throw new Error('Email già registrata.');
                }}
            />
        </AuthPage>
    ),
};

export const Registered: Story = {
    render: () => (
        <AuthPage title="Registrazione completata!" footer={<a href="#">Vai alla mappa e accedi</a>}>
            <p>Controlla la tua email: ti abbiamo inviato la password temporanea per accedere.</p>
        </AuthPage>
    ),
};
