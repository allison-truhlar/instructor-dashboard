import React from "react"
import { useState, useEffect } from "react"
import Student from "./Student"
import getStudentProgress from "../utils/getStudentProgress"
import getStudentGrades from "../utils/getStudentGrades"

export default function StudentDataModule(props){
    const [studentData, setStudentData] = useState({})
    // const [studentGrades, setStudentGrades] = useState({})
    const [areStudentsShown, setAreStudentsShown] = useState(false)
    const [moduleTitle, setModuleTitle] = useState("")
    const [kpiText, setKpiText] = useState("")
    let studentEls = {}

    useEffect(() => {
        if (props.submissions && props.assignments && props.students) {
            if(props.type === "progress"){
                setStudentData(getStudentProgress(props.submissions, props.assignments, props.students))
                setModuleTitle("Student Progress")
                setKpiText(" students have missing assignments")
            } else if (props.type === "grades")
                setStudentData(getStudentGrades(props.submissions, props.students))
                setModuleTitle("Student Grades")
                setKpiText( " students have grade averages less than 75%")
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
            <p className="module-title">{moduleTitle}</p>
            <div className="module-kpi-container">
                <div className="module-kpi">{studentData.length}</div>
                <div>
                    <p className="module-text">{studentData.length}{kpiText}</p>
                    <button onClick={toggleStudents} className="module-text btn-students">{areStudentsShown ? "Hide" : "Show"} students...</button>
                </div>
            </div>
            {areStudentsShown && studentEls.length > 0 && studentEls}
        </div>
    )
}