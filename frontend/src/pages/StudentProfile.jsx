///api/studentDashboard/studentProfile
import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-purple-200 p-10">
      <h1 className="text-4xl font-extrabold text-purple-800 mb-6">Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
        <p className="text-gray-700">Name: John Doe</p>
        <p className="text-gray-700">Email: johndoe@example.com</p>
        <p className="text-gray-700">Student ID: 123456</p>
      </div>
    </div>
  );
};

export default Profile;
