module.exports = {
    TIME_FORMAT_1 : "MM/dd/yyyy h:mm aa",
    WEEKDAY_QUICK_CONFIGS: [
        {
            idDomVal:1,//En bd DOMAIN_VALUES.ID_DOMAIN
            name:'monday',//Informativo
            include_ids: [1], //Los ids que incluye, como lun-vie
            label:'lunes'
        },
        {
            idDomVal:2,
            name:'tuesday',
            include_ids: [2],
            label: 'martes'
        },
        {
            idDomVal:3,
            name:'wednesday',
            include_ids: [3],
            label: 'miercoles'
        },
        {
            idDomVal:4,
            name:'thursday',
            include_ids: [4],
            label: 'jueves'
        },
        {
            idDomVal:5,
            name:'friday',
            include_ids: [5],
            label: 'viernes'
        },
        {
            idDomVal:6,
            name:'saturday',
            include_ids: [6],
            label: 'sábado'
        },
        {
            idDomVal:7,
            name:'sunday',
            include_ids: [7],
            label: 'domingo'
        },
        {
            idDomVal:25,
            name:'mon-fri',
            include_ids: [1,2,3,4,5],
            label: 'lunes a viernes'
        },
        {
            idDomVal:26,
            name:'mon-sat',
            include_ids: [1,2,3,4,5,6],
            label: 'lunes a sábado'
        },
        {
            idDomVal:27,
            name:'tue-fri',
            include_ids: [2,3,4,5],
            label: 'martes a viernes'
        },
        {
            idDomVal:28,
            name:'tue-sat',
            include_ids: [2,3,4,5,6],
            label: 'martes a sábado'
        },
        {
            idDomVal:31,
            name:'14th',
            include_ids: [],
            label: 'catorces del mes'
        },
        {
            idDomVal:32,
            name:'mon-tue-thu-fri',
            include_ids: [1,2,4,5],
            label: 'lunes, martes, jueves y viernes'
        },
        {
            idDomVal:33,
            name:'mon-tue-thu-fri-sat',
            include_ids: [1,2,4,5,6],
            label: 'lunes, martes, jueves, viernes y sábado'
        },
        {
            idDomVal:34,
            name:'First-sat',
            include_ids: [],
            label: 'primer sábado de mes'
        },
        {
            idDomVal:35,
            name:'First-fri',
            include_ids: [],
            label: 'primer viernes de mes'
        }

    ],

    LINK_CONFIGS: [
        {
            idDomVal:13,//En bd DOMAIN_VALUES.ID_DOMAIN
            name:'web',//Informativo
            icon:'fa fa-globe',//font-awesome
            prefixLink:''//Si el link debe tener un prefijo
        },
        {
            idDomVal:14,
            name:'email',
            icon:'fas fa-envelope',
            prefixLink:'mailto:'
        },
        {
            idDomVal:15,
            name:'whatsapp',
            icon:'fab fa-whatsapp',
            prefixLink:'https://api.whatsapp.com/send?phone='
        },
        {
            idDomVal:16,
            name:'facebook',
            icon:'fab fa-facebook',
            prefixLink:''
        },
        {
            idDomVal:17,
            name:'instagram',
            icon:'fab fa-instagram',
            prefixLink:''
        },
        {
            idDomVal:18,
            name:'x',
            icon:'fab fa-twitter',
            prefixLink:''
        },
        {
            idDomVal:19,
            name:'tiktok',
            icon:'fab fa-tiktok',
            prefixLink:''
        },
        {
            idDomVal:29,
            name:'youtube',
            icon:'fab fa-youtube',
            prefixLink:''
        },
    ],

    //Location
    DEFAULT_DISTANCE_NEARBY_SEARCH : 2,

    //actions para case de reducers
    ACTION_UPDATE_SCHEDULE : "update_schedule",
    ACTION_UPDATE_LOCATION : "update_location",
    ACTION_UPDATE_TIME : "update_time",
    ACTION_UPDATE_SEARCH_IN_AREA : "update_search_in_area",
    ACTION_UPDATE_SHOW_BTN_SEARCH_IN_AREA : "update_show_btn_search_in_area",
    ACTION_UPDATE_RESULTS : "update_results",
    
    //Font awesome icons
    ICON_LOCATION : "fa fa-map-marker",
    ICON_TIME : "fa fa-calendar-alt",

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
    SEARCH_DATA_SCHEDULES : [9,10,11],

    //id_domain_value de la tabla DOMAIN_VALUES
    SCHEDULES_CONFIG : [
        {
            id:8,
            label:"Despacho"
        },
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
        {
            id:12,
            label:"Rosario"
        },
        {
            id:20,
            label:"Hora Santa"
        },
    ],
}