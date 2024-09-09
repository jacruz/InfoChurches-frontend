import { format } from 'date-fns';

const CONSTANTS = require("../../../utils/constants/Constants.js");

export function getTimeObject(date, label){        
    const formattedDate = format(date, CONSTANTS.TIME_FORMAT_1);
    let time = {
        label:label?label:formattedDate,
        date:formattedDate,
        days_of_week:CONSTANTS.WEEKDAY[date.getDay()],
        start_time:date.getHours() + ":" + date.getMinutes()
    }
    return time;
}