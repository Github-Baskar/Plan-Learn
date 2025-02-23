import Divider from "../baseComponents/Divider"
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
        <>
            {
                learningResources && Object.keys(learningResources).map((key, index) => {
                    const sectionTitle = key === 'books' ? 'Books' : key === 'onlineCourses' ? 'Online Courses' : key === 'videosAndDocumentaries' ? 'Videos' : 'Articles & Journals'
                    if (learningResources[key].length > 0) {
                        return (
                            <div key={index} className="learning-resources">
                                <Divider>{sectionTitle}</Divider>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mt-4 mb-6">
                                    {
                                        learningResources[key].map((resource, index) => (
                                            <div key={index} className="card bg-white text-black border shadow-md rounded-lg p-4 lg:p-8">
                                                <SafeLink url={resource?.link || ''}>
                                                    {resource?.title || resource?.courseTitle}
                                                </SafeLink>
                                                <p className='text-sm text-[#5b6780] text-justify my-2'>{resource?.description}</p>
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