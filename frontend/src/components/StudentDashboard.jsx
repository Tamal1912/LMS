import React from "react";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router";

const StudentDashboard = () => {
  const [userName, setUserName] = useState(""); 
  const navigate=useNavigate()

 const handleLogout=async(e)=>{
  e.preventDefault();
  try {
    
    const response = await fetch(" http://localhost:4000/api/v1/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json(); 
    if (response.ok) {
      
       // Redirect to success page
      navigate("/")
    } else {
      alert(result.message); // Show error message
    }
  } catch (error) {
    console.error("Error signing up:", error);a
    alert("An error occurred. Please try again.");
  }
 }

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     try {
  //       // Replace this with your actual API call
  //       const response = await fetch("http://localhost:4000/api/v1/users/student");
  //       const data = await response.json();
  //       setUserName(data.username);
  //     } catch (error) {
  //       console.error("Error fetching user name:", error);
  //       setUserName("John Doe"); // Fallback name
  //     }
  //   };

  //   fetchUserName();
  // }, []);
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-6">
        {/* Logo */}
        <div className="bg-blue-500 w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl font-bold shadow-lg">
          L
        </div>
        {/* Sidebar Items */}
        <nav className="flex flex-col space-y-6 text-center w-full">
          <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
            <span className="font-semibold">
            <button onClick={()=>navigate("/api/studentDashboard")}>
              Dashboard
              </button>
            </span>
          </div>
          <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
            <span className="font-semibold">
              <button onClick={()=>navigate("/api/studentDashboard/grades")}>
              Grades
              </button>
              </span>
          </div>
          <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
            <span className="font-semibold">
              <button onClick={()=>navigate("/api/studentDashboard/attendence")}>
              Attendance
              </button>
              </span>
          </div>
          <div className="hover:bg-blue-500 p-4 rounded-lg cursor-pointer transition">
            <span className="font-semibold">
              
              <button onClick={()=>navigate("/api/studentDashboard/studentProfile")}>
              Profile
              </button>

              
              </span>
          </div>
        </nav>
        {/* Logout */}
        <div className="mt-auto">
          <button
          onClick={handleLogout}
           className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m3-3h-12m6 6l6-6m-6-6l6 6"
              />
            </svg>
          </button>
        </div>
      </aside>

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
