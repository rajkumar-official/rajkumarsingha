import React from 'react';
import { DiHtml5, DiCss3, DiJavascript, DiNodejs, DiMongodb, DiBootstrap, DiGit, DiMysql, DiPostgresql } from 'react-icons/di';
import { SiNextdotjs, SiExpress, SiStrapi, SiPostman, SiAmazonwebservices, SiReact, SiTailwindcss } from 'react-icons/si';

const TechnicalSkills = () => {
  const skills = [
    // Front End
    { name: 'HTML', icon: <DiHtml5 className="w-16 h-16 text-orange-500" />, progress: 95, color: 'text-orange-500' },
    { name: 'CSS', icon: <DiCss3 className="w-16 h-16 text-blue-500" />, progress: 95, color: 'text-blue-500' },
    { name: 'Next.JS', icon: <SiNextdotjs className="w-16 h-16 text-black dark:text-white" />, progress: 95, color: 'text-black dark:text-white' },
    { name: 'React.JS', icon: <SiReact className="w-16 h-16 text-blue-400 dark:text-white" />, progress: 95, color: 'text-blue-400 dark:text-white' },
    { name: 'Bootstrap', icon: <DiBootstrap className="w-16 h-16 text-purple-500" />, progress: 95, color: 'text-purple-500' },
    { name: 'Tailwind', icon: <SiTailwindcss className="w-16 h-16 text-blue-500" />, progress: 95, color: 'text-blue-500' },

    // Back End
    { name: 'Node.JS', icon: <DiNodejs className="w-16 h-16 text-green-600" />, progress: 95, color: 'text-green-600' },
    { name: 'Express.JS', icon: <SiExpress className="w-16 h-16 text-gray-500" />, progress: 95, color: 'text-gray-500' },
    { name: 'Strapi', icon: <SiStrapi className="w-16 h-16 text-blue-500" />, progress: 95, color: 'text-blue-500' },

    // Programming
    { name: 'JavaScript', icon: <DiJavascript className="w-16 h-16 text-yellow-500" />, progress: 95, color: 'text-yellow-500' },

    // Databases
    { name: 'MongoDB', icon: <DiMongodb className="w-16 h-16 text-green-500" />, progress: 95, color: 'text-green-500' },
    { name: 'SQL', icon: <DiMysql className="w-16 h-16 text-blue-600" />, progress: 95, color: 'text-blue-600' },
    { name: 'PostgreSQL', icon: <DiPostgresql className="w-16 h-16 text-blue-700" />, progress: 95, color: 'text-blue-700' },

    // Tools
    { name: 'GIT', icon: <DiGit className="w-16 h-16 text-orange-600" />, progress: 99, color: 'text-orange-600' },
    { name: 'Postman', icon: <SiPostman className="w-16 h-16 text-orange-500" />, progress: 99, color: 'text-orange-500' },

    // Deployment
    { name: 'AWS', icon: <SiAmazonwebservices className="w-16 h-16 text-yellow-600" />, progress: 70, color: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen">
      <h2 className=" displa text-4xl font-bold mb-10 mx-auto text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400">
        Technical Skills
      </h2>
      <div className='flex items-center justify-center'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card relative w-56 h-56 sm:w-30 sm:h-30 md:w-45 md:h-45 lg:w-55 lg:h-55 rounded-lg shadow-2xl transform transition-transform duration-500 hover:rotate-y-180 cursor-pointer"
            >
              {/* Front Side */}
              <div className="skill-card-front absolute w-full h-full flex flex-col items-center justify-center bg-white rounded-lg p-4">
                <div className="text-6xl">{skill.icon}</div>
                <h3 className={`mt-4 text-2xl font-bold ${skill.color}`}>{skill.name}</h3>
              </div>

              {/* Back Side */}
              <div className="skill-card-back absolute w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-slate-800 to-gray-500 rounded-lg p-6 transform rotate-y-180">
                <h3 className={`text-2xl font-bold ${skill.color}`}>{skill.name}</h3>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <p className={`mt-2 ${skill.color}`}>{skill.progress}/100</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;