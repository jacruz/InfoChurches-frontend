import { createContext, useReducer } from "react";
import { getTimeObject } from '../utils/SearchUtils.js'

const CONSTANTS = require("../../../utils/constants/Constants.js");
export const Search = createContext(null);
export const SearchDispatch = createContext(null);

//TODO Cargar datos de location desde GPS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const seachCriteriaDefault = {
    schedule_id:0,//0:mass. Se seleccionará en el TabMenu
    location:{
        label:"Mi ubicación",//Lo que se visualiza en el input de consulta
        lat: "4.643829",
        lon: "-74.175382"
    },
    time:getTimeObject(new Date(),CONSTANTS.TIME_QUICK_INPUTS[0].label)
};

export function SearchProvider({children}){
    const [searchCriteria, searchCriteriaDispatch] = useReducer(
        SearchCriteriaReducer,
        seachCriteriaDefault
    );
    const [searchResults, searchResultsDispatch] = useReducer(
        SearchResultsReducer,
        []
    );
    const searchObjs = {searchCriteria, searchResults};
    const serchDispatches = {searchCriteriaDispatch, searchResultsDispatch}
    return(
        <Search.Provider value={searchObjs}>
            <SearchDispatch.Provider value={serchDispatches}>
                {children}
            </SearchDispatch.Provider>
        </Search.Provider>
    );
}

function SearchResultsReducer(searchResults, action){
    switch(action.type){
        case CONSTANTS.ACTION_UPDATE_RESULTS:{
            if(action.val != null && typeof action.val[Symbol.iterator] === 'function' ){
                return [
                    ...action.val
                ];
            }else{
                return [];
            }
            
        }
        default:{
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function SearchCriteriaReducer(seachCriteria, action){
    switch(action.type){
        case CONSTANTS.ACTION_UPDATE_SCHEDULE:{
            return {
                ...seachCriteria,
                schedule_id : action.val
            };
        }
        case CONSTANTS.ACTION_UPDATE_LOCATION:{
            return {
                ...seachCriteria,
                location : action.val
            };
        }
        case CONSTANTS.ACTION_UPDATE_TIME:{
            return {
                ...seachCriteria,
                time : action.val
            };
        }
        default:{
            throw Error('Unknown action: ' + action.type);
        }
    }
}