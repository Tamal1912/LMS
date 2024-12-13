import React from "react";

const Attendance= () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 p-10">
      <h1 className="text-4xl font-extrabold text-green-800 mb-6">Attendance</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance Report</h2>
        <p className="text-gray-700">Total Classes Attended: 85%</p>
      </div>
    </div>
  );
};

export default Attendance;
