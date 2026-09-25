import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import { Button } from '../Button/Button';
import { FormField } from '../FormField/FormField';
import { StatusMessage } from '../StatusMessage/StatusMessage';
import './RegisterForm.css';

interface RegisterFormProps {
    /** Calls the app's register endpoint; a thrown Error's message is shown to the user. */
    onRegister: (email: string) => Promise<void>;
    /** Called after a successful registration instead of showing the "check your email" message, e.g. to navigate. */
    onRegistered?: (email: string) => void;
}

export const RegisterForm = ({ onRegister, onRegistered }: RegisterFormProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const address = email.trim();
        setSending(true);
        setError(null);
        try {
            await onRegister(address);
            if (onRegistered) onRegistered(address);
            else setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setSending(false);
        }
    };

    if (sent) return <StatusMessage boxed>{t('register.sent')}</StatusMessage>;

    return (
        <form className="sg-register-form" onSubmit={handleSubmit}>
            <FormField label={t('register.email')} error={error ?? undefined}>
                <input
                    className="input-field"
                    type="email"
                    autoComplete="email"
                    placeholder={t('register.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </FormField>
            <Button
                type="submit"
                label={sending ? t('register.sending') : t('register.submit')}
                disabled={sending || email.trim() === ''}
            />
        </form>
    );
};

export default RegisterForm;
