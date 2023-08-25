import React from "react"
import { useState, useEffect } from "react"
import Student from "./Student"
import getStudentProgress from "../utils/getStudentProgress"
import getStudentGrades from "../utils/getStudentGrades"
import DataModuleTitle from "./DataModuleTitle"
import DataModuleKpiText from "./DataModuleKpiText"

export default function StudentDataModule(props){
    const [studentData, setStudentData] = useState({})
    const [areStudentsShown, setAreStudentsShown] = useState(false)
    let studentEls = {}

    useEffect(() => {
        if (props.submissions && props.assignments && props.students) {
            if(props.type === "progress"){
                setStudentData(getStudentProgress(props.submissions, props.assignments, props.students))
            } else if (props.type === "grades")
                setStudentData(getStudentGrades(props.submissions, props.students))
        } 
    }, [props])

    if (studentData.length>0){
        studentEls = studentData.map(student => {
            return (
                <Student
                    key = {student.studentId}
                    module = {props.type}
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
            <DataModuleTitle type = {props.type}/>
            <div className="module-kpi-container">
                <div className="module-kpi">{studentData.length}</div>
                <div>
                    <DataModuleKpiText 
                        type = {props.type}
                        number = {studentData.length}
                    />
                    <button onClick={toggleStudents} className="module-text btn-students">{areStudentsShown ? "Hide" : "Show"} students...</button>
                </div>
            </div>
            {areStudentsShown && studentEls.length > 0 && studentEls}
        </div>
    )
}