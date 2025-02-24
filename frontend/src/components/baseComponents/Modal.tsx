import { Modal as AntModal } from 'antd';

type ModalProps = {
    children: React.ReactNode | string,
    title?: React.ReactNode | string,
    isModalOpen: boolean,
    onSubmit: () => void,
    OnCancel: () => void,
    closable?: boolean,
    footer?: boolean,
    width?: string | number,
    centered?: boolean,
}

const Modal = ({
    children,
    title,
    isModalOpen,
    onSubmit,
    OnCancel,
    closable,
    footer,
    width,
    centered = true,
}: ModalProps) => {
    return (
        <AntModal
            title={title}
            open={isModalOpen}
            onOk={onSubmit}
            onCancel={OnCancel}
            closable={closable}
            footer={footer}
            width={width}
            centered={centered}
        >
            {children}
        </AntModal>
    )
}

export default Modal