import React, { useState, useEffect} from 'react'
import Welcome from './components/Welcome'
import CourseProgress from './components/CourseProgress'
import StudentDataModule from './components/StudentDataModule'
import Loading from "./components/Loading"
import Course from "./components/Course"
import getStudentProgress from "./utils/getStudentProgress"
import getStudentGrades from "./utils/getStudentGrades"


function App () {
  const [didRender, setDidRender] = useState(false)
  const [date, setDate] = useState(()=>getDate())
  const [self, setSelf] = useState({})
  const [course, setCourse] = useState({})
  const [assignments, setAssignments] = useState(null)
  const [submissions, setSubmissionsData] = useState(null)
  const [students, setStudents] = useState({})
  const [isLoading, setIsLoading] = useState(false)

 // useEffects to run once - at first load
 useEffect(() => {
  if (didRender === false){
    getCanvasData()
    return () => {
      setDidRender(true)
    }
  }
}, [])

function getDate(){
  return new Date()
}

async function getCanvasData() {
  setIsLoading(true) //loading during API calls

  const selfData = await fetch('http://localhost:4001/getSelf')
    .then((response) => response.json())

  const allCoursesData = await fetch(`http://localhost:4001/getCoursesByUser/${selfData.id}`)
    .then((response) => response.json())
  const availableCoursesData = allCoursesData.filter(obj => obj.workflow_state === "available")[0]

  const assignmentsData = await fetch(`http://localhost:4001/getAssignments/${availableCoursesData.id}`)
    .then((response) => response.json())

  const submissionsData = await fetch(`http://localhost:4001/getMultipleAssignmentSubmissions/${availableCoursesData.id}?student_ids[]=all&grouped=true&include[]=total_scores`)
    .then((response) => response.json())

  const studentsData = await fetch(`http://localhost:4001/getUsersInCourse/${availableCoursesData.id}?enrollment_type[]=student`)
    .then((response) => response.json())

  setCourse(availableCoursesData)
  setSelf(selfData)
  setAssignments(assignmentsData)
  setSubmissionsData(submissionsData);
  setStudents(studentsData);

  setIsLoading(false) //no longer loading
}

 return (
    <div className='app'>
      <div className='all-modules-container'>

        {isLoading ? <Loading /> :
          <>
            <div className="header-modules-container">
              <Welcome
                self={self}
                date={date}
              />

              <Course
                course={course}
              />
            </div>

            <div className="data-modules-container">
              <CourseProgress
                assignments={assignments}
                date={date}
              />

              <StudentDataModule
                moduleTitle="Student Progress"
                kpiText = "students have missing assignments"
                assignments={assignments}
                submissions={submissions}
                students={students}
                fun={getStudentProgress}
              />

              <StudentDataModule
                moduleTitle="Student Grades"
                kpiText = "students have grade averages less than 75%"
                assignments={assignments}
                submissions={submissions}
                students={students}
                fun={getStudentGrades}
              />
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default App