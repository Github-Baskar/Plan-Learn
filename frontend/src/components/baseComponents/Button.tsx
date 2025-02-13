import { Button as AntButton } from 'antd';

type ButtonProps = {
    type?: "default" | "primary" | "dashed" | "link" | "text" | "Submit",
    children: JSX.Element | string,
    className?: string,
    loading?: boolean,
    disabled?: boolean,
    icon?: JSX.Element,
    iconPosition?: 'start' | 'end',
    onClick?: () => void
}

const Button = ({
    type = 'default',
    children,
    className = '',
    loading,
    disabled,
    icon,
    iconPosition = 'start',
    onClick = () => null
}: ButtonProps) => {
    return (
        <>
            {
                type === 'Submit' ?
                    <AntButton
                        htmlType='submit'
                        className={`${className}`}
                        loading={loading}
                        disabled={disabled}
                        icon={icon}
                        iconPosition={iconPosition}
                        onClick={onClick}
                    >
                        {children}
                    </AntButton> :
                    <AntButton
                        type={type}
                        className={`${className}`}
                        loading={loading}
                        disabled={disabled}
                        icon={icon}
                        iconPosition={iconPosition}
                        onClick={onClick}
                    >
                        {children}
                    </AntButton>
            }
        </>
    )
}

export default Button