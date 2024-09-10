import React, { useState, useContext, useRef } from "react";
import { Search, SearchDispatch } from "../contexts/SearchContext.jsx";
import { addDays,subHours,setHours,setMinutes } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getTimeObject} from '../utils/SearchUtils.js'

export default function TimeSearch({onSelect}){
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const {searchCriteria} = useContext(Search);
    const {seachCriteriaDispatch} = useContext(SearchDispatch);
    const [startDate, setStartDate] = useState(new Date(searchCriteria.time.date));
    const [timeObject, setTimeObject] = useState(searchCriteria.time);

    let lstQuickRes = useRef(getLstQuickInputs());

    //Actualizar input fecha y timeObject al presionar en un resultado
    const handleResultSelected=(quickInput)=>{
        setStartDate(new Date(quickInput.date));
        setTimeObject(quickInput);
    };

    //Actualizar input fecha y timeObject al presionar en el date pickewr
    const handleDatePickerSelected=(date)=>{
        setStartDate(date);
        setTimeObject(getTimeObject(date));
    };
    
    //Actualizar SearchCriteria (y cerrar) al presionar en confirmar
    const handleConfirm=()=>{
        seachCriteriaDispatch({
            type:CONSTANTS.ACTION_UPDATE_TIME,
            val:timeObject
        });
        setTimeout(()=>onSelect(CONSTANTS.FORM_FULL_CLOSE), 100);
    }

    function getLstQuickInputs(){
        let lstQuickInputs = CONSTANTS.TIME_QUICK_INPUTS;
        let newDate = new Date();
        for(let index in lstQuickInputs){
            let quickInput = lstQuickInputs[index];
            switch(index){
                case "0"://ahora
                    newDate = new Date();
                    lstQuickInputs[index] = getTimeObject(newDate,quickInput.label);
                    break;
                case "1"://mañana
                    newDate = addDays(new Date(), 1);
                    lstQuickInputs[index] = getTimeObject(newDate,quickInput.label);
                    break;
                case "2"://Hace una hora
                    newDate = subHours(new Date(), 1);
                    lstQuickInputs[index] = getTimeObject(newDate,quickInput.label);
                    break;
                case "3"://Hoy (todo el día)
                    newDate = setHours(new Date(), 0);
                    newDate = setMinutes(newDate, 0);
                    lstQuickInputs[index] = getTimeObject(newDate,quickInput.label);
                    break;
                default:
                    break;
            }
        }
        return lstQuickInputs;
    }
    
    return (
        <div className="time-search">
            <h2>Horario</h2>
            <div className="input-container">
                {timeObject && timeObject.label!==timeObject.date && <div>
                    <p>{timeObject.label}:</p>
                    <span className="y-space-10px"></span>
                </div>
                }
                <DatePicker
                        className="input-1"
                        selected={startDate}
                        onChange={(date) => handleDatePickerSelected(date)}
                        timeInputLabel="Time:"
                        dateFormat={CONSTANTS.TIME_FORMAT_1}
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 365)}
                        showTimeInput
                        disabledKeyboardNavigation
                />
                <span className="y-space-10px"></span>
                <button
                    className="btn-1"
                    onClick={()=>handleConfirm()}
                >Confirmar</button>
            </div>
            <div className="result-container">
                <div className="result-fav">
                    {lstQuickRes.current.length>0 && <h3>Rápidos</h3>}
                    {lstQuickRes.current.map((res,index)=>{
                        return (
                            <div 
                                key={index}
                                className="item-res"
                                onClick={()=>handleResultSelected(res)}
                            >
                                <button className="btn-icon-2">
                                    <i className="fa fa-flash"></i>
                                </button>
                                <p>{res.label}</p>
                                <button className="btn-icon-2" style={{visibility:'hidden'}}>
                                    <i className="fa fa-heart txt-larger-0"></i>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}