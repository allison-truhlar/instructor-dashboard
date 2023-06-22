import React, { useState} from 'react'

function Course (props) {

  return (
    <div className="module-container">
      <p className="course-title">Your course:</p>
      <p className="course-title">{props.course.name}</p>
    </div>
  )
}

export default Course