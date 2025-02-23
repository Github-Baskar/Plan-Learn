import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";

import { AppDispatch, deleteStudyPlan, getStudyPlanInfo, RootState, updateActivity } from "../../store";
import { dayNameToNumber } from "../../utilities/constants";

import LearningResources from "../groupComponents/LearningResources";
import { DeleteIcon } from "../../icons/DeleteIcon"
import { BackIcon } from "../../icons/BackIcon";
import { classNames } from "../../utilities/commonFunction";
import { InfoDataType } from "../../types";
import Badge from "../baseComponents/Badge";
import Divider from "../baseComponents/Divider";
import CheckBoxIcon from "../../icons/CheckBoxIcon";
import PlannerInfoLoader from "../../skeletonLoaders/PlannerInfoLoader";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(updateLocale);

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

    useEffect(() => {
        id && dispatch(getStudyPlanInfo(id))
    }, [id])
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
                    <PlannerInfoLoader />
                    :
                    <div className="card bg-white text-black border border-[#00bcd4] shadow-md rounded-lg p-4 md:p-8 w-[95%] md:w-[80%] my-8">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex flex-wrap items-center">
                                <div className="hover:bg-[rgba(0,188,212,.1)] p-2 rounded-full me-2 md:me-4">
                                    <BackIcon
                                        className="w-[22px] h-[22px] md:w-[25px] md:h-[25px]"
                                        onClick={() => {
                                            navigate('/my-plans')
                                        }}
                                    />
                                </div>
                                <div className="md:flex items-center">
                                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold md:font-semibold'>{infoData?.topic}</h1>
                                    <Badge className="mt-2 md:mt-0 md:ms-4">{status}</Badge>
                                </div>
                            </div>
                            <div className="hover:bg-red-100 p-2 rounded-full">
                                <DeleteIcon
                                    className="w-[22px] h-[22px] md:w-[25px] md:h-[25px]"
                                    onClick={() => {
                                        dispatch(deleteStudyPlan(infoData._id, navigate));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="short-details card flex flex-col sm:flex-row text-center bg-white text-black border shadow-md rounded-lg py-4 my-4 sm:py-8 sm:my-8">
                            <div className="border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-center items-center py-2 sm:px-2 sm:py-0 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base sm:text-xs md:text-sm lg:text-base font-semibold'>{infoData?.studyDuration}</h2>
                                    <p className='text-sm sm:text-xs lg:text-sm text-[#5b6780] font-medium'>Study Plan Duration</p>
                                </div>
                            </div>
                            <div className="border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-center items-center py-2 sm:px-2 sm:py-0 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base sm:text-xs md:text-sm lg:text-base font-semibold'>{infoData?.studyDays.length === 7 ? 'All days' : infoData.studyDays.join(', ')}</h2>
                                    <p className='text-sm sm:text-xs lg:text-sm text-[#5b6780] font-medium'>Preferred Days</p>
                                </div>
                            </div>
                            <div className="border-b sm:border-b-0 sm:border-r border-gray-300 flex justify-center items-center py-2 sm:px-2 sm:py-0 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base sm:text-xs md:text-sm lg:text-base font-semibold'>{infoData?.levelOfExpertise} Level</h2>
                                    <p className='text-sm sm:text-xs lg:text-sm text-[#5b6780] font-medium'>Level of Expertise</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center py-2 sm:px-2 sm:py-0 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base sm:text-xs md:text-sm lg:text-base font-semibold'>{infoData?.totalTimeCommitment}</h2>
                                    <p className='text-sm sm:text-xs lg:text-sm text-[#5b6780] font-medium'>Session Duration</p>
                                </div>
                            </div>
                        </div>
                        <div className="study-schedule mb-4 sm:mb-8">
                            <Divider>Learn Schedule</Divider>
                            {
                                infoData?.dayOverview && infoData.dayOverview.map((day, key) => (
                                    <div key={key} className="mb-4">
                                        <h3 className='text-sm sm:text-base font-semibold'>{day?.date}</h3>
                                        <ul role="list" className="space-y-3 sm:space-y-4 mt-2">
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
                                                                    'absolute top-0 left-0 flex w-6 justify-center',
                                                                )}
                                                            >
                                                                <div className={`w-px ${activities[_id].isComplete ? 'bg-[#00bcd4]' : 'bg-gray-200'} `} />
                                                            </div>
                                                            <>
                                                                <div className="relative flex size-6 flex-none items-center justify-center bg-white">
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
                                                                            <CheckBoxIcon />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col-reverse">
                                                                    <p className="flex-auto text-sm sm:text-base text-gray-900 text-justify">
                                                                        <span className="font-semibold text-gray-500">{type}: </span> {activity}
                                                                    </p>
                                                                    <div className="flex min-w-[125px] sm:min-w-[145px] text-end mb-2">
                                                                        <p className="text-sm sm:leading-6 font-semibold">
                                                                            {time}
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
                                            infoData.dayOverview.length - 1 !== key &&
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
                        </div>
                        <div className="learning-resources mb-4 sm:mb-8">
                            <LearningResources learningResources={infoData?.learningResources} />
                        </div>
                        <div className="assessment mb-4">
                            <Divider>Assessment</Divider>
                            <ul className='list-disc mt-2 ps-4 sm:ps-8'>
                                {
                                    infoData.assessment.methods.map((method, index) => (
                                        <li key={index} className='text-sm sm:text-base'>{method}</li>
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