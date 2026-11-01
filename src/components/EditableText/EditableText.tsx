import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './EditableText.css';

interface EditableTextProps {
    value: string;
    onSave: (text: string) => void;
    /** What shows, and is double clicked, while there's no text yet. */
    placeholder?: string;
    className?: string;
}

// A double click makes the text editable right where it is, with the word clicked selected;
// leaving it saves, Enter too (Shift+Enter starts a new line), Esc puts it back. An empty text
// isn't saved.
export const EditableText = ({ value, onSave, placeholder, className }: EditableTextProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [editing, setEditing] = useState(false);
    // A new element after each edit: what was typed in the old one is out of React's sight.
    const [version, setVersion] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const cancelled = useRef(false);

    useEffect(() => {
        if (editing) ref.current?.focus();
    }, [editing]);

    const finish = () => {
        const text = ref.current?.innerText.trim() ?? '';
        setEditing(false);
        setVersion((v) => v + 1);
        if (!cancelled.current && text !== '' && text !== value) onSave(text);
        cancelled.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Escape') cancelled.current = true;
        if (e.key === 'Escape' || (e.key === 'Enter' && !e.shiftKey)) {
            e.preventDefault();
            ref.current?.blur();
        }
    };

    return (
        <span
            key={version}
            ref={ref}
            className={['sg-editable-text', className].filter(Boolean).join(' ')}
            data-placeholder={placeholder}
            title={editing ? undefined : t('editableText.hint')}
            contentEditable={editing ? 'plaintext-only' : undefined}
            suppressContentEditableWarning
            onDoubleClick={() => setEditing(true)}
            onBlur={editing ? finish : undefined}
            onKeyDown={editing ? handleKeyDown : undefined}
        >
            {value}
        </span>
    );
};

export default EditableText;
