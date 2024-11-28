import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Features from "../Features";
import HowItWorks from "../HowItWorks";
import Testimonials from "../Testimonials";
import Footer from "../Footer";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // To distinguish between 'Login' or 'Sign Up'
  const navigate = useNavigate();

  // Open modal with specified action type (Login or Sign Up)
  const openModal = (action) => {
    setActionType(action);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle the navigation based on role (Student or Teacher)
  const handleNavigation = (role) => {
    // Navigate to the appropriate page based on role and action type
    if (role === "Student") {
      if (actionType === "Login") {
        navigate("/api/studentLoginSignup"); // Navigate to Student Login/Signup
      } else if (actionType === "Sign Up") {
        navigate("/api/studentLoginSignup"); // Navigate to Student Login/Signup
      }
    } else if (role === "Teacher") {
      if (actionType === "Login") {
        navigate("/api/teacherLoginSignup"); // Navigate to Teacher Login/Signup
      } else if (actionType === "Sign Up") {
        navigate("/api/teacherLoginSignup"); // Navigate to Teacher Login/Signup
      }
    }
    closeModal(); // Close the modal after navigation
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md fixed top-0 z-50">
        <div className="text-2xl font-bold text-gray-800">EduProX</div>
        <ul className="flex gap-6 text-gray-600 font-medium">
          <li className="cursor-pointer hover:text-gray-900">Home</li>
          <li className="cursor-pointer hover:text-gray-900">Features</li>
          <li className="cursor-pointer hover:text-gray-900">How It Works</li>
          <li className="cursor-pointer hover:text-gray-900">Contact</li>
        </ul>
        <div className="auth_buttons">
          <button
            className="bg-blue-200 m-2 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
            onClick={() => openModal("Login")}
          >
            Login
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => openModal("Sign Up")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-96"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing on clicking inside
          >
            <h2 className="text-3xl font-semibold text-center mb-6">
              {actionType === "Login" ? "Login" : "Sign Up"} as
            </h2>
            <div className="flex justify-around mb-6">
              <button
                className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => handleNavigation("Student")}
              >
                Student
              </button>
              <button
                className="w-32 bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                onClick={() => handleNavigation("Teacher")}
              >
                Teacher
              </button>
            </div>
            <p className="text-center text-gray-600">
              Choose whether you are a student or a teacher to proceed with {actionType}.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="w-28 hover:bg-red-600 py-2 text-white rounded-md bg-rose-400"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="w-full flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white px-8 relative overflow-hidden">
        {/* Animated Circles for Background */}
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <motion.div
            className="w-72 h-72 bg-blue-100 rounded-full absolute -top-16 -left-32"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="w-96 h-96 bg-blue-200 rounded-full absolute top-40 -right-32"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </div>

        {/* Animated Headline */}
        <motion.h1
          className="text-5xl font-bold text-gray-800 text-center leading-tight z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Empower Your Learning Journey <br />
          with <motion.span
            className="text-blue-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            Name
          </motion.span>
        </motion.h1>

        {/* Animated Description */}
        <motion.p
          className="mt-4 text-lg text-gray-600 text-center max-w-2xl z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The ultimate platform for modern education. Simplify learning, enhance collaboration, and unlock your true potential.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          className="mt-8 flex gap-4 z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
            className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg text-lg hover:border-gray-500"
          >
            Learn More
          </motion.button>
        </motion.div>
      </section>

      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Navbar;
