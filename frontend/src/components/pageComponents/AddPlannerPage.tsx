import { Select as AntSelect, DatePicker } from 'antd';
import dayjs from 'dayjs';
import Button from '../baseComponents/Button';
import { useState } from 'react';

const { RangePicker: AntRangePicker } = DatePicker;

const AddPlannerPage = () => {
    const initialValues = {
        topic: "",
        level: "",
        dateRange: [],
        schedule: []
    }
    const [formDate, setFormDate] = useState(initialValues);
    const { topic, level, dateRange, schedule } = formDate;
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
                <form>
                    <div className="flex justify-between items-center gap-4">
                        <input
                            className="border border-[#6b7280] outline-none rounded-md text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] z-10 px-[11px] w-full"
                            type="text"
                            name="topic"
                            id="topic"
                            placeholder="Enter the topic"
                            onChange={(e) => {
                                const { value } = e.target;
                                setFormDate({ ...formDate, topic: value })
                            }}
                            value={topic}
                        />
                        <AntSelect
                            className={`select-field block w-full rounded-md border border-[#6b7280] bg-transparent shadow-sm placeholder:text-gray-400 text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px]`}
                            mode={""}
                            name={"level"}
                            placeholder={"Select the level of expertise"}
                            onChange={(value: string) => {
                                console.log(value)
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
                            className={`date-field w-full rounded-md border border-[#333] hover:border-[#333] focus:shadow-none focus-within:shadow-none focus-within:border-[#333] bg-transparent text-gray-900 shadow-sm placeholder:text-gray-400 text-xs lg:text-sm sm:leading-6 h-[45px] md:h-[50px] flex items-center`}
                            format={"DD-MM-YYYY"}
                            name={"dateRange"}
                            onChange={(value: any, dateString: any) => {
                                console.log(value, dateString)
                                setFormDate({ ...formDate, dateRange: dateString })
                            }}
                            minDate={dayjs(dayjs().format("DD-MM-YYYY"), "DD-MM-YYYY")}
                            value={
                                Array.isArray(dateRange) && dateRange.length === 2 && dateRange[0] && dateRange[1] ?
                                    [dayjs(dateRange[0], 'DD-MM-YYYY'), dayjs(dateRange[1], 'DD-MM-YYYY')] : [null, null]
                            }
                        />
                        <AntSelect
                            className={`select-field block w-full rounded-md border border-[#6b7280] bg-transparent shadow-sm placeholder:text-gray-400 text-xs lg:text-sm sm:leading-6 min-h-[45px] md:min-h-[50px]`}
                            mode={"multiple"}
                            placeholder={"Select the preferred schedule"}
                            name={"schedule"}
                            onChange={(value: any) => {
                                console.log(value)
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
                            className='btn border-[#00bcd4] text-white bg-[#00bcd4] hover:scale-105 text-base md:text-lg font-normal p-4 w-fit h-[40px]'
                        >
                            Generate Study Plan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPlannerPage