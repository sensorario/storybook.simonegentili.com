import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormField } from './FormField';
import { Textarea } from '../Textarea/Textarea';
import { Select } from '../Select/Select';

const meta: Meta<typeof FormField> = {
    title: 'Components/FormField',
    component: FormField,
    decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Form: Story = {
    render: () => {
        const [slug, setSlug] = useState('Il mio libro');
        const valid = /^[a-z0-9-]+$/.test(slug);
        return (
            <form>
                <FormField label="Titolo" hint="Come apparirà in copertina.">
                    <input className="input-field" defaultValue="Token-free developer" />
                </FormField>
                <FormField label="Slug" error={valid ? undefined : 'Solo minuscole, numeri e trattini.'}>
                    <input className="input-field" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </FormField>
                <FormField label="Descrizione">
                    <Textarea placeholder="Di cosa parla il libro…" />
                </FormField>
                <FormField label="Lingua">
                    <Select defaultValue="it">
                        <option value="it">Italiano</option>
                        <option value="en">English</option>
                    </Select>
                </FormField>
            </form>
        );
    },
};
