

export default function LinkText({icon, onClick, children}){
    return (
        <div className="label-icon">
            <i className={icon}></i>
            <label onClick={onClick}>{children}</label>
        </div>
    );
}