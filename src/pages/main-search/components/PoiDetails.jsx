import {formatTime24To12} from '../utils/SearchUtils.js'

export default function PoiDetails({poi}){

    const CONSTANTS = require("../../../utils/constants/Constants.js");
    
    if(poi)
        return (
            <div className="poi-details">
                <div
                    className="img-container"
                >
                    {poi.img?<img alt="Poi" src={poi.img}/>:null}
                    <a 
                        className="distance-info" 
                        target="_blank"
                        rel="noreferrer" 
                        href={"https://waze.com/ul?q=" + poi.location.lat + "," + poi.location.lon + "&navigate=yes&zoom=17"}
                    >
                        
                        {poi.location.distance.value.toFixed(1)} km 
                        <i className="far fa-paper-plane"></i>
                    </a>
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
                        className="contact-container"
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

                    <div
                        className="contact-container"
                    >
                        {poi.contact.links.map((el)=>(
                            <div 
                                className="info1-icon-info"
                                key={el.value}
                            >
                                <i className={CONSTANTS.LINK_CONFIGS.find((confLink)=>confLink.id_dom_val===el.id)?CONSTANTS.LINK_CONFIGS.find((confLink)=>confLink.id_dom_val===el.id).icon:null}></i>
                                <div className="info1-icon-info-container">
                                    <p><a target="_blank" rel="noreferrer" href={el.value} >{el.value}</a></p>
                                </div>
                            </div>
                        ))}
                        
                        
                    </div>
                    
                    {poi.schedules.map((schedule)=>(
                        <div
                            key={schedule.id + schedule.name}
                            className="schedule-container"
                        >
                            <h3>{CONSTANTS.SCHEDULES_CONFIG.find((el)=>el.id===schedule.id).label}</h3>
                            
                            {schedule.value.map((scheduleValue,index)=>(
                                <div
                                    key={scheduleValue.id + scheduleValue.days_of_week}
                                >
                                    <div 
                                        className="scheduleValue"
                                    >
                                        <div 
                                            className="timeline"
                                        >
                                            <div
                                                className="desc"
                                            >
                                                <p>{CONSTANTS.WEEKDAY_QUICK_CONFIGS.find((el)=>el.id_dom_val===scheduleValue.id).label}</p>
                                            </div>
                                            {scheduleValue.times.map((time)=>(
                                                <div
                                                    key={scheduleValue.id+time.start} 
                                                    className="container right"
                                                >
                                                    <div className="content">
                                                        <p>{time.start?formatTime24To12(time.start):''}{time.end?'-'+formatTime24To12(time.end):''}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {(index < schedule.value.length-1) && 
                                        <div className="division-container">
                                            <span className="division"></span>
                                        </div>
                                    }
                                    
                                </div>
                            ))}
                            
                        </div>

                    ))}

                    
                    
                    
                </div>
            </div>
        );
}