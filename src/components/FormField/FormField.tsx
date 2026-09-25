import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react';
import './FormField.css';

type ControlProps = {
    id?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    invalid?: boolean;
};

interface FormFieldProps {
    label: ReactNode;
    /** A single control: Input-like element, Textarea, Select, or a native one. */
    children: ReactElement<ControlProps>;
    hint?: ReactNode;
    /** Replaces the hint and marks the control invalid. */
    error?: ReactNode;
    className?: string;
}

// Wires label, hint and error to the control (id, aria-describedby,
// aria-invalid) so callers don't have to - most hand-written fields in the
// apps have a <label> that isn't associated with anything.
export const FormField = ({ label, children, hint, error, className }: FormFieldProps) => {
    const generatedId = useId();
    const control = isValidElement(children) ? children : null;
    const controlId = control?.props.id ?? generatedId;
    const noteId = `${controlId}-note`;
    const note = error ?? hint;

    return (
        <div className={['sg-field', className].filter(Boolean).join(' ')}>
            <label className="input-label" htmlFor={controlId}>
                {label}
            </label>
            {control
                ? cloneElement(control, {
                      id: controlId,
                      'aria-describedby': note ? noteId : control.props['aria-describedby'],
                      ...(error ? { 'aria-invalid': true } : {}),
                      ...(error && typeof control.type !== 'string' ? { invalid: true } : {}),
                  })
                : children}
            {note && (
                <p id={noteId} className={error ? 'sg-field-error' : 'sg-field-hint'}>
                    {note}
                </p>
            )}
        </div>
    );
};

export default FormField;
