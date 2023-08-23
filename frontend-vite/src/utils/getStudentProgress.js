import formatAssignmentNames from "./formatAssignmentNames";

export default function getStudentProgress(submissions, assignments, students) {
        
    // First, filter the submissions array to keep only the students who have at least one missing assingment
    // Then use .map to transform each student with a missing assignment into an object with properties name, email, and an array of missingAssignments
        // Inside .map, use filter to retrieve the missing assignments for each student. Use map again to retrieve the corresponding assignmentName for each missing assignment by finding the matching assignment object from the assignments array using find().
        // Still inside .map, use find() to get the name and email of each student from the allStudents array, matching them based on user_id.
    // Finally, return the new student objects, with name, email, and missingAssignments for each
    const result = submissions
        .filter((student) => student.submissions.some((submission) => submission.missing))
        .map((student) => {
            const missingAssignments = student.submissions
                .filter((submission) => submission.missing)
                .map((submission) => {
                    const assignmentId = submission.assignment_id;
                    const matchingAssignment = assignments.find(
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
        
    return result
}