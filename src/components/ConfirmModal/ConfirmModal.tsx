import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { sgI18n } from '../../i18n';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import './ConfirmModal.css';

interface ConfirmModalProps {
    open: boolean;
    title: string;
    /** The question, e.g. "This can't be undone." */
    children?: ReactNode;
    onConfirm: () => void;
    /** Also called on Escape, backdrop click and the "×". */
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    /** Red confirm button, for destructive actions. */
    danger?: boolean;
    icon?: ReactNode;
}

export const ConfirmModal = ({
    open,
    title,
    children,
    onConfirm,
    onCancel,
    confirmLabel,
    cancelLabel,
    danger = false,
    icon,
}: ConfirmModalProps) => {
    const { t } = useTranslation('sg', { i18n: sgI18n });

    return (
        <Modal
            open={open}
            onClose={onCancel}
            title={title}
            icon={icon}
            footer={
                <>
                    <Button variant="secondary" label={cancelLabel ?? t('confirm.cancel')} onClick={onCancel} />
                    <Button
                        variant={danger ? 'danger' : 'primary'}
                        label={confirmLabel ?? t('confirm.confirm')}
                        onClick={onConfirm}
                        autoFocus
                    />
                </>
            }
        >
            {children && <div className="sg-confirm-message">{children}</div>}
        </Modal>
    );
};

export default ConfirmModal;
