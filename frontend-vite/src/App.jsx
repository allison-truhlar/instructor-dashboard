import React, { useState, useEffect} from 'react'
import Welcome from './components/Welcome'
import Progress from './components/Progress'
import DropdownMenu from './components/DropdownMenu'

function App () {
  const [didRender, setDidRender] = useState(false)
  const [date, setDate] = useState(()=>getDate())
  const [self, setSelf] = useState({})
  const [course, setCourse] = useState({})
  const [assignments, setAssignments] = useState({})
  const [coursePercent, setCoursePercent] = useState(0)

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
    const self = await fetch('http://localhost:4001/getSelf')
    const selfData = await self.json()
    const courses = await fetch(`http://localhost:4001/getCoursesByUser/${selfData.id}`)
    const allCoursesData = await courses.json()
    const availableCoursesData = allCoursesData.filter(obj => obj.workflow_state === "available")[0]
    const assignments = await fetch(`http://localhost:4001/getAssignments/${availableCoursesData.id}`)
    const assignmentsData = await assignments.json()
    
   //set a countDue variable = 0
    //loop through assignmentsData
      //for each assignment, if the due date is before today's date, add one to countDue
    //divide count due by assignmentsData.length
    let countDue = 0
    for (let i= 0; i < assignmentsData.length; i++){
      let currAssignment = assignmentsData[i]
      let currAssignmentDueDate = new Date(currAssignment.due_at)
      if(currAssignmentDueDate < date){
        countDue ++
      }
    }
    const percentPastDue = Math.floor( (countDue/assignmentsData.length) * 100)

    setCourse(availableCoursesData)
    setSelf(selfData)
    setAssignments(assignmentsData)
    setCoursePercent(percentPastDue)
  }
  


  return (
    <div className='App'>
      <p>Welcome, {self.name}!</p>
      <p>Today's date: {date.toLocaleDateString()}</p>
      <p>Your course: {course.name}</p>
      <Progress coursePercent = {coursePercent} />
      <DropdownMenu />
    </div>
  )
}

export default App