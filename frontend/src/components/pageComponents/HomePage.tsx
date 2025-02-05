import { useNavigate } from "react-router-dom";
// import { chatSession } from "../../utilities/aiModel";
// import { ai_prompt } from "../../utilities/constants";
import Button from "../baseComponents/Button";

const HomePage = () => {
    const navigate = useNavigate();
    // const generateResponse = async () => {
    //     const result = await chatSession.sendMessage(ai_prompt);
    //     console.log(result.response.text());
    // }
    return (
        <div className="flex flex-col justify-center items-center min-h-[100vh]">
            <div className="flex flex-col justify-center items-center text-center lg:w-[60%] mt-36 mb-20 px-4 lg:px-0">
                <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold">Plan Smart. Learn Fast. Achieve More with AI!</h1>
                <p className="sm:w-[70%] lg:w-[80%] mx-auto my-4 lg:my-6 text-base md:text-lg text-gray-600">Supercharge your learning and productivity with Gemini-powered AI. Effortlessly generate smart schedules tailored to your goals and maximize every moment.</p>

                <Button
                    className='btn border-[#00bcd4] text-[#00bcd4] hover:scale-105 text-base md:text-lg font-normal p-4 w-fit h-[40px]'
                    // onClick={() => generateResponse()}
                    onClick={() => navigate('/create')}
                    icon={<span>📚</span>}
                >
                    Start Learning Smarter
                </Button>
            </div>
            <img className="w-[90%] md:w-[75%] lg:w-[50%]" src="/localhost_5173_(Nest Hub).png" alt="" />
        </div>
    )
}

export default HomePage