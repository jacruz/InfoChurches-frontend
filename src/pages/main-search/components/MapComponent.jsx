import { useContext, useEffect} from "react";
import { Search, SearchDispatch } from "../contexts/SearchContext.jsx";
import {APIProvider, Map, AdvancedMarker, InfoWindow} from '@vis.gl/react-google-maps';
import iconChurch from "../../../assets/img/church.png";

export default function MapComponent(){

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

    const handleClick = ((poi) => {
        console.log('marker clicked:', poi);
    });
    
    return (
        <>
        <APIProvider apiKey={"AIzaSyCmRfD3kqu3Wfof4YJdywlAy7z86G3UN1E"}>
            <Map
            style={{width: '100%', height: '100%', position: "absolute", zindex: "0"}}
            defaultCenter={{lat: Number(lat), lng: Number(lon)}}
            defaultZoom={16}
            mapId={"9e69ad9c27d923cc" || null}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onCameraChanged={ (ev) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }
            >
                {searchResults.map( (poi) => (
                    <AdvancedMarker
                        key={poi.name}
                        position={{lat: Number(poi.location.lat), lng: Number(poi.location.lon)}}
                        clickable={true}
                        onClick={()=>handleClick(poi)}
                        title={poi.name}
                    >
                        <img alt={poi.name} src={iconChurch} style={{width:"40px"}}></img>
                        <InfoWindow
                            maxWidth={200}
                            position={{lat: Number(poi.location.lat), lng: Number(poi.location.lon)}}
                            >
                            <div onClick={()=>handleClick(poi)}>{poi.name}</div>
                        </InfoWindow>
                    </AdvancedMarker>
                ))}

            </Map>
        </APIProvider>
        </>
    );
}