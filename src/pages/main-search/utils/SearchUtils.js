import { format } from 'date-fns';

const CONSTANTS = require("../../../utils/constants/Constants.js");

export function getTimeObject(date, label){        
    const formattedDate = format(date, CONSTANTS.TIME_FORMAT_1);
    const idDay = date.getDay()>0 ? date.getDay() : 7;
    let time = {
        label:label?label:formattedDate,
        date:formattedDate,
        id_day_of_week:CONSTANTS.WEEKDAY_QUICK_CONFIGS.find((el)=>el.id_dom_val===idDay).id_dom_val,
        start_time:date.getHours() + ":" + date.getMinutes()
    }
    return time;
}

export function isSearchCriteriaTimeInScheduleValue(objSearchCriteriaTime, objScheduleValue){
    const res = isDayInScheduleValue(objSearchCriteriaTime, objScheduleValue) 
                &&
                isTimeInScheduleValue(objSearchCriteriaTime, objScheduleValue);
    return res;
}

export function isDayInScheduleValue(objSearchCriteriaTime, objScheduleValue){
    const res = CONSTANTS.WEEKDAY_QUICK_CONFIGS.find((el)=>{
        if(el.id_dom_val === objScheduleValue.id){
            if(el.include_ids.includes(objSearchCriteriaTime.id_day_of_week))
                return true;
        }
        return false;
    })
    //console.log(res?true:false,objSearchCriteriaTime.id_day_of_week,objScheduleValue);
    return res?true:false;
}

export function isTimeInScheduleValue(objSearchCriteriaTime, objScheduleValue){
    const res = objScheduleValue.times.some(el=>{
        //console.log(objSearchCriteriaTime.start_time,el.start,el.start > objSearchCriteriaTime.start_time,(el.end.length>0));
        return (completeStrHour(el.start) > completeStrHour(objSearchCriteriaTime.start_time)) || ((el.end && el.end.length>0)? (objSearchCriteriaTime.start_time < el.end) : false);
    });
    //console.log(res?true:false, objSearchCriteriaTime.start_time);
    return res?true:false;
}

function completeStrHour(time){
    if(time.split(':')[0].length<2)
        return "0"+time;
    else
        return time;
}

export function formatTime24To12(time){//time format (24)HH:mm
    const h = Number(time.split(':')[0]);
    const m = time.split(':')[1];
    let resTime = "";
    if(h>12){
        resTime = (h-12) + ":" + m + " PM";
    }else{
        resTime = h + ":" + m + " AM";
    }
    return resTime;
}