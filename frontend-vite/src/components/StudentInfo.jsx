import React, {useState, useEffect} from "react"

export default function StudentInfo(props){
    const [studentInfo, setStudentInfo] = useState({})
    const [submissionsData, setSubmissionsData] = useState({})

    useEffect(()=>{
        async function getSubmissionsData(){
            const res = 
                await fetch(`http://localhost:4001/getMultipleAssignmentSubmissions/${props.course.id}?student_ids[]=all&grouped=true&include[]=total_scores`)
            const data = await (res.json())
            setSubmissionsData(data)
        }
        getSubmissionsData()
    },[])
    

    useEffect(()=>{
        if(submissionsData.length>0){
            if(props.option === "studentProgress"){
                getStudentProgress()
            } else if (props.option === "studentGrades"){
                getStudentGrades()
            }
            
        }
        
    },[submissionsData])


    function getStudentProgress() {
        console.log(submissionsData)
        //First find students with ANY missing submissions
        const studentsWithMissingAssignments = submissionsData.filter((student) => {
            const missingAssignments = student.submissions.filter(
                (assignment) => assignment.missing === true
            );
            return missingAssignments.length > 0;
        });

        // Create an object with student details and only the assignments that are missing
        const result = studentsWithMissingAssignments.map((student) => {
            const missingAssignments = student.submissions
                .filter((assignment) => assignment.missing === true)
                .map((assignment) => assignment.assignment_id);

            return {
                student_id: student.user_id,
                missingAssignments: missingAssignments
            };
        });
        
        setStudentInfo(result)
    }

    function getStudentGrades() {
        console.log(submissionsData)
        //First find students with ANY missing submissions
        const studentsWithLowGrades = submissionsData.filter((student) => {
            return student.computed_current_score < 75
        });

        // Create an object with student details 
        const result = studentsWithLowGrades.map((student) => {

            return {
                student_id: student.user_id,
                grade: student.computed_current_score
            };
        });
        console.log(result)
        setStudentInfo(result)
    }
    

    return (
        <h1>{studentInfo.length>0 ? studentInfo.length : "Loading"} students need attention</h1>
    )
}