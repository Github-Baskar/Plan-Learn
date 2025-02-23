import Skeleton from "react-loading-skeleton";

const CardLoader = () => {
    return (
        <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-[95%] sm:w-[90%] lg:w-[80%] my-6 mx-auto">
            {
                [1, 2].map((_card, index) => {
                    return (
                        <div key={index} className=" bg-white shadow-lg rounded-2xl p-5 border border-gray-200 w-[300px] sm:w-full">
                            <h2 className="w-[75%]"><Skeleton count={1} /></h2>
                            <p className="mt-2 w-[40%]"><Skeleton count={1} /></p>
                            <div className="mt-2 sm:mt-3">
                                <Skeleton count={3} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardLoader