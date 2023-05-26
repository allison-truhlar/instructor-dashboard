import React, { useState} from 'react'

function Course (props) {

  return (
    <div className="module-container course">
      <p>Your course:</p>
      <p>{props.course.name}</p>
    </div>
  )
}

export default Course