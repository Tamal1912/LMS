import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-5xl font-extrabold text-center text-blue-700 mb-10 leading-tight font-[Poppins]">
          Unlock the Future of Learning
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto font-[Roboto]">
          Explore cutting-edge tools designed for collaboration, time management, blockchain security, and personalized learning environments.
        </p>

        {/* Feature Cards */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Blockchain-Based Verification */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
                Blockchain-Based Verification
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
                Ensure the authenticity of certifications and records with blockchain-powered security for trust and transparency.
              </p>
            </div>
          </div>

          {/* Card 2: QR Code-Enabled Sharing */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
                QR Code-Enabled Sharing
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
                Share assignments, resources, and status updates instantly with secure QR code integration.
              </p>
            </div>
          </div>

          {/* Card 3: Live Video Mentorship */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
                Live Video Mentorship
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
                Connect with mentors in real-time through high-quality video sessions for personalized guidance.
              </p>
            </div>
          </div>

          {/* Card 4: Smart Scheduling and Reminders */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
                Smart Scheduling and Reminders
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
                Stay on top of deadlines with AI-powered scheduling tools and customizable reminders tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
