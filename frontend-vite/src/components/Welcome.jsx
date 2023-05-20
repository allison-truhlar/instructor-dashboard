import React, { useState, useEffect } from 'react'

function Welcome () {
  
  
  
  

 

  // add useEffect here for getting the course name by user
  // Note this is only returning the first course in the filtered array, even though in this case there was only one course returned. But it was being returned as an object in an array, which was causing an error.
  

//can use course.id from course to provide the courseId to other API requests

  // add useEffect for getting the number of assignments
  // useEffect(() => {
  //   fetch(`http://localhost:4001/getAssignments/${course.id}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data)
  //     })
  // }, [course])

  return (
    <>
      <p>Welcome, {name}!</p>
      <p>Today's date: {date}</p>
      <p>Your course: {course.name}</p>
    </>
  )
}

export default Welcome
