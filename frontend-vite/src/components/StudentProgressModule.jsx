import React from "react"
import { useState, useEffect } from "react"
import Student from "./Student"

export default function StudentProgressModule(props){
    const [studentProgress, setStudentProgress] = useState({})
    let studentEls = {}

    useEffect(() => {
        if (props.assignments && props.submissions && props.students) {
            getStudentProgress()
        }
    }, [props])

    function getStudentProgress() {
        
        // First, filter the submissions array to keep only the students who have at least one missing assingment
        // Then use .map to transform each student with a missing assignment into an object with properties name, email, and an array of missingAssignments
            // Inside .map, use filter to retrieve the missing assignments for each student. Use map again to retrieve the corresponding assignmentName for each missing assignment by finding the matching assignment object from the assignments array using find().
            // Still inside .map, use find() to get the name and email of each student from the allStudents array, matching them based on user_id.
        // Finally, return the new student objects, with name, email, and missingAssignments for each
        const result = props.submissions
            .filter((student) => student.submissions.some((submission) => submission.missing))
            .map((student) => {
                const missingAssignments = student.submissions
                    .filter((submission) => submission.missing)
                    .map((submission) => {
                        const assignmentId = submission.assignment_id;
                        const matchingAssignment = props.assignments.find(
                            (assignmentObj) => assignmentObj.id === assignmentId
                        )
                        const assignmentName = matchingAssignment.name
                        return assignmentName;
                    })
                const { name, email } = props.students.find(
                    (studentObj) => studentObj.id === student.user_id
                );
                const missingAssignmentsNames = formatAssignmentNames(missingAssignments)

                return {
                    name,
                    email,
                    data: missingAssignmentsNames,
                    studentId: student.user_id
                };
            });
        setStudentProgress(result)
    }

    function formatAssignmentNames(arr){
        if (arr.length === 1) {
            return arr[0];
        } else if (arr.length === 2) {
            //joins all with "and" but no commas
            //example: "bob and sam"
            return arr.join(' and ');
        } else if (arr.length > 2) {
            //joins all with commas, but last one gets ", and" (oxford comma!)
            //example: "bob, joe, and sam"
            return arr.slice(0, -1).join(', ') + ', and ' + arr.slice(-1);
        }
    }

    if (studentProgress.length>0){
        studentEls = studentProgress.map(student => {
            return (
                <Student
                    key = {student.studentId}
                    module = "progress"
                    name = {student.name}
                    email = {student.email}
                    data = {student.data}
                />
            )
        })
    }
    
    return (
        <>
            <h1>{studentProgress.length > 0 ? studentProgress.length : "Loading"} students need attention</h1>
            {studentEls.length > 0 && studentEls}
        </>
    )
}