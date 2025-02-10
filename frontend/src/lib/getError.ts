export const getError = (error: { [key: string]: any }) => {
    const errorMsg = error?.response?.data?.exception || 'An Error Occured!!';
    return errorMsg;
};
