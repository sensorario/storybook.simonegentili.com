import { useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import { EditableText } from '../EditableText/EditableText';
import './Notes.css';

/** A note as the notes service (useNotes) answers it. */
export type Note = {
    id: string;
    text: string;
    /** Unix seconds. */
    addedAt: number;
};

interface NotesProps {
    notes: Note[];
    onAdd: (text: string) => void;
    onEdit: (noteId: string, text: string) => void;
    onDelete: (noteId: string) => void;
    /** How a new note is written: in the empty text at the bottom, with a double click (default), or in a field always open there. */
    addWith?: 'doubleClick' | 'field';
    /** What the room for a new note says. Default: the translated "Double click to add a note", or "Write a note" in the field. */
    placeholder?: string;
    /** Shows before each note the day and time it was written (Hermes Metis' Diario). */
    showAddedAt?: boolean;
    className?: string;
}

// The notes about something: each one changes with a double click and goes with its ×, shown
// with a mouse on the note it's on; the empty one at the bottom (.sg-notes-new), once written,
// is one more. useNotes keeps them, any app's thing's, by its uuid.
export const Notes = ({
    notes,
    onAdd,
    onEdit,
    onDelete,
    addWith = 'doubleClick',
    placeholder,
    showAddedAt = false,
    className,
}: NotesProps) => {
    const { t, i18n } = useTranslation('sg', { i18n: sgI18n });

    return (
        <ul className={['sg-notes', className].filter(Boolean).join(' ')}>
            {notes.map((note) => (
                <li key={note.id} className="sg-notes-item">
                    {showAddedAt && <AddedAt seconds={note.addedAt} language={i18n.language} />}
                    <EditableText value={note.text} onSave={(text) => onEdit(note.id, text)} />
                    <button
                        type="button"
                        className="sg-notes-delete"
                        aria-label={t('notes.delete')}
                        title={t('notes.delete')}
                        onClick={() => onDelete(note.id)}
                    >
                        ×
                    </button>
                </li>
            ))}
            <li className="sg-notes-item sg-notes-new">
                {addWith === 'field' ? (
                    <NoteField placeholder={placeholder ?? t('notes.write')} onAdd={onAdd} />
                ) : (
                    <EditableText value="" placeholder={placeholder ?? t('notes.add')} onSave={onAdd} />
                )}
            </li>
        </ul>
    );
};

// 24 hours whatever the language, as EditableTime's.
const AddedAt = ({ seconds, language }: { seconds: number; language: string }) => {
    const date = new Date(seconds * 1000);

    return (
        <time className="sg-notes-time" dateTime={date.toISOString()}>
            {date.toLocaleString(language, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23',
            })}
        </time>
    );
};

// As EditableText's: leaving it saves, Enter too (Shift+Enter starts a new line), an empty text isn't
// saved. Then it's empty again, for the next one.
const NoteField = ({ placeholder, onAdd }: { placeholder: string; onAdd: (text: string) => void }) => {
    const [text, setText] = useState('');

    const save = () => {
        if (text.trim() !== '') onAdd(text.trim());
        setText('');
    };

    // Not while an input method is composing (Japanese, Chinese…): there Enter picks the characters.
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            save();
        }
    };

    return (
        <textarea
            className="sg-notes-field"
            value={text}
            rows={3}
            placeholder={placeholder}
            aria-label={placeholder}
            onChange={(e) => setText(e.target.value)}
            onBlur={save}
            onKeyDown={handleKeyDown}
        />
    );
};

export default Notes;
