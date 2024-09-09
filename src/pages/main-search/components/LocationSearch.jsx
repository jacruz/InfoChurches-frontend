import { useRef, useEffect, useState, useContext } from "react";
import { SearchCriteria, SearchCriteriaDispatch } from "../contexts/SearchCriteriaContext";
import { locationFavorites, locationRecent } from "../../../data/localStorage";

export default function LocationSearch({onSelect}){
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const searchCriteria = useContext(SearchCriteria);
    const seachCriteriaDispatch = useContext(SearchCriteriaDispatch);

    const [lstFav, setLstFav] = useState([]);
    const [lstRecent, setLstRecent] = useState([]);
    let lstFavRes = useRef(lstFav);
    let lstRecentRes = useRef(lstRecent);
    //const [lstOtherRes, setLstOtherRes] = useState([]);
    const [inputValue,setInputValue] = useState(searchCriteria.location.label);
    const [locationObject,setLocationObject] = useState(searchCriteria.location);

    
    //(Al inicio) Consultar lista de favoritos y recientes
    useEffect(()=>{
        const resFav = locationFavorites;
        lstFavRes.current = resFav;
        setLstFav(resFav);
    },[]);
    useEffect(()=>{
        const resRecents = locationRecent;
        lstRecentRes.current = resRecents;
        setLstRecent(resRecents);
    },[]);

    //Filtrar al ir escribiendo cada letra
    const handleChangeInputValue = (e)=>{
        let inVal = e.target.value;
        setInputValue(inVal);

        if(inVal.trim().length>0){
            lstFavRes.current = lstFav.filter(el=>{
                if(el.label.toLowerCase().includes(inVal.toLowerCase())){
                    return el;
                }
                return null;
            });
            lstRecentRes.current = lstRecent.filter(el=>{
                if(el.label.toLowerCase().includes(inVal.toLowerCase())){
                    return el;
                }
                return null;
            });
        }else{
            lstFavRes.current = lstFav;
            lstRecentRes.current = lstRecent;
        }
    };


    //Lanzar consulta a API al cambiar el valor del input
    //TODO


    //Actualizar input al presionar en un resultado
    const handleResultSelected=(itemLoc)=>{
        setInputValue(itemLoc.label);
        setLocationObject(itemLoc);
    };

    //Actualizar SearchCriteria (y cerrar) al presionar en confirmar
    const handleConfirm=()=>{
        seachCriteriaDispatch({
            type:CONSTANTS.ACTION_UPDATE_LOCATION,
            val:locationObject
        });
        setTimeout(()=>onSelect(CONSTANTS.FORM_FULL_CLOSE), 100);
    };
    
    return (
        <div className="location-search">
            <h2>Ubicación</h2>
            <div className="input-container">
                <input 
                    className="input-1"
                    value={inputValue} 
                    onChange={handleChangeInputValue}
                ></input>
                <span className="y-space-10px"></span>
                <p className="link-1"><span>Ubicar punto en el mapa <i className="fa fa-map-pin"></i> </span></p>
                <span className="y-space-10px"></span>
                <button
                    className="btn-1"
                    onClick={()=>handleConfirm()}
                >Confirmar</button>
            </div>
            <div className="result-container">
                <div className="result-fav">
                    {lstFavRes.current.length>0 && <h3>Favoritos</h3>}
                    {lstFavRes.current.map((fav,index)=>{
                        return (
                            <div 
                                key={index}
                                className="item-res"
                                onClick={()=>handleResultSelected(fav)}
                            >
                                <button className="btn-icon-2">
                                    <i className="fa fa-heart"></i>
                                </button>
                                <p>{fav.label}</p>
                                <button className="btn-icon-2" style={{visibility:'hidden'}}>
                                    <i className="fa fa-heart txt-larger-0"></i>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="result-recent">
                {lstRecentRes.current.length>0 && <h3>Recientes</h3>}
                    {lstRecentRes.current.map((recent,index)=>{
                        return (
                            <div 
                                key={index}
                                className="item-res"
                            >
                                <button className="btn-icon-2">
                                    <i className="fa fa-clock-o"></i>
                                </button>
                                <p onClick={()=>handleResultSelected(recent)}>{recent.label}</p>
                                <button className="btn-icon-2">
                                    <i className="fa fa-minus-circle txt-larger-0"></i>
                                </button>
                                <button className="btn-icon-2">
                                    <i className="fa fa-heart-o txt-larger-0"></i>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="result-other">

                </div>
            </div>
        </div>
    );
}