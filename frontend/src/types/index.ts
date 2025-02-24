export type SignInErrorMsgType = {
    email: string;
    password: string;
}

export type SignUpErrorMsgType = SignInErrorMsgType & {
    name: string;
    confirmPassword: string;
}

export type UserInfoSliceType = {
    isLoading: boolean;
    userInfo: {
        id: string;
        name: string;
        email: string;
        picture?: string;
    } | null;
}

export type AddPlannerDataType = {
    topic: string;
    level: string;
    dateRange: string[];
    timeRange: string[];
    schedule: string[];
}

export type PlannerResponseDataType = {
    userId?: string;
    topic: string;
    levelOfExpertise: string;
    studyDuration: string;
    studyTime: string;
    studyDays: string[];
    totalTimeCommitment: string;
    significance: string;
    applications: string[];
    learningObjectives: string[];
    dayOverview: { [key: string]: any }[];
    learningResources: { [key: string]: any };
    assessment: {
        methods: string[];
        frequency: string;
    },
    adjustments: string[];
}

export type DataListType = {
    _id: string;
    levelOfExpertise: string;
    studyDuration: string;
    studyTime: string;
    studyDays: string[];
    studyPlanStatus: string;
    topic: string;
    totalTimeCommitment: string;
    createdAt: Date;
}[]

export type InfoDataType = {
    _id: string;
    topic: string;
    levelOfExpertise: string;
    studyDuration: string;
    studyTime: string;
    studyDays: string[];
    totalTimeCommitment: string;
    dayOverview: { [key: string]: any }[];
    learningResources: { [key: string]: any };
    assessment: {
        methods: string[];
    };
    studyPlanStatus: string;
}