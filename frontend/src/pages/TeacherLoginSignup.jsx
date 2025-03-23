import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

const TeacherLoginSignup = () => {
  const { teacherLogin, teacherSignup } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [teacherSignupData, setTeacherSignupData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  });

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    const success = await teacherLogin(teacherLoginData);
    if (success) {
      navigate("/api/teacherDashboard");
    }
  };

  const handleTeacherSignup = async (e) => {
    e.preventDefault();
    const success = await teacherSignup(teacherSignupData);
    if (success) {
      navigate("/api/teacherDashboard");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F2F5F9] via-[#B4D4FF] to-[#FFD6A5] relative overflow-hidden">
      {/* Floating Pastel Elements */}
      <div className="absolute w-80 h-80 bg-[#E5CFF7]/50 rounded-full blur-3xl top-16 left-24"></div>
      <div className="absolute w-72 h-72 bg-[#F8FDCB]/60 rounded-full blur-3xl bottom-14 right-24"></div>

      {/* Glassmorphic Form Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/30 backdrop-blur-2xl p-12 rounded-2xl shadow-xl w-full max-w-md border border-white/40"
      >
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-6">
          {isLogin ? "Teacher Login" : "Teacher Sign Up"}
        </h2>


        {/* Animated Form Fields */}
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-gray-600" />
              <input
                type="text"
                className="w-full bg-transparent text-gray-900 pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E5CFF7] placeholder-gray-500"
                placeholder="Full Name"
                value={teacherSignupData.username}
                onChange={(e) =>
                  setTeacherSignupData({ ...teacherSignupData, username: e.target.value })
                }
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-600" />
            <input
              type="email"
              className="w-full bg-transparent text-gray-900 pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#B4D4FF] placeholder-gray-500"
              placeholder="Email"
              value={isLogin ? teacherLoginData.email : teacherSignupData.email}
              onChange={(e) =>
                isLogin
                  ? setTeacherLoginData({ ...teacherLoginData, email: e.target.value })
                  : setTeacherSignupData({ ...teacherSignupData, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-600" />
            <input
              type="password"
              className="w-full bg-transparent text-gray-900 pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FFD6A5] placeholder-gray-500"
              placeholder="Password"
              value={isLogin ? teacherLoginData.password : teacherSignupData.password}
              onChange={(e) =>
                isLogin
                  ? setTeacherLoginData({ ...teacherLoginData, password: e.target.value })
                  : setTeacherSignupData({ ...teacherSignupData, password: e.target.value })
              }
            />
          </div>

          {/* Beautiful Pastel Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-[#A084E8] to-[#FF9A8C] text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition transform hover:scale-105"
            onClick={isLogin ? handleTeacherLogin : handleTeacherSignup}
          >
            {isLogin ? "Login" : "Create Account"}
          </motion.button>
        </motion.div>

        {/* Switch Between Login & Signup */}
        <p className="text-center text-gray-700 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="text-[#A084E8] font-semibold cursor-pointer hover:text-[#FF9A8C] transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default TeacherLoginSignup;
 
