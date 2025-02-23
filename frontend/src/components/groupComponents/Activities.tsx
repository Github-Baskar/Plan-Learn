import dayjs from 'dayjs';

import { classNames } from '../../utilities/commonFunction';

type ActivityOverviewProps = {
    activityOverview: { [key: string]: any; }[]
}

const Activities = ({ activityOverview }: ActivityOverviewProps) => {
    return (
        <>
            {
                activityOverview && activityOverview.map((day, key) => (
                    <div key={key} className="mb-4">
                        <h3 className='text-sm sm:text-base font-semibold'>{day?.date}</h3>
                        <ul role="list" className="space-y-3 sm:space-y-4 mt-2">
                            {
                                day?.activities && day.activities.map((data: { activity: string, type: string, time: string }, index: number) => {
                                    const [startTime, endTime] = data.time.split(" - ").map(time => dayjs(time, "h:mm A"));
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
                                                <div className="flex flex-col-reverse">
                                                    <p className="flex-auto text-sm sm:text-base text-gray-900 text-justify">
                                                        <span className="font-semibold text-gray-500">{data.type}: </span> {data.activity}
                                                    </p>
                                                    <div className="flex min-w-[125px] sm:min-w-[145px] text-end mb-2">
                                                        <p className="text-sm sm:leading-6 font-semibold">
                                                            {data.time}
                                                        </p>
                                                        <span className="flex-none text-sm text-gray-500 font-semibold ms-2">
                                                            (Duration: {endTime.diff(startTime, 'minute')} Mins)
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {
                            activityOverview.length - 1 !== key &&
                            <div className="relative w-[75%] mx-auto mt-4">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-xs font-semibold text-gray-900 uppercase tracking-[1px]">Next Day</span>
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
        </>
    )
}

export default Activities