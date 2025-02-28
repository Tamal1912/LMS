import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { motion } from "framer-motion"; // অ্যানিমেশনের জন্য

const StudentLoginSignup = () => {
  const { studentLogin, studentSignup, loading } = useAuthStore();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // লগইন & সাইনআপ পরিবর্তনের জন্য

  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const success = await studentSignup(signupData);
    if (success) {
      navigate("/api/studentDashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await studentLogin(loginData);
    if (success) {
      navigate("/api/studentDashboard");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-gray-100 to-teal-200 px-4">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-8 rounded-3xl shadow-2xl bg-white border border-gray-300">
          {/* টগল বাটন (লগইন & সাইনআপ পরিবর্তনের জন্য) */}
          <div className="text-center mb-6 flex justify-center">
            <button
              className={`px-6 py-2 text-sm sm:text-base md:text-lg rounded-l-lg transition-all ${
                isLogin ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 text-sm sm:text-base md:text-lg rounded-r-lg transition-all ${
                !isLogin
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          {/* ফর্ম অ্যানিমেশন */}
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
            transition={{ duration: 0.5 }}
          >
            {isLogin ? (
              // Login Form
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                  Student Login
                </h2>
                <label className="block mb-4">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </label>
                <label className="block mb-6">
                  <span className="text-gray-700">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </label>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            ) : (
              // Signup Form
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
                  Student Signup
                </h2>
                <label className="block mb-4">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 transition-all"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Username</span>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 transition-all"
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                  />
                </label>
                <label className="block mb-6">
                  <span className="text-gray-700">Password</span>
                  <input
                    type="password"
                    placeholder="Choose a password"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 transition-all"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                  />
                </label>
                <button
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StudentLoginSignup;
