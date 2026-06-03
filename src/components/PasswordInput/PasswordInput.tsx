import React from 'react';
import './PasswordInput.css';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({ label, ...props }) => (
    <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input type="password" className="input-field" {...props} />
    </div>
);

export default PasswordInput;
