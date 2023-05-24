import React, {useState, useEffect} from "react"
import Student from "./Student"

export default function StudentInfo(props){
    const [studentInfo, setStudentInfo] = useState({})
    const [submissionsData, setSubmissionsData] = useState({})
    const [students, setStudents] = useState({})
    let studentEls = {}

    useEffect(()=>{
        const urls = [`http://localhost:4001/getMultipleAssignmentSubmissions/${props.course.id}?student_ids[]=all&grouped=true&include[]=total_scores`,`http://localhost:4001/getUsersInCourse/${props.course.id}?enrollment_type[]=student`]

        async function fetchData() {
            try {
                const responses = await Promise.all(urls.map(url => fetch(url)));
                const data = await Promise.all(responses.map(response => response.json()));
                setSubmissionsData(data[0]);
                setStudents(data[1]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
      
        fetchData();
        }, []);
    

    useEffect(()=>{
        if(submissionsData.length>0 && students.length>0){
            if(props.option === "studentProgress"){
                getStudentProgress()
            } else if (props.option === "studentGrades"){
                getStudentGrades()
            }    
        }
    },[props.option, students])


    function getStudentProgress() {
        
        // First, filter the submissions array to keep only the students who have at least one missing assingment
        // Then use .map to transform each student with a missing assignment into an object with properties name, email, and an array of missingAssignments
            // Inside .map, use filter to retrieve the missing assignments for each student. Use map again to retrieve the corresponding assignmentName for each missing assignment by finding the matching assignment object from the assignments array using find().
            // Still inside .map, use find() to get the name and email of each student from the allStudents array, matching them based on user_id.
        // Finally, return the new student objects, with name, email, and missingAssignments for each
        const result = submissionsData
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
                const { name, email } = students.find(
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
            console.log(result)
        setStudentInfo(result)
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



    function getStudentGrades() {
        
        //First find students with ANY missing submissions
        const studentsWithLowGrades = submissionsData.filter((student) => {
            return student.computed_current_score < 75
        });

        // Create an object with student details 
        const result = studentsWithLowGrades.map((student) => {
            const { name, email } = students.find(
                (studentObj) => studentObj.id === student.user_id
            );
            return {
                name,
                email,
                data: student.computed_current_score,
                studentId: student.user_id
            };
        });
        setStudentInfo(result)
    }

    if (studentInfo.length>0){
        studentEls = studentInfo.map(student => {
            return (
                <Student
                    key = {student.studentId}
                    option = {props.option}
                    name = {student.name}
                    email = {student.email}
                    data = {student.data}
                />
            )
        })
    }
    

    return (
        <>
            <h1>{studentInfo.length>0 ? studentInfo.length : "Loading"} students need attention</h1>
            {studentEls.length > 0 && studentEls}
        </>
    )
}