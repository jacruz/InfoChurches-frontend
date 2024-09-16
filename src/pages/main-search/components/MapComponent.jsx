import React, { useContext, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Search, SearchDispatch } from "../contexts/SearchContext.jsx";
import iconChurch from "../../../assets/img/church.png";

export default function MapComponent(){
    
    const envGmapsApiKey = process.env.REACT_APP_GMAPS_API_KEY;
    const envMapId = process.env.REACT_APP_MAP_ID;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: envGmapsApiKey, // Reemplaza con tu clave de Google Maps
    });

    const mapRef = useRef(null);
    function handleLoad(map) {
        mapRef.current = map;
    }
    
    const CONSTANTS = require("../../../utils/constants/Constants.js");
    
    const {searchCriteria, searchResults} = useContext(Search);
    const {searchResultsDispatch} = useContext(SearchDispatch);
    let lat = searchCriteria.location.lat;
    let lon = searchCriteria.location.lon;

    useEffect(()=>{
        const fetchChurches = async () => {
            const url = "http://localhost:3000/api/v1/churches/nearby-search?lat="+lat+"&lon="+lon+"&distance=2";
            const res = await fetch(url, {
                'mode': 'cors'
            });
            const data = await res.json();
            console.log(data);
            await searchResultsDispatch({
                type:CONSTANTS.ACTION_UPDATE_RESULTS,
                val:data
            });
        }
        fetchChurches();
    },[lat, lon, searchResultsDispatch, CONSTANTS.ACTION_UPDATE_RESULTS]);
    console.log(lat + ", " + lon);

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
        <div style={{height:"100%", display:"flex", flexFlow:"row-nowrap", justifyContent:"center", alignItems:"center"}}>
            Loading...
        </div>
        );

    return (
        <>
        <GoogleMap
        center={{lat: Number(lat), lng: Number(lon)}}
        zoom={16}
        mapContainerStyle={{ width: '100%', height: '100%', position: "absolute", zindex: "0" }}
        options={{
            mapId: envMapId,
            disableDefaultUI: true,
            maxZoom: 18,
            minZoom: 14
        }}
        onLoad={handleLoad}
        onCenterChanged={handleMapChanged}
        onZoomChanged={handleMapChanged}
        >
        {searchResults.map((poi, index) => (
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
                options={{ disableAutoPan: true }} // Evitar que el mapa se recoloque automáticamente
                >
                <div
                className='infoWindow-content'
                onClick={()=>handleMarkerClick(poi)}
                >
                    <span>{poi.name}</span  >
                </div>
                </InfoWindow>
            </Marker>
        ))}
        </GoogleMap>
        </>
    );
};