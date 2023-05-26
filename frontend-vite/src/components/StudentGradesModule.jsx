import React from "react"
import { useState, useEffect } from "react"
import Student from "./Student"

export default function StudentGradesModule(props){
    const [studentGrades, setStudentGrades] = useState({})
    let studentEls = {}

    useEffect(() => {
        if (props.assignments && props.submissions && props.students) {
            getStudentGrades()
        }
    }, [props])

    function getStudentGrades() {
        
        //First find students with ANY missing submissions
        const studentsWithLowGrades = props.submissions.filter((student) => {
            return student.computed_current_score < 75
        });

        // Create an object with student details 
        const result = studentsWithLowGrades.map((student) => {
            const { name, email } = props.students.find(
                (studentObj) => studentObj.id === student.user_id
            );
            return {
                name,
                email,
                data: student.computed_current_score,
                studentId: student.user_id
            };
        });
        setStudentGrades(result)
    }

    if (studentGrades.length>0){
        studentEls = studentGrades.map(student => {
            return (
                <Student
                    key = {student.studentId}
                    module = "grades"
                    name = {student.name}
                    email = {student.email}
                    data = {student.data}
                />
            )
        })
    }
    
    return (
        <>
            <h1>{studentGrades.length > 0 ? studentGrades.length : "Loading"} students need attention</h1>
            {studentEls.length > 0 && studentEls}
        </>
    )
}