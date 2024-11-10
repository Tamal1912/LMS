import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './components/Landing Page/Home.jsx'
import StudentLoginSignup from './components/authPages/StudentLoginSignup.jsx'
import TeacherLoginSignup from './components/authPages/TeacherLoginSignup.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/api/studentSignup",
    element:<StudentLoginSignup/>
  },
  {
    path:"/api/teacherLoginSignup",
    element:<TeacherLoginSignup/>
  },
  {
    path:"/api/studentLoginSignup",
    element:<StudentLoginSignup/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
