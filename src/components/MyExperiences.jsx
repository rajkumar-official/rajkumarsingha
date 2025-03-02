import React from 'react'
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MyExperiences = () => {
  const timelineData = [
    {
      year: "16Aug, 2022 - 31Dec, 2024",
      title: "Software Engineer",
      institute: "Msys Tech Ind Pvt Ltd.",
      location: "Chennai, Tamil Nadu India",
      description:
        `Proficient in Next.js and Node.js, delivering scalable full-stack solutions that
         improved website performance by 30%, with expertise in implementing Strapi CMS to 
         streamline backend workflows and reduce content management time by 40%, and optimizing 
         UI/ UX to enhance user engagement and reduce bounce rates by 25 %.`
    }

  ];

  return (
    <div>
      <div className="max-w-full mx-auto">
        <h2 className=" displa text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
          My Experience
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

export default MyExperiences
