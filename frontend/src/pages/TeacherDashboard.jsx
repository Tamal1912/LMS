import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {api} from "../lib/utils.js"


const TeacherDashboard = () => {
    const navigate=useNavigate()
  
    const handleLogout = async(e) => {
      e.preventDefault();
      try {
        const response = await api.post("/v1/users/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include'
        });
        navigate("/")
      } catch (error) {
        console.error("Error logging out:", error);
        alert("An error occurred. Please try again.");
      }
    }


  return (
    <div className="min-h-screen bg-blue-50">
    {/* Header Section */}
    <div className="flex justify-between items-center p-4 bg-blue-100 shadow-md">
      <h1 className="text-2xl font-bold text-blue-700">Teacher Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <Button 
        onClick={handleLogout}
        className="bg-red-500 text-white font-semibold hover:bg-red-400">
          Logout
        </Button>
      </div>
    </div>

    {/* Dashboard Content */}
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Students Card */}
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
          <p>Access and manage student data here.</p>
        </div>

        {/* View Tasks Card */}
        <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">View Tasks</h2>
          <p>Track and assign tasks to students.</p>
        </div>
      </div>

      {/* Right Section - Calendar Card */}
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-2">Your Schedule</h2>
        <div className="flex justify-center items-center h-40">
          <img
            src="https://img.icons8.com/ios-filled/100/ffffff/calendar.png"
            alt="Calendar Icon"
          />
        </div>
      </div>

      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <Link to="/teacherDashboard/manage_course" >
        <h2
        
        className="text-xl font-semibold mb-2 cursor-pointer">Course Manage</h2>
        </Link>
        <div className="flex justify-center items-center h-40">
         
        </div>
      </div>
    </div>
  </div>
  );
};

export default TeacherDashboard;
