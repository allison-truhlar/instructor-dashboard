## Course Instructor Dashboard

This app allows an instructor to connect to the course they are currently teaching on the [Canvas Learning Management System ](https://www.instructure.com/canvas) via the [Canvas API](https://canvas.instructure.com/doc/api/) and view information about how far along the course currently is and what students need attention due to missing assignments or a low grade average. The user can access the student emails from the app. 

I was inspired to create this app based on my own experience as a an instructor for a large (~300 student) online class over nine semesters. It was difficult to easily visualize which students needed extra help and then directly contact them.

**Problem Statement:** As a lecturer for a large online class, I need to be able to assess my students’ overall learning progress quickly and identify any students with whom I need to check in. 

**Product Solution:** A student learning dashboard that shows me key student learning metrics at a glance.

**Use Cases:**
1. Visualize overall student progress relative to the week in the syllabus
1. Identify students who are missing assignments
1. Identify students with a low grade average
1. Open an email to a student I need to check in with

## Table of Contents
1. [Getting Started](#%EF%B8%8F-getting-started)
1. [Code Overview](#-code-overview)
1. [Acknoledgements](#acknowledgements-)

## ⚙️ Getting Started
These instructions will get you a copy of the project up and running on your local machine for use with your own Canvas API tokens.

### Prerequisites
1. **Install [Node 12.0.0 or greater](https://nodejs.org)**.
1. **Install [Git](https://git-scm.com/downloads)**.

### Installation and setup
1. Fork this repo.
1. Copy clone link.
1. Open a terminal and clone the repo. `git clone {paste URL you copied}`
1. Navigate into repo. `cd instructor-dashboard`

#### Backend
1. Navigate into `backend` repo. `cd backend`
1. Install required dependencies. `npm install`
1. Start server. `npm start`

#### Frontend
1. Navigate into `frontend-vite` repo. `cd frontend-vite`
1. Install required dependencies. `npm install`
1. Start frontend application. `npm run dev`
1. You should see the app at http://localhost:5173/

## 💾 Code Overview
### Dependencies
#### Backend
* [nodejs](https://nodejs.org/en/) - JavaScript runtime.
* [expressjs](https://expressjs.com/) - A framework for building our server's API endpoints.
* [cors](https://expressjs.com/en/resources/middleware/cors.html) - A middleware to enable [Cross-Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
* [node-canvas-api](https://github.com/ubccapico/node-canvas-api) - Easy way to make calls to Canvas API using JavaScript.

#### Frontend
* [reactjs](https://reactjs.org/) - JavaScript library for building user interfaces.

## Acknowledgements ✨

The starting point for this project was a fork of [this repo](https://github.com/UBC-LA-Hackathon/student-dashboard). This was my first time writing any kind of backend code - I am extremely grateful for the well-written tutorial and the starting point of the Canvas API node modules.
