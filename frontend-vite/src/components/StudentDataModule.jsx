import React from "react"
import { useState, useEffect } from "react"
import Student from "./Student"

export default function StudentDataModule(props){
    const [studentData, setStudentData] = useState({})
    const [areStudentsShown, setAreStudentsShown] = useState(false)
    let studentEls = {}

    useEffect(() => {
        if (props.submissions && props.assignments && props.students) {
            setStudentData(props.fun(props.submissions, props.assignments, props.students))
        } 
    }, [props])

    if (studentData.length>0){
        studentEls = studentData.map(student => {
            return (
                <Student
                    key = {student.studentId}
                    module = {props.moduleTitle}
                    name = {student.name}
                    email = {student.email}
                    data = {student.data}
                />
            )
        })
    }

    function toggleStudents(){
        setAreStudentsShown(!areStudentsShown)
    }
    
    return (
        <div className="module-container">
            <p className="module-title">{props.moduleTitle}</p>
            <div className="module-kpi-container">
                <div className="module-kpi">{studentData.length}</div>
                <div>
                    <p className="module-text">{studentData.length} {props.kpiText}</p>
                    <button onClick={toggleStudents} className="module-text btn-students">{areStudentsShown ? "Hide" : "Show"} students...</button>
                </div>
            </div>
            {areStudentsShown && studentEls.length > 0 && studentEls}
        </div>
    )
}