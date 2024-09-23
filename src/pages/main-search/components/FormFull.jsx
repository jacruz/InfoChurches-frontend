
export default function FormFull({className, onClose, children}){

    const CONSTANTS = require("../../../utils/constants/Constants.js");
    return (
        <div className={className}>
            <div className="header">
                <button 
                    className="btn-icon-1"
                    onClick={()=>{onClose(CONSTANTS.FORM_FULL_CLOSE)}}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
            {children}
        </div>
    );
}