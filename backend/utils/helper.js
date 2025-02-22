import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const isActivityOverdue = (activity) => {
    const currentTime = dayjs().tz("UTC"); // Get current time in UTC

    // Extract date from activity (ignoring time)
    const activityDate = dayjs(activity.date).format("YYYY-MM-DD"); // "2025-02-10"

    // Extract end time from "2:45 PM - 3:45 PM"
    const timeRange = activity.time.split(" - "); // ["2:45 PM", "3:45 PM"]
    const endTime = timeRange[1]; // "3:45 PM"

    // Combine date and end time
    const activityEndDateTime = dayjs(`${activityDate} ${endTime}`, "YYYY-MM-DD h:mm A").tz("UTC");

    // Check if activity is overdue
    return activityEndDateTime.isBefore(currentTime) && !activity.isComplete;
};