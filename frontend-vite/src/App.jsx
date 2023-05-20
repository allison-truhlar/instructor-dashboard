import React, { useState, useEffect} from 'react'
import Welcome from './components/Welcome'
import Discussion from './components/Discussion'
import './App.css'

function App () {
  const [didRender, setDidRender] = useState(false)
  const [date, setDate] = useState("")
  const [self, setSelf] = useState({})
  const [course, setCourse] = useState({})
  const [assignments, setAssignments] = useState({})

 // useEffects to run once - at first load
 useEffect(() => {

  if (didRender === false){

    getDate()
    getCanvasData()
    
    return () => {
      setDidRender(true)
    }
  }

}, [])

function getDate(){
  const today = new Date().toLocaleDateString()
  setDate(today)
}

async function getCanvasData() {
    const self = await fetch('http://localhost:4001/getSelf')
    const selfData = await self.json()
    const courses = await fetch(`http://localhost:4001/getCoursesByUser/${selfData.id}`)
    const allCoursesData = await courses.json()
    const availableCoursesData = allCoursesData.filter(obj => obj.workflow_state === "available")[0]
    const assignments = await fetch(`http://localhost:4001/getAssignments/${availableCoursesData.id}`)
    const assignmentsData = await assignments.json()
    console.log(assignmentsData)
    setCourse(availableCoursesData)
    setSelf(selfData)
    setAssignments(assignmentsData)
    console.log("self set")
  }
  


  return (
    <div className='App'>
      <p>Welcome, {self.name}!</p>
      <p>Today's date: {date}</p>
      <p>Your course: {course.name}</p>
      <Discussion />
    </div>
  )
}

export default App