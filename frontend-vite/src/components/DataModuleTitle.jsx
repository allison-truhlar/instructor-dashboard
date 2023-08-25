import React from "react"
import { useState, useEffect } from "react"

export default function DataModuleTitle(props){
    const [moduleTitle, setModuleTitle] = useState("")

    useEffect(() => {
        if (props) {
            if(props.type === "progress"){
                setModuleTitle("Student Progress")
            } else if (props.type === "grades"){
                setModuleTitle("Student Grades")
            } 
        }
    }, [props])

    return(
        <p className="module-title">{moduleTitle}</p>
    )
    
}