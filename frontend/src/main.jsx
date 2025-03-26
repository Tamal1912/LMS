import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {BrowserRouter, createBrowserRouter,Route,RouterProvider, Routes} from "react-router-dom"
import Home from './pages/Home.jsx'
import StudentLoginSignup from "./pages/StudentLoginSignup.jsx"
import TeacherLoginSignup from './pages/TeacherLoginSignup.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import Grade from './pages/Grade.jsx';
import Courses from './pages/Courses.jsx';
import StudentProfile from "./pages/StudentProfile.jsx"
import ManageCoursePage from './pages/ManageCoursePage.jsx';
import CreateCoursePage from './pages/CreateCoursePage.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import UpdateCoursePage from './pages/UpdateCoursePage.jsx';
import TrackAllStudents from './pages/TrackAllStudents';
import { Toaster } from 'react-hot-toast';

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
    <Route path="/teacherDashboard/create_course" element={<CreateCoursePage/>}/>
    <Route path="/teacherDashboard/manage_course" element={<ManageCoursePage/>}/>
    <Route path="/teacherDashboard/update_course/:courseId" element={<UpdateCoursePage/>}/>
    <Route path="/courseDetails/:courseId" element={<CourseDetails/>}/>
    <Route path="/api/trackAllStudents" element={<TrackAllStudents/>}/>
    <Route path="/getStudentDetails/:studentId" element={<getStudentProfile/>}/>
    <Route path="/api/studentDashboard" element={<StudentDashboard />}>
    </Route>
      <Route path="grades" element={<Grade />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/studentDashboard/studentProfile" element={<StudentProfile />} />
  </Routes>
<Toaster/>
</BrowserRouter>
)
