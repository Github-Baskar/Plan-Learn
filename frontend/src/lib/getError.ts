import { AxiosError } from "axios";

import { ApiErrorResponse } from "../types";

export const getError = (error: unknown): string => {
    if (error instanceof AxiosError && error.response) {
        const data = error.response.data as ApiErrorResponse;
        return data.message || data.exception || "Something went wrong!";
    }
    return "An unexpected error occurred!";
};
