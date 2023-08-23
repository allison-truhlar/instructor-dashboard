export default function getStudentGrades(submissions, students) {
    //First find students with ANY missing submissions
    const studentsWithLowGrades = submissions.filter((student) => {
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

    return result
}