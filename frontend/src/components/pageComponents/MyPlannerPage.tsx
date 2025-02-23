import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { AppDispatch, deleteStudyPlan, getStudyPlanInfo, getStudyPlanList, RootState } from "../../store";
import { DataListType } from "../../types";

import { DeleteIcon } from "../../icons/DeleteIcon"
import Badge from "../baseComponents/Badge";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(updateLocale);

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
        <div className="">
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
                                <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-[95%] sm:w-[90%] lg:w-[80%] my-6 mx-auto">
                                    {
                                        dataList.map((studyPlan, index) => {
                                            const { _id, levelOfExpertise, studyDuration, studyPlanStatus, topic, totalTimeCommitment } = studyPlan
                                            return (
                                                <div key={index} className="relative group bg-white shadow-lg rounded-2xl p-5 border border-gray-200 transition-transform duration-300 hover:scale-105 w-[300px] sm:w-full cursor-pointer">
                                                    <h2
                                                        className="text-base md:text-lg font-semibold underline tracking-[1px] w-[75%] truncate text-blue-600 group-hover:text-blue-800"
                                                        onClick={() => {
                                                            dispatch(getStudyPlanInfo(_id, navigate))
                                                        }}
                                                    >{topic}</h2>
                                                    <p className="text-xs md:text-sm text-[#5b6780] font-semibold mt-2">{studyDuration}</p>
                                                    <div className="absolute top-4 end-4 hover:bg-red-100 p-2 rounded-full">
                                                        <DeleteIcon
                                                            className="w-[22px] h-[22px] md:w-[25px] md:h-[25px]"
                                                            onClick={(e: React.MouseEvent) => {
                                                                e.stopPropagation();
                                                                dispatch(deleteStudyPlan(_id));
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-2 sm:mt-3">
                                                        <p className="text-sm md:text-base text-[#5b6780]">
                                                            <span className="font-medium">Expertise:</span> {levelOfExpertise}
                                                        </p>
                                                        <p className="text-sm md:text-base text-[#5b6780]">
                                                            <span className="font-medium">Session Dur.:</span> {totalTimeCommitment}
                                                        </p>
                                                        <Badge className="mt-2 sm:mt-3">{studyPlanStatus}</Badge>
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