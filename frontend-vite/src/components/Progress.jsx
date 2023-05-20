import React from "react"

export default function Progress(props){


    return (
        <div className="progress-bar">
            <div 
                className="progress-bar--percent"
                style = {{width: `${props.coursePercent}%`}}
            >
                <span>{`${props.coursePercent}%`}</span>
            </div>
        </div>
    )
}