import { Select as AntSelect, DatePicker, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import Button from '../baseComponents/Button';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AddPlannerDataType, PlannerResponseDataType } from '../../types';
import { addStudyPlan, AppDispatch, getGenerateStudyPlan, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { dayNameToNumber, generateAiPrompt } from '../../utilities/constants';
import Activities from '../groupComponents/Activities';
import LearningResources from '../groupComponents/LearningResources';
import { useNavigate } from 'react-router-dom';
import { AddEventIcon } from '../../icons/AddEventIcon';

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(updateLocale);

const { RangePicker: AntRangePicker } = DatePicker;
const { RangePicker: AntTimeRangePicker } = TimePicker;

const AddPlannerPage = () => {
    const { isLoading, isAddPlanLoading, generateStudyPlan } = useSelector((state: RootState) => state?.studyPlanner);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const initialValues: AddPlannerDataType = {
        topic: "",
        level: "",
        dateRange: [],
        timeRange: [],
        schedule: [],
    }
    const [formDate, setFormDate] = useState(initialValues);
    const { topic, level, dateRange, timeRange, schedule } = formDate;
    const [data, setData] = useState<PlannerResponseDataType>({
        topic: '',
        levelOfExpertise: '',
        studyDuration: '',
        studyDays: [],
        totalTimeCommitment: '',
        significance: '',
        applications: [],
        learningObjectives: [],
        dayOverview: [],
        learningResources: {},
        assessment: {
            methods: [],
            frequency: ''
        },
        adjustments: [],
    })
    const [activitiesData, setActivitiesData] = useState<{ [key: string]: any; }[]>([]);
    const [isGenerate, setIsGenerate] = useState(false)

    useEffect(() => {
        console.log(generateStudyPlan, "generateStudyPlan")
        if (generateStudyPlan['personalizedStudyPlan']) {
            const { userProfile, topicOverview, learningObjectives, studySchedule: { dayOverview }, learningResources, assessment: { methods, frequency }, adjustments: { guidance } } = generateStudyPlan?.personalizedStudyPlan;

            const [start, end] = userProfile?.studyDuration.split(" - ");
            const formattedStart = dayjs(start, [
                "MMMM D, YYYY",  // Example: January 1, 2024
                "MMM D, YYYY",   // Example: Jan 1, 2024
                "YYYY-MM-DD",    // Example: 2024-01-01
                "MM/DD/YYYY",    // Example: 01/01/2024
                "D MMM YYYY",    // Example: 1 Jan 2024
            ]).format("MMM D, YYYY");
            const formattedEnd = dayjs(end, [
                "MMMM D, YYYY",
                "MMM D, YYYY",
                "YYYY-MM-DD",
                "MM/DD/YYYY",
                "D MMM YYYY",
            ]).format("MMM D, YYYY");

            const getShortDay = (fullDays: string[]): string[] => {
                return fullDays.map(day => {
                    const dayNumber = dayNameToNumber[day];
                    return dayNumber !== undefined ? dayjs().day(dayNumber).format("ddd") : day;
                });
            };

            const newData = {
                topic: topicOverview?.topic,
                levelOfExpertise: userProfile?.levelOfExpertise,
                studyDuration: `${formattedStart} - ${formattedEnd}`,
                studyDays: getShortDay(userProfile?.studyDays),
                totalTimeCommitment: userProfile?.totalTimeCommitment,
                significance: topicOverview?.significance,
                applications: topicOverview?.applications,
                learningObjectives,
                dayOverview,
                learningResources,
                assessment: {
                    methods,
                    frequency
                },
                adjustments: guidance
            }
            setData(newData)
            setIsGenerate(true);
        }
    }, [generateStudyPlan])
    useEffect(() => {
        data && data.dayOverview && setActivitiesData([...data.dayOverview])
    }, [data])

    const addPlan = () => {
        if (data) {
            const { significance, applications, learningObjectives, adjustments, ...filteredData } = data;
            const finalData: Omit<PlannerResponseDataType, "significance" | "applications" | "learningObjectives" | "adjustments"> = {
                ...filteredData,
                dayOverview: activitiesData,
                userId: userInfo?.id
            }
            dispatch(addStudyPlan(finalData, navigate))
        }
    }
    console.log(isGenerate, data, "data")
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="banner-section relative w-full h-[50vh]">
                <div className="img absolute left-0 -z-20 h-[50vh] bg-[url('/planning.jpg')] bg-no-repeat bg-center bg-cover w-full"></div>
                <div className="color absolute left-0 -z-10 h-[50vh] bg-black/65 to-transparent w-full"></div>

                <div className="text-white text-start flex flex-col justify-center w-[80%] h-[50vh] mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Plan Smarter, Achieve Faster with Gemini AI! 🚀</h1>
                    <p className="text-xl font-semibold w-[55%]">Take control of your time and goals with AI-powered scheduling. Create a personalized plan tailored to your needs and stay on track effortlessly.</p>
                </div>
            </div>
            <div className="card bg-white shadow-md rounded-lg p-8 w-[80%] -mt-16">
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const isFormValid = Object.values(formDate).every((value) => {
                        if (Array.isArray(value) && value.length === 0) {
                            return false;
                        }
                        if (value === "") {
                            return false;
                        }
                        return true;
                    });
                    if (!isFormValid) {
                        toast.error("Please fill all the fields");
                        return;
                    } else {
                        const prompt = generateAiPrompt(formDate);
                        dispatch(getGenerateStudyPlan(prompt));
                    }
                }}>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            className="border border-[#6b7280] outline-none rounded-md text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] z-10 px-[11px] w-full"
                            type="text"
                            name="topic"
                            id="topic"
                            placeholder="Enter the topic"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const { value } = e.target;
                                setFormDate({ ...formDate, topic: value })
                            }}
                            value={topic}
                        />
                        <AntSelect
                            className={`select-field block w-full rounded-md border border-[#6b7280] bg-transparent shadow-sm placeholder:text-[#5b6780] text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px]`}
                            placeholder={"Select the level of expertise"}
                            onChange={(value: string) => {
                                setFormDate({ ...formDate, level: value })
                            }}
                            options={[
                                {
                                    label: 'Begineer',
                                    value: 'Begineer'
                                },
                                {
                                    label: 'Intermediate',
                                    value: 'Intermediate'
                                },
                                {
                                    label: 'Advanced',
                                    value: 'Advanced'
                                }
                            ]}
                            value={level ? level : null}
                        />
                        <AntRangePicker
                            className={`date-field w-full rounded-md border border-[#333] hover:border-[#333] focus:shadow-none focus-within:shadow-none focus-within:border-[#333] bg-transparent text-gray-900 shadow-sm placeholder:text-[#5b6780] text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] flex items-center`}
                            format={"DD-MM-YYYY"}
                            onChange={(_value: [Dayjs | null, Dayjs | null] | null, dateString: [string, string]) => {
                                setFormDate({ ...formDate, dateRange: dateString })
                            }}
                            minDate={dayjs(dayjs().format("DD-MM-YYYY"), "DD-MM-YYYY")}
                            value={
                                Array.isArray(dateRange) && dateRange.length === 2 && dateRange[0] && dateRange[1] ?
                                    [dayjs(dateRange[0], 'DD-MM-YYYY'), dayjs(dateRange[1], 'DD-MM-YYYY')] : [null, null]
                            }
                        />
                        <AntTimeRangePicker
                            className={`time-field w-full rounded-md border border-[#333] hover:border-[#333] focus:shadow-none focus-within:shadow-none focus-within:border-[#333] bg-transparent text-gray-900 shadow-sm placeholder:text-[#5b6780] text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] flex items-center`}
                            format={'hh:mm A'}
                            needConfirm={false}
                            minuteStep={5}
                            onChange={(_value: [Dayjs | null, Dayjs | null] | null, timeString: [string, string]) => {
                                setFormDate({ ...formDate, timeRange: timeString })
                            }}
                            value={
                                Array.isArray(timeRange) && timeRange.length === 2 && timeRange[0] && timeRange[1] ?
                                    [dayjs(timeRange[0], 'hh:mm A'), dayjs(timeRange[1], 'hh:mm A')] : [null, null]
                            }
                        />
                        <AntSelect
                            className={`select-field block w-full rounded-md border border-[#6b7280] bg-transparent shadow-sm placeholder:text-[#5b6780] text-xs lg:text-sm sm:leading-6 min-h-[45px] md:min-h-[50px]`}
                            mode={"multiple"}
                            placeholder={"Select the preferred schedule"}
                            onChange={(value: string[]) => {
                                setFormDate({ ...formDate, schedule: value })
                            }}
                            allowClear={true}
                            options={[
                                {
                                    label: 'Monday',
                                    value: 'Monday'
                                },
                                {
                                    label: 'Tuesday',
                                    value: 'Tuesday'
                                },
                                {
                                    label: 'Wednesday',
                                    value: 'Wednesday'
                                },
                                {
                                    label: 'Thursday',
                                    value: 'Thursday'
                                },
                                {
                                    label: 'Friday',
                                    value: 'Friday'
                                },
                                {
                                    label: 'Saturday',
                                    value: 'Saturday'
                                },
                                {
                                    label: 'Sunday',
                                    value: 'Sunday'
                                }
                            ]}
                            value={schedule ? schedule : null}
                        />
                    </div>
                    <div className="text-center mt-8">
                        <Button
                            type='Submit'
                            className='btn border-[#00bcd4] text-white bg-[#00bcd4] text-base md:text-lg font-normal p-4 w-fit h-[40px]'
                            loading={isLoading}
                        >
                            Generate Study Plan
                        </Button>
                    </div>
                </form>
            </div>
            {
                isLoading ?
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md">
                            <div className="flex flex-col justify-center items-center animate-pulse">
                                <img src="/ai-assistant.png" alt="loading" className="w-[225px]" />
                                <p className="text-lg font-semibold">Generating Study Plan...</p>
                            </div>
                        </div>
                    </div> :
                    isGenerate && data && Object.keys(data).length > 0 &&
                    <div className="card bg-white text-black border border-[#00bcd4] shadow-md rounded-lg p-8 w-[80%] my-8">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className='text-4xl font-bold'>{data?.topic}</h1>
                            <Button
                                className='btn border-[#00bcd4] text-white bg-[#00bcd4] text-base md:text-base font-normal p-4 w-fit h-[40px] rounded-full'
                                onClick={addPlan}
                                loading={isAddPlanLoading}
                                icon={<AddEventIcon />}
                            >
                                Add
                            </Button>
                        </div>
                        <div className="card flex bg-white text-black border shadow-md rounded-lg py-8 my-8">
                            <div className="border-r border-gray-300 flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{data?.studyDuration}</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Study Plan Duration</p>
                                </div>
                            </div>
                            <div className="border-r border-gray-300 flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{data?.studyDays.length === 7 ? 'All days' : data.studyDays.join(', ')}</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Preferred Days</p>
                                </div>
                            </div>
                            <div className="border-r border-gray-300 flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{data?.levelOfExpertise} Level</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Level of Expertise</p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center px-2 grow">
                                <div className="self-center mx-auto">
                                    <h2 className='text-base font-semibold'>{data?.totalTimeCommitment}</h2>
                                    <p className='text-sm text-[#5b6780] font-medium'>Session Duration</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <p className='indent-16 text-lg text-justify first-letter:text-3xl first-letter:font-semibold mb-4'>{data?.significance}</p>
                            <p className='text-lg text-justify'><span className='font-semibold'>Applications:</span> {data?.applications && Array.isArray(data.applications) ? data.applications.join(', ') : data.applications}</p>
                        </div>
                        <div className="mb-8">
                            {/* <h2 className='text-lg underline font-semibold'>Learning Objectives</h2> */}
                            <div className="relative">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-base font-semibold text-gray-900 uppercase">Learning Objectives</span>
                                </div>
                            </div>
                            <ul className='list-disc mt-2 ps-8'>
                                {
                                    data?.learningObjectives && data.learningObjectives.map((objective, index) => (
                                        <li key={index} className='text-lg'>{objective}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="study-schedule mb-8">
                            {/* <h2 className='text-lg underline font-semibold mb-2'>Study Schedule</h2> */}
                            <div className="relative mb-2">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-base font-semibold text-gray-900 uppercase">Study Schedule</span>
                                </div>
                            </div>
                            <Activities activityOverview={activitiesData} setActivitiesData={setActivitiesData} />
                        </div>
                        <div className="learning-resources mb-4">
                            <LearningResources learningResources={data?.learningResources} />
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
                                    data?.assessment?.methods && data.assessment.methods.map((method, index) => (
                                        <li key={index} className='text-lg'>{method}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="assessment mb-4">
                            <div className="relative">
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-base font-semibold text-gray-900 uppercase">Guidance</span>
                                </div>
                            </div>
                            <ul className='list-disc mt-2 ps-8'>
                                {
                                    data?.adjustments && data.adjustments.map((adjustment, index) => (
                                        <li key={index} className='text-lg'>{adjustment}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AddPlannerPage