import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import type { Note } from './Notes';

export const DEFAULT_NOTES_URL = 'https://api.simonegentili.com/notes';

/** The notes service answered with an error: 401 is a token no longer good. */
export class NotesError extends Error {
    status: number;

    constructor(status: number) {
        super(`The notes service answered ${status}`);
        this.status = status;
    }
}

interface UseNotesOptions {
    /** Base URL of the notes service (`/subjects`). */
    notesUrl?: string;
    /** Told of what didn't go, with a translated message to show. */
    onError?: (error: Error, message: string) => void;
}

// The notes about the things on screen, any app's, by their uuid, from the notes service, where
// only who wrote them reads them. `load` reads those of the ids given in one call, and each add,
// edit and delete keeps them as the service answers. What's read is added to what's there, so an
// answer arriving late can't take away newer ones. None of them ever rejects: onError hears.
export const useNotes = (token: string, { notesUrl = DEFAULT_NOTES_URL, onError }: UseNotesOptions = {}) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [byId, setById] = useState<Record<string, Note[]>>({});

    const call = async <T,>(path: string, method = 'GET', body?: { text: string }): Promise<T> => {
        const res = await fetch(`${notesUrl}${path}`, {
            method,
            headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!res.ok) throw new NotesError(res.status);
        return res.json() as Promise<T>;
    };

    const fail = (message: string) => (error: unknown) =>
        onError?.(error instanceof Error ? error : new Error(String(error)), message);
    const change = (subjectId: string, update: (notes: Note[]) => Note[]) =>
        setById((current) => ({ ...current, [subjectId]: update(current[subjectId] ?? []) }));
    const pathOf = (subjectId: string, noteId?: string) =>
        `/subjects/${encodeURIComponent(subjectId)}${noteId === undefined ? '' : `/${encodeURIComponent(noteId)}`}`;

    const load = async (ids: string[]) => {
        if (ids.length === 0) return;
        try {
            const { notes } = await call<{ notes: Record<string, Note[]> }>(`/subjects?ids=${ids.map(encodeURIComponent).join(',')}`);
            setById((current) => ({ ...current, ...notes }));
        } catch (error) {
            fail(t('notes.errors.load'))(error);
        }
    };

    const add = (subjectId: string, text: string) =>
        call<{ note: Note }>(pathOf(subjectId), 'POST', { text })
            .then(({ note }) => change(subjectId, (notes) => [...notes, note]))
            .catch(fail(t('notes.errors.save')));

    const edit = (subjectId: string, noteId: string, text: string) =>
        call<{ note: Note }>(pathOf(subjectId, noteId), 'PATCH', { text })
            .then(({ note }) => change(subjectId, (notes) => notes.map((n) => (n.id === note.id ? note : n))))
            .catch(fail(t('notes.errors.save')));

    const remove = (subjectId: string, noteId: string) =>
        call(pathOf(subjectId, noteId), 'DELETE')
            .then(() => change(subjectId, (notes) => notes.filter((n) => n.id !== noteId)))
            .catch(fail(t('notes.errors.delete')));

    return { byId, load, add, edit, remove };
};
