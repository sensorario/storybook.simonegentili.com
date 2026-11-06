import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import './EditableTime.css';

interface EditableTimeProps {
    /** "HH:MM". */
    value: string;
    /** The new "HH:MM", only when it changed. */
    onSave: (time: string) => void;
    disabled?: boolean;
    className?: string;
}

// A time changed where it is, as Nutrimondo's diary does: a double click turns it into a time
// field; leaving it saves, Enter too, Esc puts it back.
export const EditableTime = ({ value, onSave, disabled = false, className }: EditableTimeProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });
    const [editing, setEditing] = useState(false);
    const cancelled = useRef(false);

    const finish = (time: string) => {
        setEditing(false);
        if (!cancelled.current && time !== '' && time !== value) onSave(time);
        cancelled.current = false;
    };

    if (editing) {
        return (
            <input
                type="time"
                className={['sg-editable-time-input', className].filter(Boolean).join(' ')}
                defaultValue={value}
                autoFocus
                aria-label={t('editableTime.label')}
                onBlur={(e) => finish(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Escape') cancelled.current = true;
                    if (e.key === 'Enter' || e.key === 'Escape') {
                        e.preventDefault();
                        e.currentTarget.blur();
                    }
                }}
            />
        );
    }

    return (
        <span
            className={['sg-editable-time', className].filter(Boolean).join(' ')}
            aria-disabled={disabled || undefined}
            title={disabled ? undefined : t('editableTime.hint')}
            onDoubleClick={disabled ? undefined : () => setEditing(true)}
        >
            {value}
        </span>
    );
};

export default EditableTime;
