import React from "react"

export default function Student(props){
    
    let displayText = ""
   
    if (props.module==="progress"){
        displayText = "Missing assignments: "
    } else if (props.module === "grades"){
        displayText = "Current grade: "
    }

    return(
        <div className="student-container">
            <div className="student-contact-container">
                <p className="module-text">{props.name}</p>
                <a href={`mailto:${props.email}`} className="module-text">Email</a>
            </div>
            <p className="module-text"><span className="bold-text">{displayText}</span> {props.data}</p>
        </div>
    )
}
