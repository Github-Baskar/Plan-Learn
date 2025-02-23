type DividerProps = {
    children: string
}
const Divider = ({
    children,
}: DividerProps) => {
    return (
        <div className="relative mb-2">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-3 text-base sm:text-lg font-semibold text-gray-900 uppercase tracking-[3px]">{children}</span>
            </div>
        </div>
    )
}

export default Divider