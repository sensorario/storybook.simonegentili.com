import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notes, type Note } from './Notes';

const meta: Meta<typeof Notes> = {
    title: 'Components/Notes',
    component: Notes,
};

export default meta;
type Story = StoryObj<typeof Notes>;

// Kept here instead of in the notes service, which useNotes talks to.
const NotesOf = ({
    initial,
    addWith,
    showAddedAt,
}: {
    initial: Note[];
    addWith?: 'doubleClick' | 'field';
    showAddedAt?: boolean;
}) => {
    const [notes, setNotes] = useState(initial);
    return (
        <Notes
            notes={notes}
            addWith={addWith}
            showAddedAt={showAddedAt}
            onAdd={(text) => setNotes((list) => [...list, { id: crypto.randomUUID(), text, addedAt: Date.now() / 1000 }])}
            onEdit={(noteId, text) => setNotes((list) => list.map((n) => (n.id === noteId ? { ...n, text } : n)))}
            onDelete={(noteId) => setNotes((list) => list.filter((n) => n.id !== noteId))}
        />
    );
};

// An activity of Hermes Metis' Attività, as its card shows it.
export const Default: Story = {
    render: () => (
        <div style={{ maxWidth: 480 }}>
            <strong>15:35 · Cucinato</strong>
            <NotesOf
                initial={[
                    { id: 'n-1', text: 'Pasta al pomodoro', addedAt: 1793540100 },
                    { id: 'n-2', text: 'Per quattro, con i bambini', addedAt: 1793540160 },
                ]}
            />
        </div>
    ),
};

export const Empty: Story = {
    render: () => <NotesOf initial={[]} />,
};

// A day of Hermes Metis' Diario: what was written that day, when, then the field for one more.
export const Field: Story = {
    render: () => (
        <div style={{ maxWidth: 480 }}>
            <NotesOf
                addWith="field"
                showAddedAt
                initial={[
                    { id: 'n-1', text: 'Mattina pesante, ma sono uscito a camminare.', addedAt: 1793540100 },
                    { id: 'n-2', text: 'Il pomeriggio è andato meglio.', addedAt: 1793558100 },
                ]}
            />
        </div>
    ),
};
