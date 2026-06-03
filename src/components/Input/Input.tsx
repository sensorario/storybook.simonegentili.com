import React from 'react';
import './Input.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => (
    <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input className="input-field" {...props} />
    </div>
);

export default Input;
