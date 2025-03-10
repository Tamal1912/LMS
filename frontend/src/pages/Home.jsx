import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { motion } from "framer-motion";




const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();

  const openModal = (action) => {
    setActionType(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigation = (role) => {
    const path = role === "Student" ? "/api/studentLoginSignup" : "/api/teacherLoginSignup";
    navigate(path);
    closeModal();
  };

  const [showMenu, setShowMenu] = useState(false);
  const handleButtonToggle = () =>{
    setShowMenu(!showMenu);
  }

  return (
    <>
<nav className="w-full flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md fixed top-0 z-50">
  <div className="text-2xl font-bold flex-shrink-0">EduPlatform</div>

   {/* Hamburger menu only on small screens */}
   <button className="md:hidden ml-5" onClick={handleButtonToggle}>
      <i className="fa-solid fa-bars"></i>
    </button>
  
  {/* for big screen */}
  {/* Login and signup buttons for small screens inside the hamburger menu */}

  <ul className={`md:flex gap-6 font-medium ${showMenu ? "flex flex-col items-center text-center absolute top-16 left-1/2 transform -translate-x-1/2 w-full bg-blue-600 p-4" : "hidden"}`}>
  {["Home", "Features", "How It Works", "Contact"].map((item) => (
    <li key={item} className="cursor-pointer hover:text-gray-200">{item}</li>
  ))}
  
  {/* Login and signup buttons on small screens*/}
  <li className="flex flex-col gap-2 mt-4 md:hidden">
    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-200 transition" onClick={() => openModal("Login")}>Login</button>
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => openModal("Sign Up")}>Sign Up</button>
  </li>
</ul>


  <div className="auth_buttons hidden md:flex items-center space-x-4 flex-shrink-0">
 
    <div className="auth_buttons hidden md:flex items-center space-x-4 flex-shrink-0">
    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-200 transition" onClick={() => openModal("Login")}>Login</button>
    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" onClick={() => openModal("Sign Up")}>Sign Up</button>
  </div>

   
  </div>
</nav>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-semibold text-center mb-6">
              {actionType} as
            </h2>
            <div className="flex justify-around mb-6">
              {["Student", "Teacher"].map((role) => (
                <button
                  key={role}
                  className={`w-32 py-2 rounded-md text-white ${role === "Student" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}
                  onClick={() => handleNavigation(role)}
                >
                  {role}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600">
              Choose your role to proceed with {actionType}.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="w-28 py-2 text-white rounded-md bg-red-500 hover:bg-red-600"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="w-full flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-white px-8 relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <motion.div
            className="w-72 h-72 bg-blue-100 rounded-full absolute -top-16 -left-32"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className="w-96 h-96 bg-blue-200 rounded-full absolute top-40 -right-32"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          />
        </div>

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
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
          >
            EduPlatform
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-600 text-center max-w-2xl z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The ultimate platform for modern education. Simplify learning, enhance collaboration, and unlock your true potential.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-4 z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
            className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg text-lg hover:border-gray-500 transition"
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


