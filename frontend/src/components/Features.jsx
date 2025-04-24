import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20">
      <div className="max-w-full mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-10 leading-tight font-[Poppins]">
          Unlock the Future of Learning
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto font-[Roboto]">
          Learn From The Teachers You Trust, Get Verified By The Blockchain and Be ready for the Future.
        </p>

        {/* Feature Cards */}
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Blockchain-Based Verification */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
                Blockchain-Based Verification
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
                Ensure the authenticity of your achievements with our secure blockchain verification system.
              </p>
            </div>
          </div>

          {/* Card 2: QR Code-Enabled Sharing */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
              Teacher Tools for Course Management
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
              Centralized access for admins to manage students, teachers, courses, and system-wide announcements—ensuring seamless governance and operational efficiency.
              </p>
            </div>
          </div>

          {/* Card 3: Live Video Mentorship */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
              Personalized Student Dashboard
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
              Students can explore courses, read posts, vote on useful content, and access their personalized dashboard for a highly intuitive and engaging interface.


              </p>
            </div>
          </div>

          {/* Card 4: Smart Scheduling and Reminders */}
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
            <div className="absolute inset-x-0 -top-16 h-32 bg-gradient-to-r from-blue-500 to-blue-300 transform skew-y-6 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-900 font-[Merriweather]">
              Role-Based Admin Panel
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 font-[Roboto]">
              Centralized access for admins to manage students, teachers, courses, and system-wide announcements—ensuring seamless governance and operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
