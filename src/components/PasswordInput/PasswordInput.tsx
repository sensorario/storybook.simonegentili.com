import React, { useId } from 'react';
import './PasswordInput.css';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    invalid?: boolean;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, invalid, className, id, ...props }) => {
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
                className={['input-field', invalid ? 'input-field--invalid' : '', className].filter(Boolean).join(' ')}
                {...props}
            />
        </div>
    );
};

export default PasswordInput;
