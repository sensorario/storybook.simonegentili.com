import type { SelectHTMLAttributes } from 'react';
import './Select.css';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    invalid?: boolean;
};

export const Select = ({ invalid, className, children, ...props }: SelectProps) => (
    <select
        className={['input-field', 'sg-select', invalid ? 'input-field--invalid' : '', className].filter(Boolean).join(' ')}
        {...props}
    >
        {children}
    </select>
);

export default Select;
