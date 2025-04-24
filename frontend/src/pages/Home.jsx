import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { TiThMenu } from "react-icons/ti";
import TypewriterText from "../components/TypewriterText";
import { AiOutlineClose } from "react-icons/ai";




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
   <button className="ml-5 lg:hidden  md:hidden" onClick={handleButtonToggle}>
    
      <TiThMenu/>
    </button>
  
  {/* for big screen */}
 { /* Login and signup buttons for small screens inside the hamburger menu */}
  <ul className={`md:flex gap-6 font-medium ${
    showMenu ? "flex flex-col items-center text-center absolute top-16 left-1/2 transform -translate-x-1/2 w-full bg-blue-600 p-4" : "hidden"
  }`}>
    <li className="cursor-pointer px-3 py-2 rounded-md hover:text-blue-900 hover:bg-blue-100 transition duration-300">
      <a href="/">Home</a>
    </li>

    
    <li onClick={()=> openModal("Login")} className="cursor-pointer px-3 py-2 rounded-md hover:text-blue-900 hover:bg-blue-100 transition duration-300">
      <a href="/#">Courses</a>
    </li>
    
    <li className="cursor-pointer px-3 py-2 rounded-md hover:text-blue-900 hover:bg-blue-100 transition duration-300">
      <a href="#features">Features</a>
    </li>
    <li className="cursor-pointer px-3 py-2 rounded-md hover:text-blue-900 hover:bg-blue-100 transition duration-300">
      <a href="#how-it-works">How It Works</a>
    </li>
    <li className="cursor-pointer px-3 py-2 rounded-md hover:text-blue-900 hover:bg-blue-100 transition duration-300">
      <a href="/contact">Contact</a>
    </li>

    {/* Login and signup buttons on small screens*/}
  <li className="flex flex-col gap-2 mt-4 md:hidden">
    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-200 transition" onClick={() => openModal("Login")}>Login</button>

  </li>
</ul>


  <div className="auth_buttons hidden md:flex items-center space-x-4 flex-shrink-0">
 
    <div className="auth_buttons hidden md:flex items-center space-x-4 flex-shrink-0">
    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-200 transition" onClick={() => openModal("Login")}>Login</button>
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

<section className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6">
  {/* Background Layer - Stars / Gradient / Nebula Glow */}
  <div className="absolute inset-0 bg-gray-200">
    <div className="absolute w-full h-full bg-[url('/stars.svg')] bg-cover opacity-20 animate-pulse"></div>
  </div>

  {/* Floating Glow Orbs */}
  <motion.div
    className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl top-[-80px] left-[-80px]"
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 10, repeat: Infinity }}
  />
  <motion.div
    className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-2xl bottom-[-60px] right-[-60px]"
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 12, repeat: Infinity }}
  />

  {/* Center Card (Glass UI) */}
  <motion.div
    className="relative z-10 w-full max-w-4xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl text-center"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Typewriter Heading */}
    <motion.h1
      className="text-4xl md:text-5xl font-bold text-white leading-snug mb-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <TypewriterText
        texts={[
          "Welcome to EduPlatform.",
          "Reimagine Learning with Us.",
          "Your Learning, Your Way.",
          
        ]}
      />
    </motion.h1>

    {/* Description */}
    <motion.p
      className="mt-4 text-lg  text-indigo-800 font-semibold leading-relaxed text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      Experience a new era of education with our  EduPlatform. Whether you're a student or a teacher, we provide the tools you need to succeed. Join us and transform your learning journey today!
      <br />
     </motion.p>

    {/* Call-to-Actions */}
    <motion.div
      className="mt-8  flex justify-center gap-4 items-center flex-wrap "
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <button onClick={() => handleNavigation("Student")} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all">
        Get Started
      </button>
      
    </motion.div>
  </motion.div>
</section>



      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Navbar;


 
