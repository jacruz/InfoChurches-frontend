module.exports = {
    TIME_FORMAT_1 : "MM/dd/yyyy h:mm aa",
    WEEKDAY : ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],

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
    //Filtro de tipo de schedule
    BOX_SEARCH_DATA_TAB_MENU : [
        {
            id:0,
            label:"Eucaristías"
        },
        {
            id:1,
            label:"Confesiones"
        },
        {
            id:2,
            label:"Santísimo"
        },
    ],
}