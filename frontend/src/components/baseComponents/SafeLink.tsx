type SafeLinkProps = {
    url: string,
    children: React.ReactNode
}

const SafeLink = ({ url, children }: SafeLinkProps) => {
    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };
    return isValidUrl(url) ? (
        <a className="text-base font-semibold text-blue-600 underline hover:text-blue-800 tracking-[1px]" href={url} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    ) : (
        <span className='text-base font-semibold underline tracking-[1px]'>{children}</span>
    );
};

export default SafeLink