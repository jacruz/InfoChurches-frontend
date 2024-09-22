export default function PoiDetails({poi}){

    if(poi)
        return (
            <div className="poi-details">
                <div
                    className="img-container"
                >
                    {poi.img?<img alt="Poi" src={poi.img}/>:null}
                    <div class="distance-info">{poi.location.distance.value.toFixed(1)} km</div>
                    <div class="indications-info"><a target="_blank" rel="noreferrer" href={"https://waze.com/ul?q=" + poi.location.lat + "," + poi.location.lon + "&navigate=yes&zoom=17"}><i className="fa fa-paper-plane-o"></i></a></div>
                </div>
                <div
                    className="info-container"
                >
                    <h3>{poi.name}</h3>
                    <div 
                        className="priest-container"
                    >
                        <i className="fa fa-user-circle"></i>
                        <div className="priest-name-container">
                            <p className="priest-name">{poi.priest}</p>
                            <p className="label-1">Párroco</p>
                        </div>
                        
                    </div>

                    <div
                        className="info1-container"
                    >
                        <div className="info1-icon-info">
                            <i className="fa fa-map-marker"></i>
                            <div className="info1-icon-info-container">
                                <p> {poi.location.direction?poi.location.direction:''}</p>
                                <p>{poi.location.sector?poi.location.sector+', ':''}{poi.location.city}, {poi.location.country}</p>
                            </div>
                        </div>

                        <div className="info1-icon-info">
                            <i className="fa fa-phone"></i>
                            <div className="info1-icon-info-container">
                                <p>{poi.contact.landline_number?poi.contact.landline_number:''}</p>
                                <p>{poi.contact.mobile_number?poi.contact.mobile_number:''}</p>
                            </div>
                        </div>
                        
                        
                    </div>
                    
                    
                    <ul>
                        {poi.contact.links.map((el)=>(
                            <li
                                key={el.value}
                            >
                                <span>-{el.value}</span>
                            </li>
                        ))}
                    
                    </ul>
                </div>
            </div>
        );
}