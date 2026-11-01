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
    /** What the room for a new note says. Default: the translated "Double click to add a note". */
    placeholder?: string;
    className?: string;
}

// The notes about something: each one changes with a double click and goes with its ×, shown
// with a mouse on the note it's on; the empty one at the bottom (.sg-notes-new), once written,
// is one more. useNotes keeps them, any app's thing's, by its uuid.
export const Notes = ({ notes, onAdd, onEdit, onDelete, placeholder, className }: NotesProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });

    return (
        <ul className={['sg-notes', className].filter(Boolean).join(' ')}>
            {notes.map((note) => (
                <li key={note.id} className="sg-notes-item">
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
                <EditableText value="" placeholder={placeholder ?? t('notes.add')} onSave={onAdd} />
            </li>
        </ul>
    );
};

export default Notes;
