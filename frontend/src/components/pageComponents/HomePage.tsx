import { useState } from "react";
import { chatSession } from "../../utilities/aiModel";
import { ai_prompt } from "../../utilities/constants";
import Button from "../baseComponents/Button";

const HomePage = () => {
    const [isExplore, setIsExplore] = useState(false);
    const generateResponse = async () => {
        const result = await chatSession.sendMessage(ai_prompt);
        console.log(result.response.text());
    }
    return (
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
            {
                isExplore ? (
                    <form>
                        <div className="input-wrapper">
                        </div>
                    </form>
                ) : (
                    <div className="text-center lg:w-[60%] px-4 lg:px-0">
                        <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold">Find Your Dream College in Just a Few Clicks!</h1>
                        <p className="sm:w-[70%] lg:w-[80%] mx-auto my-4 lg:my-6 text-base md:text-lg text-gray-600">Get tailored AI recommendations based on your unique preferences. Explore college details, connect directly, and bookmark your top choices.</p>
                        <Button
                            className='btn bg-[#00bcd4] text-[#fff] hover:bg-[rgba(0,188,212,0.8)] text-base md:text-lg font-normal p-4 w-fit h-[40px]'
                            onClick={() => setIsExplore(!isExplore)}
                        >
                            Explore Colleges
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default HomePage