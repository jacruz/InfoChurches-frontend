import { useContext } from "react";
import { SearchCriteria, SearchCriteriaDispatch } from "../contexts/SearchCriteriaContext";
import LinkText from "./LinkText.jsx";
import TabMenu from "./TabMenu";

export default function BoxSearch({onClickSearchCriteria}){
    
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const searchCriteria = useContext(SearchCriteria);
    const seachCriteriaDispatch = useContext(SearchCriteriaDispatch);

    const handleSelectedTabSchedule = (idTab)=>{
        seachCriteriaDispatch({
            type:CONSTANTS.ACTION_UPDATE_SCHEDULE,
            val:idTab
        });
    }

    return (
        <div className="box-search">
            <TabMenu 
                dataTabMenu={CONSTANTS.BOX_SEARCH_DATA_TAB_MENU}
                idTabSelected={searchCriteria.schedule_id}
                callbackHandleSelectedTab={handleSelectedTabSchedule}
            ></TabMenu>
            <div className="box-search-label">
                <LinkText
                    icon={CONSTANTS.ICON_LOCATION}
                    onClick={()=>{onClickSearchCriteria(CONSTANTS.FORM_FULL_SHOW_LOCATION)}}
                >
                    {searchCriteria.location.label}
                </LinkText>
                
                <LinkText
                    icon={CONSTANTS.ICON_TIME}
                    onClick={()=>{onClickSearchCriteria(CONSTANTS.FORM_FULL_SHOW_TIME)}}
                >
                    Desde: {searchCriteria.time.label}
                </LinkText>
            </div>
        </div>
    );
}