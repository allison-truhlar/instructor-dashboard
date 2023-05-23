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
        const result = submissionsData
            .filter((student) => student.submissions.some((submission) => submission.missing))
            .map((student) => {
                const missingAssignments = student.submissions
                    .filter((submission) => submission.missing)
                    .map((submission) => {
                        const assignmentId = submission.assignment_id;
                        const { name } = props.assignments.find(
                            (assignmentObj) => assignmentObj.id === assignmentId
                        );
                        return name;
                    });

                return {
                    studentId: student.user_id,
                    missingAssignments,
                };
            });
            console.log(result)
        setStudentInfo(result)
    }



    function getStudentGrades() {
        
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
        setStudentInfo(result)
    }

    // function createStudentEls(){
    //     if(props.option === "studentProgress"){
    //         studentInfo.map(student => {
                

    //             }
    //         })
    //     }
    // }
    

    return (
        <h1>{studentInfo.length>0 ? studentInfo.length : "Loading"} students need attention</h1>
    )
}