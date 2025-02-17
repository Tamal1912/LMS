import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import useAuthStore from '../store/useAuthStore'

const TeacherLoginSignup = () => {
  
  const { teacherLogin, teacherSignup, loading } = useAuthStore()

  const[teacherSignupData,setTeacherSignupData]=useState({
    email:'',
    username:'',
    password:'',
  })

  const [teacherLoginData,setTeacherLoginData]=useState({
    email:'',
    password:'',
  })

  const navigate=useNavigate()

  const handleTeacherLogin=async(e)=>{
    e.preventDefault();
    const success = await teacherLogin(teacherLoginData);
    if (success) {
      navigate("/api/teacherDashboard");
    }
  }


  const handleTeacherSignup=async(e)=>{
    e.preventDefault();
    const success = await teacherSignup(teacherSignupData);
    if (success) {
      navigate("/api/teacherDashboard");
    }
  }
  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tl from-sky-400  to-slate-400 ">

<div className="w-full max-w-5xl p-6 rounded-3xl shadow-xl flex items-center space-x-10 bg-gray-200 ">


  <div className="login-card bg-white w-1/2 p-10 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Teacher Login</h2>
    <label className="flex items-center mb-4 border border-gray-300 p-2 rounded-lg">
      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
      </svg>
      <input
       type="email"
       placeholder="Teacher Email"
       className="w-full outline-none text-gray-700"
       value={teacherLoginData.email}
          onChange={(e)=>setTeacherLoginData({...teacherLoginData,email:e.target.value})}
       />
    </label>
    <label className="flex items-center mb-6 border border-gray-300 p-2 rounded-lg">
      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
      <input
       type="password"
       placeholder="Teacher Password"
       className="w-full outline-none text-gray-700"
       value={teacherLoginData.password}
       onChange={(e)=>setTeacherLoginData({...teacherLoginData,password:e.target.value})}
       />
    </label>
    <button className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-slate-400 transition duration-300 font-semibold" onClick={handleTeacherLogin}>Login</button>
  </div>

  <div className="signup-card bg-white w-1/2 p-10 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Teacher Signup</h2>
    <label className="flex items-center mb-4 border border-gray-300 p-2 rounded-lg">
      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
      </svg>
      <input
       type="email"
       placeholder="Teacher  Email"
       className="w-full outline-none text-gray-700"
       value={teacherSignup.email}
       onChange={(e)=>{setTeacherSignup({...teacherSignup,email:e.target.value})}}
       />
    </label>
    <label className="flex items-center mb-4 border border-gray-300 p-2 rounded-lg">
      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
      </svg>
      <input
       type="text"
       placeholder="Teacher  Username"
       className="w-full outline-none text-gray-700"
       value={teacherSignup.username}
       onChange={(e)=>{setTeacherSignup({...teacherSignup,username:e.target.value})}}
       />
    </label>
    <label className="flex items-center mb-6 border border-gray-300 p-2 rounded-lg">
      <svg className="w-5 h-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
      </svg>
      <input 
      type="password"
      placeholder="Teacher Password"
      className="w-full outline-none text-gray-700"
      value={teacherSignup.password}
      onChange={(e)=>{setTeacherSignup({...teacherSignup,password:e.target.value})}}
      />

    </label>
    <button className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-black transition duration-300 font-semibold"onClick={handleTeacherSignup} >Signup</button>
  </div>
</div>
</div>
    </>
  )
}

export default TeacherLoginSignup