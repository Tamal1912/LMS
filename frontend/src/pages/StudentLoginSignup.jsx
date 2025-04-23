import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; //  Import navigate function
import useAuthStore from "../store/useAuthStore"; //  Import Zustand store
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const StudentLoginSignup = () => {
  const { studentLogin, studentSignup } = useAuthStore(); //  Get login/signup functions from Zustand store
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); //  For page redirection

  const [studentSignupData, setStudentSignupData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  });

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    console.log(" Attempting login with:", studentLoginData);

    try {
      const success = await studentLogin(studentLoginData);
      
      if (success) {
        console.log(" login successful, redirecting...");
        navigate("/studentDashboard"); 
      } else {
        console.error(" Login failed. Invalid credentials.");
        toast.error("Incorrect email or password.");
    
      }
    } catch (error) {
      console.error(" Error during login:", error);
      toast.error("An error occurred. Please check the console for details.");
    }
  };

  const handleStudentSignup = async (e) => {
    e.preventDefault();
    try{
    const success = await studentSignup(studentSignupData);
    if (success) {
      console.log(" signup successful, redirecting...");
      navigate("/studentDashboard");
    } else {
      console.error(" signup failed. Invalid credentials.");
      toast.error("Incorrect email or password. Please try again.");
    }
  } catch (error) {
    console.error(" Error during signup:", error);
    toast.error("An error occurred. Please check the console for details.");
  }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* Floating Pastel Elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.8 }}
        className="absolute w-80 h-80 bg-pink-300/50 rounded-full blur-3xl top-16 left-24"
      ></motion.div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute w-72 h-72 bg-blue-300/60 rounded-full blur-3xl bottom-14 right-24"
      ></motion.div>

      {/* Glassmorphic Form Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/30 backdrop-blur-2xl p-12 rounded-2xl shadow-xl w-full max-w-md border border-white/40"
      >
        <h2 className="text-gray-900 text-3xl font-bold text-center mb-6">
          {isLogin ? "Student Login" : "Student Sign Up"}
        </h2>


        {/* Form Fields */}
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
                className="w-full bg-transparent text-gray-900 pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 placeholder-gray-500"
                placeholder="Full Name"
                value={studentSignupData.username}
                onChange={(e) =>
                  setStudentSignupData({ ...studentSignupData, username: e.target.value })
                }
              />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-600" />
            <input
              type="email"
              className="w-full bg-transparent text-gray-900 pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
              placeholder="Email"
              value={isLogin ? studentLoginData.email : studentSignupData.email}
              onChange={(e) =>
                isLogin
                  ? setStudentLoginData({ ...studentLoginData, email: e.target.value })
                  : setStudentSignupData({ ...studentSignupData, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-600" />
            <input
              type="password"
              className="w-full bg-transparent text-gray-900 pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
              placeholder="Password"
              value={isLogin ? studentLoginData.password : studentSignupData.password}
              onChange={(e) =>
                isLogin
                  ? setStudentLoginData({ ...studentLoginData, password: e.target.value })
                  : setStudentSignupData({ ...studentSignupData, password: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-80 transition"
            onClick={isLogin ? handleStudentLogin : handleStudentSignup} // ✅ Fixed Click Event
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </motion.div>

        {/* Toggle Between Login & Signup */}
        <p className="text-center text-gray-700 mt-5">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="text-purple-600 font-semibold cursor-pointer hover:text-pink-500 transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default StudentLoginSignup;
