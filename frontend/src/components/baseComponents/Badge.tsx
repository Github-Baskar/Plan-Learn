type BadgeProps = {
    children: string;
    className?: string;
}

const Badge = ({
    children,
    className,
}: BadgeProps) => {
    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className} ${children.toLowerCase() === "complete"
                ? "bg-green-100 text-green-600"
                : children.toLowerCase() === "on going"
                    ? "bg-blue-100 text-blue-600"
                    : children.toLowerCase() === "overdue"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                }`}
        >
            {children}
        </span>
    )
}

export default Badge