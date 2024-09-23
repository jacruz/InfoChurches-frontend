import { useContext } from "react";
import { Search, SearchDispatch } from "../contexts/SearchContext.jsx";
import LinkText from "./LinkText.jsx";
import TabMenu from "./TabMenu";

export default function BoxSearch({onClickSearchCriteria}){
    
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const {searchCriteria} = useContext(Search);
    const {searchCriteriaDispatch} = useContext(SearchDispatch);

    const handleSelectedTabSchedule = (idTab)=>{
        searchCriteriaDispatch({
            type:CONSTANTS.ACTION_UPDATE_SCHEDULE,
            val:idTab
        });
    }

    return (
        <div className="box-search">
            <TabMenu 
                dataTabMenu={CONSTANTS.SCHEDULES_CONFIG.filter((el=>CONSTANTS.SEARCH_DATA_SCHEDULES.includes(el.id)))}
                idTabSelected={searchCriteria.schedule_id}
                callbackHandleSelectedTab={handleSelectedTabSchedule}
            ></TabMenu>
            <div className="box-search-label">
                {false && <LinkText
                    icon={CONSTANTS.ICON_LOCATION}
                    onClick={()=>{onClickSearchCriteria(CONSTANTS.FORM_FULL_SHOW_LOCATION)}}
                >
                    <span className="text-yellow-dark ">Cerca a: </span>{searchCriteria.location.label}
                </LinkText>
                }
                
                <LinkText
                    icon={CONSTANTS.ICON_TIME}
                    onClick={()=>{onClickSearchCriteria(CONSTANTS.FORM_FULL_SHOW_TIME)}}
                >
                    <span className="text-yellow-dark ">¿Cuándo?: </span>{searchCriteria.time.label===searchCriteria.time.date?' Desde ':''}{searchCriteria.time.label}
                </LinkText>
            </div>
        </div>
    );
}