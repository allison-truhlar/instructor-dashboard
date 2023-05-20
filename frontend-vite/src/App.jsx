import React, { useState, useEffect} from 'react'
import Welcome from './components/Welcome'
import Discussion from './components/Discussion'
import './App.css'

function App () {
  const [didRender, setDidRender] = useState(false)
  const [date, setDate] = useState("")
  const [self, setSelf] = useState({})
  const [course, setCourse] = useState({})

 // useEffects to run once - at first load
 useEffect(() => {

  if (didRender === false){

    getDate()
    getSelfAndCourses()
    
    return () => {
      setDidRender(true)
    }
  }

}, [])

function getDate(){
  const today = new Date().toLocaleDateString()
  setDate(today)
}

  async function getSelfAndCourses() {
    const self = await fetch('http://localhost:4001/getSelf')
    const selfData = await self.json()
    const courses = await fetch(`http://localhost:4001/getCoursesByUser/${selfData.id}`)
    const coursesData = await courses.json()
    setCourse(coursesData.filter(obj => obj.workflow_state === "available")[0])
    setSelf(selfData)
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