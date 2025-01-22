import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {BrowserRouter, createBrowserRouter,Route,RouterProvider, Routes} from "react-router-dom"
import Home from './pages/Home.jsx'
import StudentLoginSignup from "./pages/StudentLoginSignup.jsx"
import TeacherLoginSignup from './pages/TeacherLoginSignup.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import TeacherDashboard from './components/TeacherDashboard.jsx';
import Grade from './pages/Grade.jsx';
import Attendance from './pages/Attendence.jsx';
import StudentProfile from "./pages/StudentProfile.jsx"

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/api/studentLoginSignup" element={<StudentLoginSignup/>}/>
    <Route path="/api/teacherLoginSignup" element={<TeacherLoginSignup/>}/>
    <Route path='/api/teacherDashboard' element={<TeacherDashboard/>}/>
    <Route path="/api/studentDashboard" element={<StudentDashboard />}>
    </Route>
      <Route path="grades" element={<Grade />} />
      <Route path="attendence" element={<Attendance />} />
      <Route path="studentProfile" element={<StudentProfile />} />
  </Routes>
</BrowserRouter>
)
