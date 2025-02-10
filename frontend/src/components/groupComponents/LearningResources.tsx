import SafeLink from "../baseComponents/SafeLink"

type LearningResourcesProps = {
    learningResources: {
        [key: string]: {
            title?: string,
            author?: string,
            platform?: string,
            courseTitle?: string,
            link?: string,
            description: string,
        }[]
    }
}

const LearningResources = ({ learningResources }: LearningResourcesProps) => {
    return (
        // <div className="grid">
        //     {/* {
        //         data?.learningResources && Object.keys(data.learningResources).map((key, index) => {
        //             return (
        //                 <div key={index} className="card bg-white text-black border shadow-md rounded-lg p-8 my-8">
        //                     <h3 className='text-lg font-semibold'>{key}</h3>
        //                     <ul className='list-disc mt-2 ps-8'>
        //                         {
        //                             data?.learningResources[key].map((resource: { description: string }, index: number) => (
        //                                 <li key={index} className='text-lg'>{resource?.description}</li>
        //                             ))
        //                         }
        //                     </ul>
        //                 </div>
        //             )
        //         })
        //     } */}
        // </div>
        <>
            {
                learningResources && Object.keys(learningResources).map((key, index) => {
                    const sectionTitle = key === 'books' ? 'Books' : key === 'onlineCourses' ? 'Online Courses' : key === 'videosAndDocumentaries' ? 'Videos' : 'Articles & Journals'
                    if (learningResources[key].length > 0) {
                        return (
                            <div key={index} className="learning-resources">
                                {/* <h2 className='text-center text-lg underline font-semibold mb-2'>{sectionTitle}</h2> */}
                                <div className="relative">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="bg-white px-3 text-base font-semibold text-gray-900 uppercase">{sectionTitle}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    {
                                        learningResources[key].map((resource, index) => (
                                            <div key={index} className="card bg-white text-black border shadow-md rounded-lg p-8 my-8">
                                                <SafeLink url={resource?.link || ''}>
                                                    {resource?.title || resource?.courseTitle}
                                                </SafeLink>
                                                <p className='text-base text-[#5b6780] my-2'>{resource?.description}</p>
                                                {
                                                    (resource?.author || resource?.platform) &&
                                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                                                        {resource?.author || resource?.platform}
                                                    </span>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    return null
                })
            }
        </>
    )
}

export default LearningResources