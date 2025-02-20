import axiosMain from 'axios';

export const axios = axiosMain.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials: true, // Enables sending cookies with requests
    headers: {
        'Content-Type': 'application/json'
    }
});