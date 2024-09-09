import { useState } from "react";
import BoxSearch from "./BoxSearch";
import FormFull from "./FormFull";
import LocationSearch from "./LocationSearch";
import TimeSearch from "./TimeSearch.jsx";

export default function MainSearch(){

    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const [showFormFull, setShowFormFull] = useState(CONSTANTS.FORM_FULL_NO_SHOW);
    let classFormFull = '';
    
    //Calcular estado de muestra del form de búsqueda [location | time]
    if(showFormFull === CONSTANTS.FORM_FULL_SHOW_LOCATION || showFormFull === CONSTANTS.FORM_FULL_SHOW_TIME ){
        classFormFull = 'form-full form-full-in';
    }else if(showFormFull === CONSTANTS.FORM_FULL_CLOSE){
        classFormFull = 'form-full form-full-out';
    }else{//showFormFull === CONSTANTS.FORM_FULL_NO_SHOW
        classFormFull = 'form-full form-full-no-show';
    }

    const handleFormToShow = (formToShow)=>{
        setShowFormFull(formToShow);
    }
    
    return(
        <div className="main-search">
            <BoxSearch
                onClickSearchCriteria={handleFormToShow}
            >
            </BoxSearch>
            <FormFull
                className={classFormFull}
                onClose={handleFormToShow}
            >
                {showFormFull===CONSTANTS.FORM_FULL_SHOW_LOCATION &&
                    <LocationSearch
                        onSelect={handleFormToShow}
                    >
                    </LocationSearch>
                }
                {showFormFull===CONSTANTS.FORM_FULL_SHOW_TIME &&
                    <TimeSearch
                        onSelect={handleFormToShow}
                    >
                    </TimeSearch>
                }
            </FormFull>
            
        </div>
    );
}