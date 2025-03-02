import dayjs from "dayjs";
import { dayNameToNumber } from "./constants";

export const profileName = (name: string) => {
    let result = "";
    let processedName = name ? name.split(" ") : "NA"
    processedName.length < 2 ?
        result = processedName[0].charAt(0) :
        result = processedName[0].charAt(0) + processedName[1].charAt(0);
    return result.toUpperCase();
};

export const formatLabel = (text: string) => {
    text = text.replace(/([a-z])([A-Z])/g, "$1 $2");
    text = text.replace(/[_-]/g, " ");
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const validateForm = (formData: { [key: string]: string }, field: string, value: string) => {
    switch (field) {
        case 'name':
            if (!/^[A-Za-z\s]+$/.test(value)) {
                return "Name must contain only letters."
            }
            break;
        case 'email':
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                return "Invalid email address."
            }
            break;
        case 'password':
            if (value.length < 6) {
                return "Password must be at least 6 characters."
            }
            break;
        case 'confirmPassword':
            if (value !== formData.password) {
                return "Passwords do not match."
            }
            break;
        default:
            break;
    }
}

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const convertToHoursAndMinutes = (time: string): string => {
    const match = time.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)?(?:\s*(\d+(?:\.\d+)?)\s*(?:minutes?|mins?))?/i);

    if (!match) return "";

    let hours = parseFloat(match[1] ?? "0");
    let minutes = parseFloat(match[2] ?? "0");

    if (hours % 1 !== 0) {
        minutes += (hours % 1) * 60;
        hours = Math.floor(hours);
    }

    return `${hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : ""}${minutes > 0 ? ` ${minutes} min${minutes > 1 ? "s" : ""}` : ""}`.trim();
};

export const extractFormattedDate = (dateString: string): string[] => {
    const match = dateString.match(/(\d{1,2}-\d{1,2}-\d{4}|\w{3,} \d{1,2}, \d{4}|\d{4}-\d{2}-\d{2})/g);
    if (!match) return [];

    return match.map(date =>
        dayjs(date, [
            "DD-MM-YYYY", // Added for "01-03-2025" format
            "MMMM D, YYYY",
            "MMM D, YYYY",
            "YYYY-MM-DD",
            "MM/DD/YYYY",
            "D MMM YYYY",
        ]).format("MMM D, YYYY")
    );
};

export const getShortDay = (fullDays: string[]): string[] => {
    return fullDays.map(day => {
        const dayNumber = dayNameToNumber[day];
        return dayNumber !== undefined ? dayjs().day(dayNumber).format("ddd") : day;
    });
};