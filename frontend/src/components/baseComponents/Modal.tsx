import { Modal as AntModal } from 'antd';

type ModalProps = {
    children: React.ReactNode,
    title?: React.ReactNode | string,
    isModalOpen: boolean,
    onSubmit: () => void,
    OnCancel: () => void,
}

const Modal = ({
    children,
    title,
    isModalOpen,
    onSubmit,
    OnCancel,
}: ModalProps) => {
    return (
        <AntModal
            title={title}
            open={isModalOpen}
            onOk={onSubmit}
            onCancel={OnCancel}
        >
            {children}
        </AntModal>
    )
}

export default Modal