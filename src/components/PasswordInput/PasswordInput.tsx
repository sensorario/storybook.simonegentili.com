import React, { useId } from 'react';
import './PasswordInput.css';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, className, id, ...props }) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className="input-wrapper">
            {label && (
                <label className="input-label" htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type="password"
                className={['input-field', className].filter(Boolean).join(' ')}
                {...props}
            />
        </div>
    );
};

export default PasswordInput;
