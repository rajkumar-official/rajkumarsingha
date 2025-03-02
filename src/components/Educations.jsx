import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


const Educations = () => {
  const timelineData = [
    {
      year: "2018 - 2022",
      title: "Electronics and Communication Engineering",
      institute: "Dream Institute of Technology",
      location: "Kolkata, West Bengal, India",
      description:
        "Completed my Bachelor of Technology in Electronics and Communication Engineering from Dream Institute of Technology, Kolkata, West Bengal, India, with a CGPA of 8.82.",
    },
    {
      year: "2016 - 2018",
      title: "Higher Secondary Education (Science)",
      institute: "Malpar Vivekananda Sikshaniketan (H.S)",
      location: "Sabang, West Bengal, India",
      description:
        "Completed my Higher Secondary Education in the Science stream from Malpar Vivekananda Sikshaniketan (H.S), Sabang, West Bengal, India, with 65.20% marks.",
    },
    {
      year: "2014 - 2016",
      title: "Secondary Education",
      institute: "Malpar Vivekananda Sikshaniketan (H.S)",
      location: "Sabang, West Bengal, India",
      description:
        "Completed my Secondary Education from Malpar Vivekananda Sikshaniketan (H.S), Sabang, West Bengal, India, with 74.28% marks.",
    },

  ];

  return (
    <div>
      <div className="max-w-full mx-auto">
        <h2 className=" displa text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
          My Education
        </h2>
        <div className="relative sm:ml-12 md:ml-0 border-l-4 border-gray-300 sm:border-none">
          {timelineData.map((item, index) => {
            const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
            return (

              <motion.div
                ref={ref}
                key={index}
                initial={{ opacity: 1, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`mb-12 flex flex-col sm:ml-12 md:ml-0 md:flex-row ${index % 2 === 0 ? "items-start md:flex-row-reverse" : "items-start"
                  }`}
              >
                <div className="absolute w-5 h-5 bg-purple-700 rounded-full sm:left-[-12px] md:left-2/4 md:transform -translate-x-2/4"></div>
                <div
                  className={`w-full md:w-[45%] rounded-lg shadow-lg p-6 bg-white transition transform hover:scale-105 hover:shadow-2xl ${index % 2 === 0 ? "md:ml-5" : "md:mr-5"
                    }`}
                >
                  <p className="text-purple-500 text-sm font-medium">{item.year}</p>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <h4 className="text-md font-semibold text-gray-600">{item.institute}</h4>
                  <p className="text-sm text-gray-400">{item.location}</p>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
          <div className="absolute top-0 left-1/2 w-1 bg-gray-300 h-full transform -translate-x-1/2 hidden sm:block"></div>
        </div>
      </div>
    </div>
  );
};

export default Educations;
