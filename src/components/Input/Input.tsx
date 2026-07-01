import React from 'react';
import './Input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    invalid?: boolean;
};

const Input: React.FC<InputProps> = ({ label, invalid, ...props }) => (
    <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input className={`input-field${invalid ? ' input-field--invalid' : ''}`} {...props} />
    </div>
);

export default Input;
