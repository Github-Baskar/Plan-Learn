import { useEffect, useState } from "react"
import { DeleteIcon } from "../../icons/DeleteIcon"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, deleteStudyPlan, getStudyPlanInfo, RootState, updateActivity } from "../../store";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import { dayNameToNumber } from "../../utilities/constants";
import LearningResources from "../groupComponents/LearningResources";
import { BackIcon } from "../../icons/BackIcon";
import { useNavigate, useParams } from "react-router-dom";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(updateLocale);

type InfoDataType = {
    _id: string;
    topic: string;
    levelOfExpertise: string;
    studyDuration: string;
    studyDays: string[];
    totalTimeCommitment: string;
    dayOverview: { [key: string]: any }[];
    learningResources: { [key: string]: any };
    assessment: {
        methods: string[];
    };
    studyPlanStatus: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const PlannerInfoPage = () => {
    const { isStudyPlanInfoLoading, studyPlanInfo } = useSelector((state: RootState) => state?.studyPlanner);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [infoData, setInfoData] = useState<InfoDataType>({
        _id: '',
        topic: '',
        levelOfExpertise: '',
        studyDuration: '',
        studyDays: [],
        totalTimeCommitment: '',
        dayOverview: [],
        learningResources: {},
        assessment: {
            methods: [],
        },
        studyPlanStatus: ''
    })
    const [activities, setActivities] = useState<Record<string, { isComplete: boolean; isDisable: boolean }>>({});
    const [status, setStatus] = useState('')

    useEffect(()=>{
        id && dispatch(getStudyPlanInfo(id))
    },[id])

    useEffect(() => {
        if (studyPlanInfo) {
            const { _id, topic, levelOfExpertise, studyDuration, studyDays, totalTimeCommitment, dayOverview, learningResources, assessment: { methods }, studyPlanStatus } = studyPlanInfo;

            const [start, end] = studyDuration.split(" - ");
            const formattedStart = dayjs(start, "MMM D, YYYY").format("MMM D, YYYY");
            const formattedEnd = dayjs(end, "MMM D, YYYY").format("MMM D, YYYY");

            const getShortDay = (fullDays: string[]): string[] => {
                return fullDays.map(day => {
                    const dayNumber = dayNameToNumber[day];
                    return dayNumber !== undefined ? dayjs().day(dayNumber).format("ddd") : day;
                });
            };

            const newData = {
                _id,
                topic,
                levelOfExpertise,
                studyDuration: `${formattedStart} - ${formattedEnd}`,
                studyDays: getShortDay(studyDays),
                totalTimeCommitment,
                dayOverview: Array.isArray(dayOverview) ? dayOverview : [],
                learningResources: learningResources && Object.entries(learningResources).length > 0 ? learningResources : {},
                assessment: {
                    methods,
                },
                studyPlanStatus
            };
            setInfoData(newData)
        }
    }, [studyPlanInfo])

    useEffect(() => {
        if (infoData && infoData?.dayOverview) {
            const newActivities: Record<string, { isComplete: boolean; isDisable: boolean }> = {};

            infoData.dayOverview.forEach((day) => {
                day.activities.forEach((activity: {
                    _id: string;
                    isComplete: boolean;
                    isDisable: boolean;
                }) => {
                    newActivities[activity._id] = {
                        isComplete: activity.isComplete,
                        isDisable: activity.isDisable
                    }
                });
            });

            setActivities(newActivities);
            setStatus(infoData.studyPlanStatus);
        }
    }, [infoData]);

    return (
        <div className="flex justify-center items-center">
            {
                isStudyPlanInfoLoading ?
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md">
                            <div className="flex flex-col justify-center items-center animate-pulse">
                                <img src="/ai-assistant.png" alt="loading" className="w-[225px]" />
                                <p className="text-lg font-semibold">Get Study Plan List...</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="card bg-white text-black border border-[#00bcd4] shadow-md rounded-lg p-8 w-[80%] my-8">
                        <div className="relative flex justify-between items-center mb-8">
                            <div className="flex items-center">
                                <BackIcon className="w-[30px] h-[30px]" onClick={() => {
                                    // dispatch(getStudyPlanList());
                                    navigate('/my-plans')
                                }} />
                                <h1 className='text-4xl font-bold mx-4'>{infoData?.topic}</h1>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${status === "Complete"
                                        ? "bg-green-100 text-green-600"
                                        : status === "On going"
                                            ? "bg-blue-100 text-blue-600"
                                            : status === "Overdue"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {status}
                                </span>
                            </div>
                            <div className="absolute end-0">
                                <DeleteIcon
                                    className="w-[30px] h-[30px]"
                                    onClick={() => {
                                        dispatch(deleteStudyPlan(infoData._id, navigate));
                                        // setDataList(dataList.filter(item => item._id !== infoData._id));
                                        // setIsStudyPlanOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="card flex bg-white text-black border shadow-md rounded-lg py-8 my-8">
                            <div className="border-r border-gray-300 flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{infoData?.studyDuration}</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Study Plan Duration</p>
                                </div>
                            </div>
                            <div className="border-r border-gray-300 flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{infoData?.studyDays.length === 7 ? 'All days' : infoData.studyDays.join(', ')}</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Preferred Days</p>
                                </div>
                            </div>
                            <div className="border-r border-gray-300 flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{infoData?.levelOfExpertise} Level</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Level of Expertise</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{infoData?.totalTimeCommitment}</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Session Duration</p>
                                </div>
                            </div>
                        </div>
                        <div className="study-schedule mb-8">
                            <div className="relative mb-2">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-base font-semibold text-gray-900 uppercase">Study Schedule</span>
                                </div>
                            </div>
                            {
                                infoData?.dayOverview && infoData.dayOverview.map((day, key) => (
                                    <div key={key} className="mb-4">
                                        <h3 className='text-lg font-semibold'>{day?.date}</h3>
                                        <ul role="list" className="space-y-6 mt-2 ">
                                            {
                                                Object.entries(activities).length > 0 &&
                                                Object.entries(activities).map(([id, _activityData], index) => {
                                                    const endActivity = day.activities.find((activity: { _id: string }) => activity._id === Object.entries(activities)?.[`${(index + 1)}`]?.[0]);
                                                    const foundActivity = day.activities.find((activity: { _id: string }) => activity._id === id);
                                                    if (!foundActivity) return null;
                                                    const { _id, activity, type, time } = foundActivity;
                                                    const [startTime, endTime] = time.split(" - ").map((time: string) => dayjs(time, "h:mm A"));
                                                    return (type !== 'Break' &&
                                                        <li key={index} className="relative flex gap-x-4">
                                                            <div
                                                                className={classNames(
                                                                    !endActivity ? 'h-6' : '-bottom-6',
                                                                    'absolute top-0 left-0 flex w-7 justify-center',
                                                                )}
                                                            >
                                                                <div className={`w-px ${activities[_id].isComplete ? 'bg-[#00bcd4]' : 'bg-gray-200'} `} />
                                                            </div>
                                                            <>
                                                                <div className="relative flex size-7 flex-none items-center justify-center bg-white">
                                                                    <div className="flex h-6 shrink-0 items-center">
                                                                        <div className="group grid size-4 grid-cols-1">
                                                                            <input
                                                                                name="isComplete"
                                                                                type="checkbox"
                                                                                className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#00bcd4] checked:bg-[#00bcd4] indeterminate:border-[#00bcd4] indeterminate:bg-[#00bcd4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00bcd4] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto cursor-pointer disabled:cursor-not-allowed"
                                                                                checked={activities[_id].isComplete}
                                                                                disabled={activities[_id].isDisable}
                                                                                onChange={() => {
                                                                                    const params = {
                                                                                        id: _id,
                                                                                    }
                                                                                    const body = {
                                                                                        isComplete: !activities[_id].isComplete,
                                                                                        isDisable: !activities[_id].isDisable,
                                                                                        nextId: ''
                                                                                    }
                                                                                    const entries = Object.entries(activities);
                                                                                    const currentIndex = entries.findIndex(([key]) => key === _id);
                                                                                    if (currentIndex !== -1 && currentIndex + 1 < entries.length) {
                                                                                        const nextKey = entries[currentIndex + 1][0];
                                                                                        setActivities({
                                                                                            ...activities,
                                                                                            [_id]: {
                                                                                                isComplete: true,
                                                                                                isDisable: true,
                                                                                            },
                                                                                            [nextKey]: {
                                                                                                isComplete: false,
                                                                                                isDisable: false,
                                                                                            }
                                                                                        })
                                                                                        body['nextId'] = nextKey
                                                                                    } else {
                                                                                        setActivities({
                                                                                            ...activities,
                                                                                            [_id]: {
                                                                                                isComplete: true,
                                                                                                isDisable: true,
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                    dispatch(updateActivity(params, body, setStatus));
                                                                                }}
                                                                            />
                                                                            <svg
                                                                                fill="none"
                                                                                viewBox="0 0 14 14"
                                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-[#00bcd4] cursor-pointer group-has-[:disabled]:cursor-not-allowed"
                                                                            >
                                                                                <path
                                                                                    d="M3 8L6 11L11 3.5"
                                                                                    strokeWidth={2}
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                                                                />
                                                                                <path
                                                                                    d="M3 7H11"
                                                                                    strokeWidth={2}
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                                                />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className="flex-auto text-lg text-gray-900">
                                                                    <span className="font-medium text-gray-500">{type}: </span> {activity}
                                                                </p>
                                                                <div className="min-w-[150px] text-end">
                                                                    <p className="text-sm lg:text-base sm:leading-6">
                                                                        {time}
                                                                    </p>
                                                                    <span className="flex-none text-sm text-gray-500 mt-2">
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
                        </div>
                        <div className="learning-resources mb-4">
                            <LearningResources learningResources={infoData?.learningResources} />
                        </div>
                        <div className="assessment mb-4">
                            <div className="relative">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-base font-semibold text-gray-900 uppercase">Assessment</span>
                                </div>
                            </div>
                            <ul className='list-disc mt-2 ps-8'>
                                {
                                    infoData.assessment.methods.map((method, index) => (
                                        <li key={index} className='text-lg'>{method}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
            }
        </div >
    )
}
export default PlannerInfoPage