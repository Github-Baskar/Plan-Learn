type ActivityOverviewProps = {
    activityOverview: { [key: string]: any; }[]
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Activities = ({ activityOverview }: ActivityOverviewProps) => {
    return (
        <>
            {
                activityOverview && activityOverview.map((day, index) => (
                    <div key={index} className="mb-4">
                        <h3 className='text-lg font-semibold'>{day?.date}</h3>
                        <ul role="list" className="space-y-6 mt-2 ">
                            {
                                day?.activities && day.activities.map((data: { activity: string, type: string, time: string }, index: number) => {
                                    return (data.type !== 'Break' &&
                                        <li key={index} className="relative flex gap-x-4">
                                            <div
                                                className={classNames(
                                                    index === day.activities.length - 1 ? 'h-6' : '-bottom-6',
                                                    'absolute top-0 left-0 flex w-6 justify-center',
                                                )}
                                            >
                                                <div className="w-px bg-gray-200" />
                                            </div>
                                            <>
                                                <div className="relative flex size-6 flex-none items-center justify-center bg-white">
                                                    <div className="size-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                                </div>
                                                <p className="flex-auto text-lg text-gray-900">
                                                    <span className="font-medium text-gray-500">{data.type}: </span> {data.activity}
                                                </p>
                                                <time dateTime={data.time} className="flex-none text-base text-gray-500">
                                                    {data.time}
                                                </time>
                                            </>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                ))
            }
        </>
    )
}

export default Activities