import React from "react";

const Grade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-10">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-6">Grades</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Grades</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Mathematics: A</li>
          <li>Physics: B+</li>
          <li>Chemistry: A-</li>
        </ul>
      </div>
    </div>
  );
};

export default Grade;
