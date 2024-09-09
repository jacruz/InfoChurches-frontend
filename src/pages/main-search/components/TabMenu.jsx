import { useState } from "react";

export default function TabMenu({
        dataTabMenu,
        idTabSelected=0,
        callbackHandleSelectedTab
    }){
    const [selectedTab, setSelectedTab] = useState(idTabSelected);

    const handleSelectedTab=(idTab)=>{
        setSelectedTab(idTab);
        callbackHandleSelectedTab(idTab);
    }
    
    return (
        <div className="tab-container">
            {dataTabMenu.map(tab=>(
                <Tab 
                    idTab={tab.id}
                    key={tab.id}
                    label={tab.label}
                    selectedTab={selectedTab}
                    onSelected={handleSelectedTab}
                ></Tab>
            ))}
        </div>
    );
}

export function Tab({
        idTab,
        label,
        selectedTab,
        onSelected
    }){
    return (
        <>
            <input type="radio" name="tab" 
                id={idTab}
                checked={selectedTab === idTab} 
                onChange={()=>{onSelected(idTab)}} 
            />
            <label htmlFor={idTab}>{label}</label>
        </>
    )
}