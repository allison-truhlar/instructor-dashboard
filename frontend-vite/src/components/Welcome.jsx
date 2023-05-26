import React, { useState, useEffect } from 'react'

function Welcome () {
  

  return (
    <>
      <p>Welcome, {name}!</p>
      <p>Today's date: {date}</p>
      <p>Your course: {course.name}</p>
    </>
  )
}

export default Welcome
