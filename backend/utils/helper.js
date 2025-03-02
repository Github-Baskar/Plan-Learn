import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const isActivityOverdue = (activity) => {
    const currentTime = dayjs().tz("UTC");
    const activityDate = dayjs(activity.date).format("YYYY-MM-DD");
    const timeRange = activity.time.split(" - ");
    const endTime = timeRange[1];
    const activityEndDateTime = dayjs(`${activityDate} ${endTime}`, "YYYY-MM-DD h:mm A").tz("UTC");

    return activityEndDateTime.isBefore(currentTime) && !activity.isComplete;
};

export const extractFormattedDate = (date) => {
    return dayjs(date, [
        "DD-MM-YYYY",
        "MMMM D, YYYY",
        "MMM D, YYYY",
        "YYYY-MM-DD",
        "MM/DD/YYYY",
        "D MMM YYYY",
    ]).format("YYYY-MM-DD")
};

export const formatDateString = (dateString) => {
    const match = dateString.match(/(\d{1,2}-\d{1,2}-\d{4}|\w{3,} \d{1,2}, \d{4}|\d{4}-\d{2}-\d{2})/g);
    if (!match) return [];

    return match.map(date =>
        dayjs(date, [
            "DD-MM-YYYY",
            "MMMM D, YYYY",
            "MMM D, YYYY",
            "YYYY-MM-DD",
            "MM/DD/YYYY",
            "D MMM YYYY",
        ]).format("MMM D, YYYY")
    );
};

export const formatTimeString = (timeString) => {
    const match = timeString.match(/(\d{1,2}:\d{2} [APM]{2})\s*to\s*(\d{1,2}:\d{2} [APM]{2})/i);
    if (!match) return null;
    return match.slice(1);
};