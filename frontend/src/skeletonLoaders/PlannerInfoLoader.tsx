import Skeleton from "react-loading-skeleton";
import Divider from "../components/baseComponents/Divider";

const PlannerInfoLoader = () => {
    return (
        <div className="card bg-white border border-[#00bcd4] shadow-md rounded-lg p-4 md:p-8 w-[95%] md:w-[80%] my-8">
            <div className="mb-8 w-[75%]">
                <Skeleton count={1} />
            </div>
            <div className="card flex flex-col sm:flex-row bg-white border shadow-md rounded-lg py-4 my-4 sm:py-8 sm:my-8">
                {
                    [1, 2, 3].map((_detail, index) => {
                        return (
                            <div key={index} className="border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-center items-center py-2 sm:px-2 sm:py-0 grow">
                                <div className="w-[90%]">
                                    <Skeleton count={2} />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="flex justify-center items-center py-2 sm:px-2 sm:py-0 grow">
                    <div className="w-[90%]">
                        <Skeleton count={2} />
                    </div>
                </div>
            </div>
            <div className="mb-4 sm:mb-8">
                <Divider><p className="min-w-[100px]"><Skeleton count={1} /></p></Divider>
                <div className="mb-4">
                    <h3><Skeleton count={1} /></h3>
                    <div className="space-y-3 sm:space-y-4 mt-2 w-full">
                        {
                            [1, 2].map((_list, index) => {
                                return (
                                    <div key={index} className="relative flex gap-x-4">
                                        <div className="flex flex-col w-full">
                                            <p className="w-[20%] mb-2">
                                                <Skeleton count={1} />
                                            </p>
                                            <p className="w-full">
                                                <Skeleton count={2} />
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                [1, 2].map((_section, index) => {
                    return (
                        <div key={index} className="mb-4 sm:mb-8">
                            <Divider><p className="min-w-[100px]"><Skeleton count={1} /></p></Divider>
                            {
                                [1, 2].map((_list, index) => (
                                    <p key={index} className="w-full"><Skeleton count={1} /></p>
                                ))
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PlannerInfoLoader