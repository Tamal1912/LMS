import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'framer-motion';

const TeacherLoginSignup = () => {
  const { teacherLogin, teacherSignup } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  
  const [teacherSignupData, setTeacherSignupData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [teacherLoginData, setTeacherLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    const success = await teacherLogin(teacherLoginData);
    if (success) {
      navigate('/api/teacherDashboard');
    }
  };

  const handleTeacherSignup = async (e) => {
    e.preventDefault();
    const success = await teacherSignup(teacherSignupData);
    if (success) {
      navigate('/api/teacherDashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-gray-100 to-teal-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 rounded-3xl shadow-xl bg-white"
      >
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-l-lg font-semibold transition-all duration-300 ${
              isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-r-lg font-semibold transition-all duration-300 ${
              !isLogin ? 'bg-green-600 text-white' : 'bg-gray-200'
            }`}
          >
            Signup
          </button>
        </div>

        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {isLogin ? (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Teacher Login</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={teacherLoginData.email}
                onChange={(e) => setTeacherLoginData({ ...teacherLoginData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={teacherLoginData.password}
                onChange={(e) => setTeacherLoginData({ ...teacherLoginData, password: e.target.value })}
              />
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                onClick={handleTeacherLogin}
              >
                Login
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Teacher Signup</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={teacherSignupData.email}
                onChange={(e) => setTeacherSignupData({ ...teacherSignupData, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Username"
                className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={teacherSignupData.username}
                onChange={(e) => setTeacherSignupData({ ...teacherSignupData, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                value={teacherSignupData.password}
                onChange={(e) => setTeacherSignupData({ ...teacherSignupData, password: e.target.value })}
              />
              <button
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
                onClick={handleTeacherSignup}
              >
                Signup
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TeacherLoginSignup;
