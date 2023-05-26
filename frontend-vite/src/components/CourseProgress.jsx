import React from "react"
import { useState, useEffect } from "react"

export default function CourseProgress(props){
    const [coursePercent, setCoursePercent] = useState(0)
    const [isProgressLoading, setIsProgressLoading] = useState(true)

    //set a countDue variable = 0
    //loop through assignmentsData
      //for each assignment, if the due date is before today's date, add one to countDue
    //divide count due by assignmentsData.length
    useEffect(()=>{
        if (props.assignments){
            let countDue = 0
            for (let i= 0; i < props.assignments.length; i++){
              let currAssignment = props.assignments[i]
              let currAssignmentDueDate = new Date(currAssignment.due_at)
              if(currAssignmentDueDate < props.date){
                countDue ++
              }
            }
            const percentPastDue = Math.floor( (countDue/props.assignments.length) * 100)
            setCoursePercent(percentPastDue)
        }
    },[props.assignments])
    
    return (
        <div className="module-container">
            <p className="module-title">Course progress</p>
            <div className="progress-bar">
                <div
                    className="progress-bar--percent"
                    style={{ width: `${coursePercent}%` }}
                >
                    <span>{`${coursePercent}%`}</span>
                </div>
            </div>
            <p className="module-text">{coursePercent}% of assignment due dates have passed</p>
        </div>
        
            
    )
}

// {isProgressLoading ? 
//     <p>Loading</p>: 