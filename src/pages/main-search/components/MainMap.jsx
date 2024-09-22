import { useState } from "react";
import FormFull from "./FormFull";
import MapComponent from "./MapComponent";
import PoiDetails from "./PoiDetails.jsx";

export default function MainMap(){

    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const [showFormFull, setShowFormFull] = useState(CONSTANTS.FORM_FULL_NO_SHOW);
    const [poi, setPoi] = useState(null);
    let classFormFull = '';
    
    //Calcular estado de muestra del form full (Point of interest selected)
    switch(showFormFull){
        case CONSTANTS.FORM_FULL_NO_SHOW:
            classFormFull = 'form-full form-full-no-show';
            break;
        case CONSTANTS.FORM_FULL_CLOSE:
            classFormFull = 'form-full form-full-out';
            break;
        default://CONSTANTS.FORM_FULL_SHOW_POI
            classFormFull = 'form-full form-full-in';
            break;
    }

    const handleFormToShow = (formToShow)=>{
        setShowFormFull(formToShow);
    }
    
    const handlePoiToShow = (poi)=>{
        if(poi){
            setPoi(poi);
            setShowFormFull(CONSTANTS.FORM_FULL_SHOW_POI);
        }
    }

    return (
        <div>
            <MapComponent
                onSelectPoi={handlePoiToShow}
            ></MapComponent>
            <FormFull
                className={classFormFull}
                onClose={handleFormToShow}
            >
                <PoiDetails
                    poi={poi}
                ></PoiDetails>
            </FormFull>
        </div>
    )
}