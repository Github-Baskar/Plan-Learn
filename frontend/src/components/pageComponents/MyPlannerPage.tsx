import { useEffect, useState } from "react"
import { DeleteIcon } from "../../icons/DeleteIcon"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, deleteStudyPlan, getStudyPlanInfo, getStudyPlanList, RootState } from "../../store";
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import { EyeOpenIcon } from "../../icons/EyeOpenIcon";
import { useNavigate } from "react-router-dom";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(updateLocale);

type DataListType = {
    _id: string;
    levelOfExpertise: string;
    studyDuration: string;
    studyPlanStatus: string;
    topic: string;
    totalTimeCommitment: string;
}[]

const MyPlannerPage = () => {
    const { isStudyPlanListLoading, studyPlanList } = useSelector((state: RootState) => state?.studyPlanner);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState<DataListType>([]);

    useEffect(() => {
        dispatch(getStudyPlanList())
    }, [])

    useEffect(() => {
        setDataList(studyPlanList);
    }, [studyPlanList])

    return (
        <div className="flex justify-center items-center">
            {
                isStudyPlanListLoading ?
                    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md">
                            <div className="flex flex-col justify-center items-center animate-pulse">
                                <img src="/ai-assistant.png" alt="loading" className="w-[225px]" />
                                <p className="text-lg font-semibold">Get Study Plan List...</p>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        {
                            dataList && Array.isArray(dataList) && dataList.length > 0 ?
                                <div className="grid grid-cols-3 gap-4 w-[80%] my-6">
                                    {
                                        dataList.map((studyPlan, index) => {
                                            const { _id, levelOfExpertise, studyDuration, studyPlanStatus, topic, totalTimeCommitment } = studyPlan
                                            return (
                                                <div
                                                    key={index}
                                                    className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 w-full max-w-md transition-transform duration-300 hover:scale-105"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="">
                                                            <h2 className="inline-block text-lg font-semibold text-gray-700 cursor-pointer"
                                                            >{topic}</h2>
                                                            <p className="text-sm text-gray-500">{studyDuration}</p>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <EyeOpenIcon
                                                                className="w-[25px] h-[25px] me-4"
                                                                onClick={() => {
                                                                    dispatch(getStudyPlanInfo(_id, navigate))
                                                                }}
                                                            />
                                                            <DeleteIcon
                                                                className="w-[25px] h-[25px]"
                                                                onClick={() => {
                                                                    dispatch(deleteStudyPlan(_id));
                                                                    // setDataList(dataList.filter(item => item._id !== _id))
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <p className="text-gray-700">
                                                            <span className="font-medium">Expertise:</span> {levelOfExpertise}
                                                        </p>
                                                        <p className="text-gray-700">
                                                            <span className="font-medium">Session Duration:</span> {totalTimeCommitment}
                                                        </p>
                                                        <span
                                                            className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full ${studyPlanStatus === "Complete"
                                                                ? "bg-green-100 text-green-600"
                                                                : studyPlanStatus === "On going"
                                                                    ? "bg-blue-100 text-blue-600"
                                                                    : studyPlanStatus === "Overdue"
                                                                        ? "bg-red-100 text-red-600"
                                                                        : "bg-yellow-100 text-yellow-600"
                                                                }`}
                                                        >
                                                            {studyPlanStatus}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : <div className="text-gray-500 text-center py-4">No study plan has been added yet.</div>
                        }
                    </>
            }
        </div >
    )
}

export default MyPlannerPage