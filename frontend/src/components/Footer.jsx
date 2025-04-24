import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleEmailUs = () => {
     const emailBody = `Hello EduPlatform Team,\n\nI have a query regarding your platform.\n\nBest regards,\n[Your Name]`;
    const emailSubject = `Query about EduPlatform`;
    const emailBodyEncoded = encodeURIComponent(emailBody);
    const emailSubjectEncoded = encodeURIComponent(emailSubject);
    const email = "admin@example.com"; // Replace with your email
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${emailSubjectEncoded}&body=${emailBodyEncoded}`;
    window.open(gmailURL, "_blank");
  };

  return (
    <footer className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-white">EduPlatform</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              A secure, smart, and scalable education system for institutions, teachers, and students. Powered by tech, driven by impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Any Query ?</h4>
            <p className="text-gray-300 text-sm mb-4"> Email Us</p>
            
              <button
              onClick={handleEmailUs}
              className="bg-white hover:bg-sky-400 px-5 py-2 rounded-full text-gray-900 font-semibold transition">
                Email
              </button>
            
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-blue-500"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
        
        </div>

        {/* Admin CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/api/adminLogin")}
            className="px-6 py-2 bg-white text-blue-800 rounded-full font-semibold hover:bg-blue-200 transition"
          >
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
