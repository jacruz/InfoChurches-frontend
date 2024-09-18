import React, { useContext, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, SearchDispatch } from "../contexts/SearchContext.jsx";
import iconChurch from "../../../assets/img/church.png";
import {isDayInScheduleValue,formatTime24To12} from '../utils/SearchUtils.js'

export default function MapComponent(){
    
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const ENV_GMAPS_API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
    const ENV_MAP_ID = process.env.REACT_APP_MAP_ID;
    const ENV_URL_SERVER = process.env.REACT_APP_URL_SERVER;
    
    const mapRef = useRef(null);
    
    const {searchCriteria, searchResults} = useContext(Search);
    const {searchResultsDispatch} = useContext(SearchDispatch);
    let lat = searchCriteria.location.lat;
    let lon = searchCriteria.location.lon;
    let scheduleIdSelected = searchCriteria.schedule_id;
    let idDayOfWeekSelected = searchCriteria.time.id_day_of_week;

    const url = ENV_URL_SERVER+"/api/v1/churches/nearby-search?lat="+lat+"&lon="+lon+"&distance=4";
    const searchResultsFiltered = useRef(searchResults);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: ENV_GMAPS_API_KEY,
    });
    
    useEffect(()=>{
        const fetchChurches = async () => {
            const res = await fetch(url, {
                'mode': 'cors'
            });
            const data = await res.json();
            console.log(data);

            console.log(scheduleIdSelected);

            //Filtrar resultado según cuadro de búsqueda
            searchResultsFiltered.current = data.filter((el)=>{
                if(el.schedules.find( (schedule)=> Number(schedule.id) === Number(scheduleIdSelected) ) ){
                    return el;
                }
                return null;
            });
            console.log(searchResultsFiltered.current);

            await searchResultsDispatch({
                type:CONSTANTS.ACTION_UPDATE_RESULTS,
                val:data
            });
        }
        fetchChurches();
    },[url, scheduleIdSelected, searchResultsDispatch, CONSTANTS.ACTION_UPDATE_RESULTS]);
    console.log(lat + ", " + lon);
    
    function handleLoad(map) {
        mapRef.current = map;
    }

    const handleMarkerClick = (poi) => {
        console.log('marker clicked:', poi);
        // TODO: Al presionar en los pines de resultado ver info completa de la iglesia
    };

    function handleMapChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        const newZoom = mapRef.current.getZoom();
        console.log('camera changed:', newPos, 'zoom:', newZoom);
        //TODO: Al mover mapa actualizar ubicación (Pero con holgura)
    }

    if (!isLoaded) 
        return (
        <div style={{height:"100%", display:"flex", flexFlow:"column", justifyContent:"center", alignItems:"center"}}>
            <p>Loading...</p>
            <img alt='icon-loading' src={iconChurch} style={{width:'80px'}} ></img>
        </div>
        );

    return (
        <>
        <GoogleMap
        center={{lat: Number(lat), lng: Number(lon)}}
        zoom={16}
        mapContainerStyle={{ width: '100%', height: '100%', position: "absolute", zindex: "0" }}
        options={{
            mapId: ENV_MAP_ID,
            disableDefaultUI: true,
            maxZoom: 18,
            minZoom: 14
        }}
        onLoad={handleLoad}
        onCenterChanged={handleMapChanged}
        onZoomChanged={handleMapChanged}
        >
        {searchResults.map((poi,index) => (
            <Marker
            key={index}
            position={{lat: Number(poi.location.lat), lng: Number(poi.location.lon)}}
            onClick={() => handleMarkerClick(poi)}
            icon={{
                url:iconChurch,
                scaledSize:  new window.google.maps.Size(30,30)
            }}
            >
                <InfoWindow
                position={{lat: Number(poi.location.lat), lng: Number(poi.location.lon)}}
                options={{ disableAutoPan: true }}
                >
                <div
                className='infoWindow-content'
                onClick={()=>handleMarkerClick(poi)}
                >
                    {(poi.schedules.find( (schedule)=> Number(schedule.id) === Number(scheduleIdSelected) ) !== undefined ) 
                    ?
                    <div>
                        {poi.schedules.map((schedule)=>(
                            
                            (Number(schedule.id) === Number(scheduleIdSelected)) &&
                            <div
                            key={schedule.id}
                            >
                                {schedule.value.map((scheduleValue)=>(
                                        <div
                                        key={scheduleValue.id}
                                        >
                                            { (isDayInScheduleValue(idDayOfWeekSelected, scheduleValue))
                                                ?
                                                scheduleValue.times.map((time)=>(
                                                    <p>{time.start?formatTime24To12(time.start):''}{time.end?'-'+formatTime24To12(time.end):''}</p>
                                                ))
                                                
                                                :
                                                <p> - X - </p>
                                            }
                                            
                                        </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    :
                    <span> - - - </span>
                    }
                </div>
                </InfoWindow>
            
            </Marker>
        ))}
        </GoogleMap>
        </>
    );
};