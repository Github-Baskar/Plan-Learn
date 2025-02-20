import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';

const { RangePicker: AntTimeRangePicker } = TimePicker;

type ActivityOverviewProps = {
    activityOverview: { [key: string]: any; }[]
    setActivitiesData: Dispatch<SetStateAction<{ [key: string]: any; }[]>>
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Activities = ({ activityOverview, setActivitiesData }: ActivityOverviewProps) => {
    return (
        <>
            {
                activityOverview && activityOverview.map((day, key) => (
                    <div key={key} className="mb-4">
                        <h3 className='text-lg font-semibold'>{day?.date}</h3>
                        <ul role="list" className="space-y-6 mt-2 ">
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
                                                <p className="flex-auto text-lg text-gray-900">
                                                    <span className="font-medium text-gray-500">{data.type}: </span> {data.activity}
                                                </p>
                                                <div className="">
                                                    <AntTimeRangePicker
                                                        className={`time-field w-[200px] rounded-md border border-[#333] hover:border-[#333] focus:shadow-none focus-within:shadow-none focus-within:border-[#333] bg-transparent text-gray-900 shadow-sm placeholder:text-[#5b6780] text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] flex items-center`}
                                                        format={'hh:mm A'}
                                                        needConfirm={false}
                                                        minuteStep={5}
                                                        onChange={(_value: [Dayjs | null, Dayjs | null] | null, timeString: [string, string]) => {
                                                            setActivitiesData(prevActivities =>
                                                                prevActivities.map((activity, activityKey) =>
                                                                    activityKey === key
                                                                        ? {
                                                                            ...activity,
                                                                            activities: activity.activities.map((act: { time: string }, actIndex: number) =>
                                                                                actIndex === index
                                                                                    ? { ...act, time: timeString.join(' - ') }
                                                                                    : act
                                                                            )
                                                                        }
                                                                        : activity
                                                                )
                                                            );

                                                        }}
                                                        value={
                                                            startTime && endTime ?
                                                                [dayjs(startTime, 'hh:mm A'), dayjs(endTime, 'hh:mm A')] : [null, null]
                                                        }
                                                    />
                                                    <span className="flex-none text-base text-gray-500 mt-2">
                                                        Duration: {endTime.diff(startTime, 'minute')} Mins
                                                    </span>
                                                </div>
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