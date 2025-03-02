import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PageBanner from "../components/PageBanner";
import {
  BsEnvelope,
  BsFacebook,
  BsFullscreen,
  BsFullscreenExit,
  BsGithub,
  BsHouseDoor,
  BsInstagram,
  BsLinkedin,
  BsPersonVcard,
  BsTelephoneOutbound,
  BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import AboutMe from "../components/AboutMe";
import MyExperiences from "../components/MyExperiences";
import TechnicalSkills from "../components/TechnicalSkills";
import Educations from "../components/Educations";
import { myWeb } from "../utils/constants";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("aboutMe");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const BannerData = {
    heading: "About Me",
    backgroundUrl: "/about-me.webp",
    breadcrumbs: [
      {
        link: "/",
        linkText: "Home",
        icon: BsHouseDoor,
      },
      {
        link: "/about",
        linkText: "About Me",
        icon: BsPersonVcard,
      },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "aboutMe":
        return <AboutMe />;
      case "experience":
        return <MyExperiences />;
      case "education":
        return <Educations />;
      case "technicalSkills":
        return <TechnicalSkills />;
      default:
        return null;
    }
  };
  return (
    <div className="appbody">
      <Helmet>
        <title>About Me | Raj Kumar Singha</title>
        <meta
          name="description"
          content="Learn more about Raj Kumar Singha, a software engineer with over 2+ years of experience in web application development specializing in Next.js and Node.js."
        />
        <meta
          name="keywords"
          content="Raj Kumar Singha, software engineer, web developer, Next.js, Node.js, React, frontend developer,  backend developer"
        />
        <link rel="canonical" href={`${myWeb}/about`} />
        <meta property="og:title" content="About Me | Raj Kumar Singha" />
        <meta
          property="og:description"
          content="Learn more about Raj Kumar Singha, a software engineer with over 2+ years of experience in web application development specializing in Next.js and Node.js."
        />
        <meta property="og:image" content="/about-me.webp" />
        <meta property="og:url" content={`${myWeb}/about`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Me | Raj Kumar Singha" />
        <meta
          name="twitter:description"
          content="Learn more about Raj Kumar Singha, a software engineer with over 2+ years of experience in web application development specializing in Next.js and Node.js."
        />
        <meta name="twitter:image" content="/about-me.webp" />
        <script type="application/ld+json">
          {`
          {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "name": "About Me | Raj Kumar Singha",
              "description": "Learn more about Raj Kumar Singha, a software engineer with over 2+ years of experience in web application development specializing in Next.js and Node.js.",
              "url": "${myWeb}/about",
              "about": {
                  "@type": "Person",
                  "name": "Raj Kumar Singha",
                  "jobTitle": "Software Engineer",
                  "description": "Software engineer with over 2+ years of experience in web application development.",
                  "sameAs": [
                      "https://github.com/Raj-kumar-singha",
                      "https://twitter.com/Rajkuma48617284",
                      "https://in.linkedin.com/in/raj-kumar-singha-63a7b5169",
                      "https://www.youtube.com/@officialoneway",
                      "https://www.facebook.com/Raj.Kumar.Singha.05",
                      "https://www.instagram.com/itj_raj.kumar"
                  ]
              }
          }
          `}
        </script>
      </Helmet>

      <PageBanner BannerData={BannerData} />

      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* First Column */}
          {isSidebarOpen && (
            <div className="col-span-12 md:col-span-3 bg-orange-200 p-4 py-12">
              <div className="flex justify-center align-middle mx-auto pb-4 w-52 h-52 md:w-32 md:h-32 lg:w-52 lg:h-52 border-8 border-solid border-red-900 rounded-full">
                <img
                  src="/raj_kumar.jpg"
                  alt="Coffee"
                  className="w-48 h-48  md:w-28 md:h-28 lg:w-48 lg:h-48 rounded-full transform hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-center text-xl text-black-900 ">
                @Raj-kumar-singha
              </p>
              <div className="flex flex-row gap-4 justify-center items-center pt-3">
                {/* Email Link */}
                <Link
                  to="mailto:itsrajkumarsingha@gmail.com?subject=Write you Subject Here&body=Write Text Here...."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-b-2 border-dotted border-gray-400 hover:text-blue-500 transition-colors"
                >
                  <BsEnvelope className="hover:scale-110 transition-transform" />
                  <span>Mail</span>
                </Link>

                {/* Phone Link */}
                <Link
                  to="tel:+919083960663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-b-2 border-dotted border-gray-400 hover:text-blue-500 transition-colors"
                >
                  <BsTelephoneOutbound className="hover:scale-110 transition-transform" />
                  <span>Call</span>
                </Link>
              </div>
              <div className="flex flex-col gap-6 text-center py-6 ">
                <p
                  className={`text-2xl text-black-900 cursor-pointer ${
                    activeTab === "aboutMe"
                      ? "font-bold underline decoration-blue-500 decoration-2 underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setActiveTab("aboutMe")}
                >
                  About Me
                </p>
                <p
                  className={`text-2xl text-black-900 cursor-pointer ${
                    activeTab === "experience"
                      ? "font-bold underline decoration-blue-500 decoration-2 underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setActiveTab("experience")}
                >
                  Experience
                </p>
                <p
                  className={`text-2xl text-black-900 cursor-pointer ${
                    activeTab === "education"
                      ? "font-bold underline decoration-blue-500 decoration-2 underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setActiveTab("education")}
                >
                  Education
                </p>
                <p
                  className={`text-2xl text-black-900 cursor-pointer ${
                    activeTab === "technicalSkills"
                      ? "font-bold underline decoration-blue-500 decoration-2 underline-offset-4"
                      : ""
                  }`}
                  onClick={() => setActiveTab("technicalSkills")}
                >
                  Technical Skills
                </p>
              </div>
              <p className="text-center text-2xl text-black-900 py-3">
                Follow Me On:-
              </p>
              <div className="flex flex-row gap-3 justify-center align-middle flex-wrap ">
                <Link
                  to="https://github.com/Raj-kumar-singha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-700"
                >
                  <div className="tooltip" data-tip="GitHub">
                    <BsGithub size={19} />
                  </div>
                </Link>
                <Link
                  to="https://twitter.com/Rajkuma48617284"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  <div className="tooltip" data-tip="Twitter">
                    <BsTwitterX size={18} />
                  </div>
                </Link>
                <Link
                  to="https://in.linkedin.com/in/raj-kumar-singha-63a7b5169"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-blue-700"
                >
                  <div className="tooltip" data-tip="Twitter">
                    <BsLinkedin size={17} />
                  </div>
                </Link>
                <Link
                  to="https://www.youtube.com/@officialoneway"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-red-500"
                >
                  <div className="tooltip" data-tip="Youtube">
                    <BsYoutube size={18} />
                  </div>
                </Link>
                <Link
                  to="https://www.facebook.com/Raj.Kumar.Singha.05"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-blue-500"
                >
                  <div className="tooltip" data-tip="Facebook">
                    <BsFacebook size={18} />
                  </div>
                </Link>
                <Link
                  to="https://www.instagram.com/itj_raj.kumar"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-pink-500"
                >
                  <div className="tooltip" data-tip="Instagram">
                    <BsInstagram size={18} />
                  </div>
                </Link>
                <Link
                  to="https://wa.me/919083960663?text=Hi Raj."
                  target="_blank"
                  className="flex items-center gap-2 hover:text-green-500"
                >
                  <div className="tooltip" data-tip="Whatsapp">
                    <BsWhatsapp size={18} />
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Second Column */}
          <div
            className={`col-span-12 ${
              isSidebarOpen ? "md:col-span-9" : "md:col-span-12"
            } bg-orange-200 p-2 transition-all duration-300`}
          >
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              // className="p-2 hidden md:block bg-orange-100 text-gray rounded-full shadow-md"
              className="p-2  bg-orange-100 text-gray rounded-full shadow-md"
            >
              {isSidebarOpen ? (
                <BsFullscreenExit size={20} />
              ) : (
                <BsFullscreen size={20} />
              )}
            </button>

            <div className="about-second-slidebar h-full max-h-[600px] overflow-y-scroll px-8 pb-8 ">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
