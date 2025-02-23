const AILoader = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
                <div className="flex flex-col justify-center items-center animate-pulse">
                    <img src="/ai-assistant.png" alt="loading" className="w-[225px]" />
                    <p className="text-lg font-semibold">Generating Study Plan...</p>
                </div>
            </div>
        </div>
    )
}

export default AILoader