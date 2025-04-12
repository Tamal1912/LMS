import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-b from-sky-100 to-sky-200 text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Vision */}
          <div>
            <h3 className="text-3xl font-bold mb-3 text-sky-600">LearnSecure</h3>
            <p className="text-gray-700 leading-relaxed">
              Empowering education with blockchain-secured solutions for a brighter future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-3 text-sky-600">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-700 hover:text-sky-600 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-700 hover:text-sky-600 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-700 hover:text-sky-600 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-700 hover:text-sky-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-3 text-sky-600">Stay Updated</h4>
            <p className="text-gray-700 mb-4">
              Subscribe for updates on the latest features and innovations.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <button className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-sky-300 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} LearnSecure. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-sky-600 transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-sky-600 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-sky-600 transition-colors">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Admin Login Button */}
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition"
            onClick={() => navigate("/api/adminLogin")}
          >
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
