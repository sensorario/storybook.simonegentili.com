import type { TextareaHTMLAttributes } from 'react';
import './Textarea.css';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
};

export const Textarea = ({ invalid, className, rows = 3, ...props }: TextareaProps) => (
    <textarea
        rows={rows}
        className={['input-field', 'sg-textarea', invalid ? 'input-field--invalid' : '', className].filter(Boolean).join(' ')}
        {...props}
    />
);

export default Textarea;
