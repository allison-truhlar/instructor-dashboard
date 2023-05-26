import React from "react"

export default function Student(props){
    
    let displayText = ""
   
    if (props.option==="progress"){
        displayText = "Missing assignments: "
    } else if (props.option === "grades"){
        displayText = "Current grade: "
    }

    function handleClick(email){
        window.location.href = `mailto:${email}`
    }


    return(
        <div>
            <p>{props.name}</p>
            <span onClick={()=>handleClick(props.email)}>Email</span>
            <p>{displayText} {props.data}</p>
        </div>
    )
}
