const Testimonials = () => {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "User 1", feedback: "This is an amazing product!" },
              { name: "User 2", feedback: "It has made my life so much easier!" },
              { name: "User 3", feedback: "Highly recommend to everyone!" },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
                <h3 className="text-xl font-semibold text-gray-700">
                  - {testimonial.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  