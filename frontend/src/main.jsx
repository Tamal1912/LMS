import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {BrowserRouter, createBrowserRouter,Route, Routes} from "react-router-dom"
import Home from './pages/Home.jsx'
import StudentLoginSignup from "./pages/StudentLoginSignup.jsx"
import TeacherLoginSignup from './pages/TeacherLoginSignup.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import PostFeed from './pages/PostFeed';
import Courses from './pages/Courses.jsx';
import StudentProfile from "./pages/StudentProfile.jsx"
import ManageCoursePage from './pages/ManageCoursePage.jsx';
import CreateCoursePage from './pages/CreateCoursePage.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import UpdatePostPage from './pages/UpdatePostPage';
import UpdateCoursePage from './pages/UpdateCoursePage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import ManagePostPage from './pages/ManagePostPage.jsx';
import TrackAllStudents from './pages/TrackAllStudents';
import TeacherProfile from './pages/TeacherProfile.jsx';
import { Toaster } from 'react-hot-toast';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAllCourses from './pages/AdminAllCourses';
import AdminAllTeachers from './pages/AdminAllTeachers';
import AdminAllPostsPage from './pages/AdminAllPostsPage';
import { api } from './lib/utils';

const token = localStorage.getItem('accessToken');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

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
    <Route path="/api/adminLogin" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} /> 
    <Route path="/adminDashboard/allCourses" element={<AdminAllCourses />} />
    <Route path="/adminDashboard/allTeachers" element={<AdminAllTeachers/>} />   
    <Route path="/adminDashboard/allCourses" element={<AdminAllCourses/>} />   
    <Route path="/adminDashboard/allPosts" element={<AdminAllPostsPage/>} />   
    <Route path="/api/studentLoginSignup" element={<StudentLoginSignup/>}/>
    <Route path="/api/teacherLoginSignup" element={<TeacherLoginSignup/>}/>
    <Route path='/api/teacherDashboard' element={<TeacherDashboard/>}/>
    <Route path="/teacherDashboard/create_course" element={<CreateCoursePage/>}/>
    <Route path="/teacherDashboard/create_post" element={<CreatePostPage/>}/>
    <Route path="/teacherDashboard/manage_post" element={<ManagePostPage/>}/>
    <Route path="/teacherDashboard/manage_course" element={<ManageCoursePage/>}/>
    <Route path="/teacherDashboard/update_post/:postId" element={<UpdatePostPage/>}/>
    <Route path="/teacherDashboard/update_course/:courseId" element={<UpdateCoursePage/>}/>
    <Route path="/courseDetails/:courseId" element={<CourseDetails/>}/>
    <Route path="/api/trackAllStudents" element={<TrackAllStudents/>}/>
    <Route path="/teacherDashboard/update_teacher_profile" element={<TeacherProfile/>}/>
    <Route path="/getStudentDetails/:studentId" element={<getStudentProfile/>}/>
    <Route path="/studentDashboard" element={<StudentDashboard />}>
    </Route>
      <Route path="/postFeed" element={<PostFeed />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/studentDashboard/studentProfile" element={<StudentProfile />} />
  </Routes>
<Toaster/>
</BrowserRouter>
)
