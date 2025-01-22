import React from "react";
import { useState,useEffect} from "react";
import { Outlet, useNavigate } from "react-router";
import StudentSidebar from "./StudentSidebar";

const StudentDashboard = () => {
  const [userName, setUserName] = useState(""); 
  

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-blue-100">
      
      <StudentSidebar/>
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800">Student Dashboard</h1>
          <div className="flex items-center space-x-6">
            {/* Profile */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">N</span>
              </div>
              <p className="text-gray-800 font-medium mt-2">{userName}</p>
            </div>
            {/* Calendar */}
            <div className="bg-white shadow-lg p-4 rounded-lg flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-blue-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5m7.5-1.5v1.5M3.75 9h16.5m-16.5 0v10.5a2.25 2.25 0 002.25 2.25h12.75a2.25 2.25 0 002.25-2.25V9m-16.5 0v-1.5a2.25 2.25 0 012.25-2.25h12.75a2.25 2.25 0 012.25 2.25V9"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Dashboard Items */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Section */}
          <div className="col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <div className="text-center font-bold">Subject 1</div>
            <div className="text-center font-bold">Subject 2</div>
            <div className="text-center font-bold">Subject 3</div>
          </div>

          {/* Student Grade Report */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Student Grade Report</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Mathematics: A</li>
              <li>Physics: B+</li>
              <li>Chemistry: A-</li>
            </ul>
          </div>

          {/* CGPA Section */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold">CGPA</h2>
            <p className="text-5xl font-extrabold mt-4">8.85</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
