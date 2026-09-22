import React, { useId } from 'react';
import './Input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    invalid?: boolean;
};

export const Input: React.FC<InputProps> = ({ label, invalid, className, id, ...props }) => {
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
                className={['input-field', invalid ? 'input-field--invalid' : '', className]
                    .filter(Boolean)
                    .join(' ')}
                {...props}
            />
        </div>
    );
};

export default Input;
