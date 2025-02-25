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
        "MMMM D, YYYY",
        "MMM D, YYYY",
        "YYYY-MM-DD",
        "MM/DD/YYYY",
        "D MMM YYYY",
    ]).format("YYYY-MM-DD")
};