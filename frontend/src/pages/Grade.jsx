import React from "react";

const Grade = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-10 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border border-gray-300 transition-all duration-300 hover:shadow-[0px_0px_20px_5px_rgba(173,216,230,0.8)]">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">🎓 Your Grades</h1>
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md border border-gray-300 transition-all duration-300 hover:shadow-[0px_0px_20px_5px_rgba(186,85,211,0.8)]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 Subject Grades</h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="p-4 bg-blue-100 rounded-lg shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-[0px_0px_15px_3px_rgba(30,144,255,0.8)]">
              📘 Mathematics <span className="font-semibold text-blue-900">A</span>
            </li>
            <li className="p-4 bg-purple-100 rounded-lg shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-[0px_0px_15px_3px_rgba(147,112,219,0.8)]">
              🔬 Physics <span className="font-semibold text-purple-900">B+</span>
            </li>
            <li className="p-4 bg-pink-100 rounded-lg shadow-sm flex justify-between items-center transition-all duration-300 hover:shadow-[0px_0px_15px_3px_rgba(255,105,180,0.8)]">
              🧪 Chemistry <span className="font-semibold text-pink-900">A-</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Grade;
