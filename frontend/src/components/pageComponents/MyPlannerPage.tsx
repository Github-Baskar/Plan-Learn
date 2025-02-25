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
import CardLoader from "../../skeletonLoaders/CardLoader";
import Modal from "../baseComponents/Modal";
import Button from "../baseComponents/Button";
import ClockIcon from "../../icons/ClockIcon";
import CalendarIcon from "../../icons/CalendarIcon";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(updateLocale);

const MyPlannerPage = () => {
    const { isStudyPlanListLoading, studyPlanList } = useSelector((state: RootState) => state?.studyPlanner);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [dataList, setDataList] = useState<DataListType>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteTopic, setDeleteTopic] = useState({
        topic: '',
        id: ''
    });

    useEffect(() => {
        userInfo?.id && dispatch(getStudyPlanList(userInfo.id))
    }, [])
    useEffect(() => {
        setDataList(studyPlanList);
    }, [studyPlanList])
    return (
        <div className="">
            {
                isStudyPlanListLoading ?
                    <CardLoader />
                    :
                    <>
                        {
                            dataList && Array.isArray(dataList) && dataList.length > 0 ?
                                <div className="flex flex-col items-center sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 w-[95%] sm:w-[90%] lg:w-[80%] my-6 mx-auto">
                                    {
                                        dataList.map((studyPlan, index) => {
                                            const { _id, studyDuration, studyTime, studyDays, studyPlanStatus, topic, totalTimeCommitment, createdAt } = studyPlan
                                            return (
                                                <div key={index} className="relative group bg-white shadow-lg rounded-2xl p-5 border border-gray-200 transition-transform duration-300 hover:scale-105 w-[300px] sm:w-full cursor-pointer">
                                                    <h2
                                                        className="text-base md:text-lg font-semibold underline tracking-[1px] w-[75%] truncate text-blue-600 group-hover:text-blue-800"
                                                        title={topic}
                                                        onClick={() => {
                                                            dispatch(getStudyPlanInfo(_id, navigate))
                                                        }}
                                                    >{topic}</h2>
                                                    <p className="flex items-center text-xs md:text-sm text-[#5b6780] font-semibold mt-2"><CalendarIcon className="w-[15px] me-1" />{studyDuration} (Dur.: {totalTimeCommitment})</p>
                                                    <p className="flex items-center text-xs md:text-sm text-[#5b6780] font-semibold"><ClockIcon className="w-[15px] me-1" />{studyTime}</p>
                                                    {
                                                        Array.isArray(studyDays) && studyDays.length > 0 &&
                                                        <div className="mt-2 sm:mt-3">
                                                            <p className="text-xs md:text-sm text-[#5b6780] font-semibold">Preferred Days:</p>
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {
                                                                    studyDays.length !== 7 ? studyDays.map((studyDay, index) => {
                                                                        return (
                                                                            <span key={index} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs md:text-sm font-semibold text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                                                                {studyDay}
                                                                            </span>
                                                                        )
                                                                    }) :
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs md:text-sm font-semibold text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                                                            All Days
                                                                        </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="flex justify-between items-center mt-2 sm:mt-3">
                                                        <p className="text-xs text-[#5b6780] font-semibold">Created at: {dayjs(createdAt).format('MMM D, YYYY')}</p>
                                                        <Badge>{studyPlanStatus}</Badge>
                                                    </div>
                                                    <div className="absolute top-4 end-4 hover:bg-red-100 p-2 rounded-full">
                                                        <DeleteIcon
                                                            className="w-[22px] h-[22px] md:w-[25px] md:h-[25px]"
                                                            onClick={(e: React.MouseEvent) => {
                                                                e.stopPropagation();
                                                                setIsModalOpen(true);
                                                                setDeleteTopic({
                                                                    topic,
                                                                    id: _id
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> : userInfo?.id ? <div className="text-gray-500 text-center py-4">No study plans have been added yet</div> : <div className="text-gray-500 text-center py-4">You must be logged in to add a study plan. Please log in to continue.</div>
                        }
                    </>
            }
            <Modal
                isModalOpen={isModalOpen}
                onSubmit={() => null}
                OnCancel={() => setIsModalOpen(!isModalOpen)}
                closable={false}
                footer={false}
            >
                <div className="flex flex-col justify-center items-center">
                    <p className='text-lg text-center font-semibold mb-6'>{`Are you sure you want to delete ${`"${deleteTopic.topic}"` || 'this study plan'}?`} This action cannot be undone.</p>
                    <div className="flex gap-4">
                        <Button
                            className='btn !border-red-600 !text-red-600 bg-red-100 hover:!bg-red-200 text-base px-4 py-2 w-fit h-[35px]'
                            onClick={() => {
                                deleteTopic?.id && dispatch(deleteStudyPlan(deleteTopic.id));
                                setIsModalOpen(false);
                            }}
                        >
                            Confirm
                        </Button>
                        <Button
                            className='btn !border-gray-600 !text-gray-600 bg-gray-100 hover:!bg-gray-200 text-base px-4 py-2 w-fit h-[35px]'
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div >
    )
}

export default MyPlannerPage