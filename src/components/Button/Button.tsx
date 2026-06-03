import React from 'react';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
};

const Button: React.FC<ButtonProps> = ({ label, ...props }) => (
    <button className="custom-button" {...props}>
        {label}
    </button>
);

export default Button;
