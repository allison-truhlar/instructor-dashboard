const express = require('express')
const app = express()
const cors = require('cors')
const port = 4001
const canvasAPI = require('node-canvas-api')

app.use(cors())

// Make endpoint for getSelf here
app.get('/getSelf', async (req, res) => {
  // we need to now make a call to the Canvas API,
  // wait for the response, then send the result to the frontend
  const self = await canvasAPI.getSelf()
  res.json(self)
})

// Make endpoint for getCoursesByUser here
app.get('/getCoursesByUser/:id', async (req, res) => {
  // we need to now make a call to the Canvas API,
  // wait for the response, then send the result to the frontend
  const userId = req.params.id
  const courses = await canvasAPI.getCoursesByUser(userId)
  res.json(courses)
})

// Endpoint - assignments
app.get('/getAssignments/:id', async (req, res) => {
  // we need to now make a call to the Canvas API,
  // wait for the response, then send the result to the frontend
  const courseId = req.params.id
  const assignments = await canvasAPI.getAssignments(courseId)
  res.json(assignments)
})

// Endpoint - bulk user progress
app.get('/getMultipleAssignmentSubmissions/:id', async (req, res) => {
  //NOTE - requires an option of ?student_ids[]=all
  const courseId = req.params.id
  const options = req.query
  const multipleAssignmentSubmissions = await canvasAPI.getMultipleAssignmentSubmissions(courseId, options)
  res.json(multipleAssignmentSubmissions)
})

// Endpoint- getUsers 
app.get('/getUsersInCourse/:id', async (req, res) => {
  // we need to now make a call to the Canvas API,
  // wait for the response, then send the result to the frontend
  const courseId = req.params.id
  const options = req.query
  const users = await canvasAPI.getUsersInCourse(courseId, options)
  res.json(users)
})

  // Endpoint - getCourse 
app.get('/getCourse', async (req, res) => {
  // we need to now make a call to the Canvas API,
  // wait for the response, then send the result to the frontend
  const course = await canvasAPI.getCourse(6880352)
  res.json(course)
})
