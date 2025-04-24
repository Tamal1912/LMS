import React from "react";
import { motion } from "framer-motion";

const howItWorksData = [
  {
    step: "01",
    title: "Admin Management",
    description:
      "Admins handle course creation, user management, and post publishing, enabling centralized system control.",
    gradient: "from-teal-100 to-teal-300",
  },
  {
    step: "02",
    title: "Teacher Engagement",
    description:
      "Teachers create courses and post valuable content. They directly interact with students through resources.",
    gradient: "from-green-100 to-green-300",
  },
  {
    step: "03",
    title: "Student Interaction",
    description:
      "Students explore courses, access posts, and vote to promote valuable content across the platform.",
    gradient: "from-sky-100 to-sky-300",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-10 leading-tight font-[Poppins]">
          How EduPlatform Works
          </h2>
            
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {howItWorksData.map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-3xl p-8 text-center shadow-xl bg-gradient-to-br ${item.gradient} transition-transform transform hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white flex items-center justify-center text-2xl font-extrabold text-gray-700 shadow-lg">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-700 text-md leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

     
      </div>
    </section>
  );
};

export default HowItWorks;
