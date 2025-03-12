import React from "react";

const Grade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 via-green-200 to-yellow-200 p-10 flex items-center justify-center">
      <div className="bg-gradient-to-br from-green-200 to-yellow-300 shadow-xl rounded-3xl p-8 max-w-lg w-full text-center border border-green-400">
        <h1 className="text-4xl font-extrabold text-green-900 mb-6">🌿 Your Grades</h1>
        <div className="bg-gradient-to-r from-yellow-100 to-green-200 p-6 rounded-2xl shadow-lg border border-green-400">
          <h2 className="text-2xl font-bold text-green-900 mb-4">📖 Subject Grades</h2>
          <ul className="space-y-3 text-green-800 text-lg">
            <li className="p-3 bg-green-300 rounded-lg shadow-md">📘 Mathematics: <span className="font-semibold text-green-900">A</span></li>
            <li className="p-3 bg-yellow-300 rounded-lg shadow-md">🔬 Physics: <span className="font-semibold text-green-900">B+</span></li>
            <li className="p-3 bg-teal-300 rounded-lg shadow-md">🧪 Chemistry: <span className="font-semibold text-green-900">A-</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Grade;
