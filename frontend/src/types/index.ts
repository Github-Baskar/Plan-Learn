export type SignInErrorMsgType = {
    email: string,
    password: string,
}

export type SignUpErrorMsgType = SignInErrorMsgType & {
    name: string,
    confirmPassword: string
}

export type UserInfoSliceType = {
    isLoading: boolean;
    userInfo: {
        id: string;
        name: string;
        email: string;
    } | null;
}

export type AddPlannerDataType = {
    topic: string;
    level: string;
    dateRange: string[];
    schedule: string[];
}

export type PlannerResponseDataType = {
    topic: string,
    levelOfExpertise: string,
    studyDuration: string,
    studyDays: string[],
    totalTimeCommitment: string,
    significance: string,
    applications: string[],
    learningObjectives: string[],
    dayOverview: { [key: string]: any }[],
    learningResources: { [key: string]: any },
    assessment: {
        methods: string[],
        frequency: string
    },
    adjustments: string[]
}