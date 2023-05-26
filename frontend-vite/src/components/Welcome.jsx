import React, { useState, useEffect } from 'react'

function Welcome (props) {

  return (
    <div className="welcome-container module-container">
      <p className="welcome-greeting">Welcome, {props.self.name}!</p>
      <p className="welcome-date">Today's date: {props.date.toLocaleDateString()}</p>
    </div>
  )
}

export default Welcome
