const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 font-[Montserrat] tracking-wide">
          Why Universities Should Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              step: "1",
              title: "Streamlined Student Verification",
              description: "Utilize blockchain technology to authenticate student data securely and eliminate manual errors.",
            },
            {
              step: "2",
              title: "Role Based Access Control",
              description: "Role Based Access Like Student and Teacher Having Their Own Dashboard and Functionalities",
            },
            {
              step: "3",
              title: "Interactive Learning Experience",
              description: "Host live video mentorship sessions to foster personalized interactions and enhance learning outcomes.",
            },
            {
              step: "4",
              title: "Comprehensive Data Insights",
              description: "Monitor student performance and attendance with advanced analytics to improve institutional outcomes.",
            },
            {
              step: "5",
              title: "Secure Payment Management",
              description: "Simplify fee collection and tracking using integrated, secure payment gateways.",
            },
            {
              step: "6",
              title: "Customizable Workflows",
              description: "Adapt the platform to your institution's unique requirements with easy customization options.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative bg-white shadow-xl rounded-lg p-8 text-center transform transition-transform duration-300 hover:scale-105"
              style={{
                background: index % 2 === 0 ? "linear-gradient(135deg, #E3F2FD, #BBDEFB)" : "linear-gradient(135deg, #FFECB3, #FFE082)",
              }}
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-md font-[Lato]">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-4 font-[Open Sans] tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-700 font-[Nunito] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
