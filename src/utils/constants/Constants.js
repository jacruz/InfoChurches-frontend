module.exports = {
    TIME_FORMAT_1 : "MM/dd/yyyy h:mm aa",
    WEEKDAY_QUICK_CONFIGS: [
        {
            id_dom_val:1,//En bd DOMAIN_VALUES.ID_DOMAIN
            name:'monday',//Informativo
            include_ids: [1] //Los ids que incluye, como lun-vie
        },
        {
            id_dom_val:2,
            name:'tuesday',
            include_ids: [2]
        },
        {
            id_dom_val:3,
            name:'wednesday',
            include_ids: [3]
        },
        {
            id_dom_val:4,
            name:'thursday',
            include_ids: [4]
        },
        {
            id_dom_val:5,
            name:'friday',
            include_ids: [5]
        },
        {
            id_dom_val:6,
            name:'saturday',
            include_ids: [6]
        },
        {
            id_dom_val:7,
            name:'sunday',
            include_ids: [7]
        },
        {
            id_dom_val:25,
            name:'mon-fri',
            include_ids: [1,2,3,4,5]
        },
        {
            id_dom_val:26,
            name:'mon-sat',
            include_ids: [1,2,3,4,5,6]
        },
        {
            id_dom_val:27,
            name:'tue-fri',
            include_ids: [2,3,4,5]
        },
        {
            id_dom_val:28,
            name:'tue-sat',
            include_ids: [2,3,4,5,6]
        },
        {
            id_dom_val:31,
            name:'14th',
            include_ids: []
        },
        {
            id_dom_val:32,
            name:'mon-tue-thu-fri',
            include_ids: [1,2,4,5]
        },
        {
            id_dom_val:33,
            name:'mon-tue-thu-fri-sat',
            include_ids: [1,2,4,5,6]
        },
        {
            id_dom_val:34,
            name:'First-sat',
            include_ids: []
        },
        {
            id_dom_val:35,
            name:'First-fri',
            include_ids: []
        }

    ],

    //Location
    DEFAULT_DISTANCE_NEARBY_SEARCH : 4,

    //actions para case de reducers
    ACTION_UPDATE_SCHEDULE : "update_schedule",
    ACTION_UPDATE_LOCATION : "update_location",
    ACTION_UPDATE_TIME : "update_time",
    ACTION_UPDATE_RESULTS : "update_results",
    
    //Font awesome icons
    ICON_LOCATION : "fa fa-map-marker",
    ICON_TIME : "fa fa-calendar-o",

    //Comportamiento de sub-ventana full (FormFull)
    FORM_FULL_NO_SHOW : "0",
    FORM_FULL_CLOSE : "1",
    FORM_FULL_SHOW_LOCATION : "2",
    FORM_FULL_SHOW_TIME : "3",
    FORM_FULL_SHOW_POI : "4",

    //Botones rápidos pre-configurados para el input de horario
    TIME_QUICK_INPUTS : [
        {
            id:0,
            label:"Desde ahora"
        },
        {
            id:1,
            label:"Mañana"
        },
        {
            id:2,
            label:"Desde hace una hora"
        },
        {
            id:3,
            label:"Hoy (todo el día)"
        }
    ],
    //Filtro de tipo de schedule (Los id son los de la col id_domain_value de la tabla DOMAIN_VALUES)
    SEARCH_DATA_SCHEDULES : [
        {
            id:9,
            label:"Eucaristías"
        },
        {
            id:10,
            label:"Confesiones"
        },
        {
            id:11,
            label:"Adoración"
        },
    ],
}