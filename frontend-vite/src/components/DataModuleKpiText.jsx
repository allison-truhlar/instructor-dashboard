import React from "react"
import { useState, useEffect } from "react"

export default function DataModuleKpiText(props){
    const [kpiText, setKpiText] = useState("")

    useEffect(() => {
        if (props) {
            if(props.type === "progress"){
                setKpiText(" students have missing assignments")
            } else if (props.type === "grades"){
                setKpiText(" students have grade averages less than 75%")
            }
        }
    }, [props])

    return(
        <p className="module-text">{props.number}{kpiText}</p>
    )
    
}