import React, { useContext, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, SearchDispatch } from "../contexts/SearchContext.jsx";
import iconChurch from "../../../assets/img/church.png";
import error1 from "../../../assets/img/error1.png";
import point from "../../../assets/img/point.gif";
import iconChurchDisabled from "../../../assets/img/church-disabled.png";
import {isSearchCriteriaTimeInScheduleValue,formatTime24To12} from '../utils/SearchUtils.js'
import {getDistanceFromLatLonInKm} from '../utils/distanceCalculator.js'

export default function MapComponent({onSelectPoi}){
    
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    const ENV_GMAPS_API_KEY = process.env.REACT_APP_GMAPS_API_KEY;
    const ENV_MAP_ID = process.env.REACT_APP_MAP_ID;
    const ENV_URL_SERVER = process.env.REACT_APP_URL_SERVER;
    
    const mapRef = useRef(null);
    
    const {searchCriteria, searchResults} = useContext(Search);
    const {searchResultsDispatch, searchCriteriaDispatch} = useContext(SearchDispatch);
    let scLat = searchCriteria.location.lat;
    let scLon = searchCriteria.location.lon;
    let distance = CONSTANTS.DEFAULT_DISTANCE_NEARBY_SEARCH;
    let scheduleIdSelected = searchCriteria.scheduleId;
    let currentLocation = useRef({lat: scLat, lon: scLon});
    let center = useRef({lat: scLat, lon: scLon});
    console.log(center.current.lat,center.current.lon);
    console.log(scLat,scLon);

    const url = ENV_URL_SERVER+"/api/v1/churches/nearby-search?lat="+center.current.lat+"&lon="+center.current.lon+"&distance="+distance;
    const searchResultsFiltered = useRef(searchResults);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: ENV_GMAPS_API_KEY,
    });

    let isError = useRef(false);

    useEffect(()=>{

        try {
            if(searchCriteria.searchInArea){
                const fetchChurches = async () => {

                    try {
                        const res = await fetch(url, {
                            'mode': 'cors'
                        })
                        if(res.status===200){
                            const data = await res.json();
                            console.log(data);
                
                            //Filtrar resultado según cuadro de búsqueda
                            searchResultsFiltered.current = data.filter((el)=>{
                                if(el.schedules.find( (schedule)=> Number(schedule.id) === Number(scheduleIdSelected) ) ){
                                    return el;
                                }
                                return null;
                            });
                
                            await searchResultsDispatch({
                                type:CONSTANTS.ACTION_UPDATE_RESULTS,
                                val:data
                            });
                            await searchCriteriaDispatch({
                                type:CONSTANTS.ACTION_UPDATE_SEARCH_IN_AREA,
                                val:false
                            });
                            await searchCriteriaDispatch({
                                type:CONSTANTS.ACTION_UPDATE_SHOW_BTN_SEARCH_IN_AREA,
                                val:false
                            });
                            searchCriteriaDispatch({
                                type:CONSTANTS.ACTION_UPDATE_LOCATION,
                                val:{
                                    label:"Ubicación del usuario",
                                    lat: center.current.lat,
                                    lon: center.current.lon
                                }
                            });
                        }else{
                            isError.current = true;
                        }
                    } catch (error) {
                        isError.current = true;
                    }
                }
                fetchChurches();
            }
        } catch (error) {
            isError.current = true;
        }

    },[url, scheduleIdSelected, searchResultsDispatch, CONSTANTS.ACTION_UPDATE_RESULTS, CONSTANTS.ACTION_UPDATE_SHOW_BTN_SEARCH_IN_AREA, searchCriteriaDispatch, searchCriteria.searchInArea, CONSTANTS.ACTION_UPDATE_SEARCH_IN_AREA, CONSTANTS.ACTION_UPDATE_LOCATION]);
    //console.log(stLat + ", " + stLon);
    
    function handleLoad(map) {
        mapRef.current = map;
        navigator?.geolocation.getCurrentPosition(
            ({ coords: { latitude: lat, longitude: lng } }) => {
                if(lat && lng){
                    currentLocation.current = {
                        label:"Mi ubicación",
                        lat: lat,
                        lon: lng
                    }
                    center.current = currentLocation.current;
                    searchCriteriaDispatch({
                        type:CONSTANTS.ACTION_UPDATE_LOCATION,
                        val:center.current
                    });
                    searchCriteriaDispatch({
                        type:CONSTANTS.ACTION_UPDATE_SEARCH_IN_AREA,
                        val:true
                    });
                }
            }
        );
    }

    const handleMarkerClick = (poi) => {
        onSelectPoi(poi);
        console.log('click',poi);
    };

    function handleMapChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        //const newZoom = mapRef.current.getZoom();
        const newDistanceFromPrev = getDistanceFromLatLonInKm(scLat,scLon, newPos.lat, newPos.lng);
        //console.log('camera changed:', newPos, 'zoom:', newZoom, 'newDistanceFromPrev:', newDistanceFromPrev);
        center.current = {
            lat: newPos.lat,
            lon: newPos.lng
        }
        console.log(searchCriteria.showBtnSearchInArea);
        if(newDistanceFromPrev > distance && !searchCriteria.showBtnSearchInArea){//Mayor a la mitad de la distancia buscada antes? habilitar buscar en esta área
            console.log("Actualizando!")
            searchCriteriaDispatch({
                type:CONSTANTS.ACTION_UPDATE_SHOW_BTN_SEARCH_IN_AREA,
                val:true
            });
        }
    }

    function isShowDataPoi(poi){
        return poi.schedules.some(schedule => 
            Number(schedule.id) === Number(scheduleIdSelected) &&
            schedule.value.some(scheduleValue => 
                isSearchCriteriaTimeInScheduleValue(searchCriteria.time, scheduleValue)
            )
        )
    }

    if (!isLoaded) 
        return (
        <div style={{height:"100%", width: "100%", display:"flex", flexFlow:"column", justifyContent:"center", alignItems:"center", position: "absolute"}}>
            <img alt='icon-loading' src={iconChurch} style={{width:'80px'}} ></img>
            <p>Loading...</p>
        </div>
        );

    if (isError.current){
        return (
        <div style={{height:"100%", width: "100%", display:"flex", flexFlow:"column", justifyContent:"center", alignItems:"center", position: "absolute"}}>
            <img alt='icon-loading' src={error1} style={{width:'100px'}} ></img>
            <p>Ha ocurrido un problema consultando datos</p>
        </div>
        );
    }

    return (
        <>
        <GoogleMap
            center={{lat: Number(center.current.lat), lng: Number(center.current.lon)}}
            zoom={16}
            mapContainerStyle={{ width: '100%', height: '100%', position: "absolute", zindex: "0" }}
            options={{
                mapId: ENV_MAP_ID,
                disableDefaultUI: true,
                maxZoom: 18,
                minZoom: 15
            }}
            onLoad={handleLoad}
            onCenterChanged={handleMapChanged}
            onZoomChanged={handleMapChanged}
        >
            <Marker
                key={"gps"}
                position={{lat: Number(currentLocation.current.lat), lng: Number(currentLocation.current.lon)}}
                icon={
                    {
                        url:point,
                        scaledSize:  new window.google.maps.Size(30,30)
                    }
                }
            ></Marker>
        {searchResults.map((poi,index) => (

            <Marker
                key={index}
                position={{lat: Number(poi.location.lat), lng: Number(poi.location.lon)}}
                onClick={() => handleMarkerClick(poi)}
                title={poi.name}
                icon={
                    isShowDataPoi(poi)
                    ?
                        {
                        url:iconChurch,
                        scaledSize:  new window.google.maps.Size(30,30)
                        }
                    :
                    {
                        url:iconChurchDisabled,
                        scaledSize:  new window.google.maps.Size(30,30)
                    }
                }
            >
                {
                    isShowDataPoi(poi) &&

                    <InfoWindow
                        position={{lat: Number(poi.location.lat), lng: Number(poi.location.lon)}}
                        options={{ disableAutoPan: true }}
                    >
                    <div
                        className='infoWindow-content'
                        onClick={()=>handleMarkerClick(poi)}
                    >
                        
                        <div>
                            {poi.schedules.map((schedule)=>(
                                
                                (Number(schedule.id) === Number(scheduleIdSelected)) &&
                                <div
                                    key={schedule.name}
                                >
                                    {schedule.value.map((scheduleValue)=>(
                                            <div
                                                key={scheduleValue.id}
                                            >
                                                { (isSearchCriteriaTimeInScheduleValue(searchCriteria.time, scheduleValue))
                                                    ?
                                                    scheduleValue.times.map((time)=>(
                                                        <p key={scheduleValue.id+time.start}
                                                        >{time.start?formatTime24To12(time.start):''}{time.end?'-'+formatTime24To12(time.end):''}</p>
                                                    ))
                                                    
                                                    :
                                                    null
                                                }
                                                
                                            </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                    </InfoWindow>
                }
                
            
            </Marker>
        ))}
        </GoogleMap>

        {/* Imagen flotante sobre el mapa 
        <div
            className='point-center'
        >
            <img
                src={point}
                alt="o"
            />
        </div>
        */}
        </>
    );
};