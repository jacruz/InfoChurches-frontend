import {formatTime24To12} from '../utils/SearchUtils.js'

export default function PoiDetails({poi}){

    const CONSTANTS = require("../../../utils/constants/Constants.js");
    
    if(poi)
        return (
            <div className="poi-details">
                <div
                    className="img-container"
                >
                    {poi.img?<img alt="poi" src={poi.img}/>:null}
                    <a 
                        className={poi.img?"distance-info ":"distance-info noImg"}
                        target="_blank"
                        rel="noreferrer" 
                        href={'http://maps.google.com?daddr=' + poi.location.lat + ',' + poi.location.lon + '&amp;ll='}
                    >
                        <div className='distance-info-div'>
                            <div className='distance-info-val'>
                                {poi.location.distance.value.toFixed(1)} km 
                                <span> De tu posición</span>
                            </div>
                            <div className='distance-info-nav'>
                                <i className="far fa-paper-plane"></i>
                            </div>
                        </div>
                        
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
                                <i className={CONSTANTS.LINK_CONFIGS.find((confLink)=>confLink.idDomVal===el.id)?CONSTANTS.LINK_CONFIGS.find((confLink)=>confLink.idDomVal===el.id).icon:'fa fa-globe'}></i>
                                <div className="info1-icon-info-container">
                                    <p><a target="_blank" rel="noreferrer" href={CONSTANTS.LINK_CONFIGS.find((confLink)=>confLink.idDomVal===el.id)?CONSTANTS.LINK_CONFIGS.find((confLink)=>confLink.idDomVal===el.id).prefixLink+el.value:el.value} >{el.value}</a></p>
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
                                                <p>{CONSTANTS.WEEKDAY_QUICK_CONFIGS.find((el)=>el.idDomVal===scheduleValue.id).label}</p>
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