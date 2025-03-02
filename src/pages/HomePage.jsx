import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { myWeb } from "../utils/constants";

const HomePage = () => {
  const [showSubText, setShowSubText] = useState(false);
  const [showCredit, setShowCredit] = useState(false);

  useEffect(() => {
    const subTextTimer = setTimeout(() => setShowSubText(true), 2500);
    const creditTimer = setTimeout(() => setShowCredit(true), 5000);
    return () => {
      clearTimeout(subTextTimer);
      clearTimeout(creditTimer);
    };
  }, []);

  return (
    <div className="appbody flex flex-col items-center justify-center min-h-[93vh] bg-gradient-to-r from-blue-100 via-purple-200 to-pink-200 text-gray-900 relative">
      <Helmet>
        <title>Raj Kumar Singha | MERN Stack Developer</title>
        <meta
          name="description"
          content="Raj Kumar Singha is a passionate MERN stack developer specializing in building innovative web solutions with MongoDB, Express, React, and Node.js."
        />
        <meta
          name="keywords"
          content="Raj Kumar Singha, web developer, MERN stack, MongoDB, Express, React, Node.js, frontend developer, backend developer, full-stack developer"
        />
        <link rel="canonical" href={myWeb} />
        <meta
          property="og:title"
          content="Raj Kumar Singha | MERN Stack Developer"
        />
        <meta
          property="og:description"
          content="Raj Kumar Singha is a passionate MERN stack developer specializing in building innovative web solutions with MongoDB, Express, React, and Node.js."
        />
        <meta property="og:image" content="/raj_kumar.jpg" />
        <meta property="og:url" content={myWeb} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Raj Kumar Singha | MERN Stack Developer"
        />
        <meta
          name="twitter:description"
          content="Raj Kumar Singha is a passionate MERN stack developer specializing in building innovative web solutions with MongoDB, Express, React, and Node.js."
        />
        <meta name="twitter:image" content="/raj_kumar.jpg" />
        <script type="application/ld+json">
          {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Raj Kumar Singha",
                        "url": "${myWeb}",
                        "image": "/raj_kumar.jpg",
                        "jobTitle": "MERN Stack Developer",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Self-Employed"
                        },
                        "description": "Passionate MERN stack developer, constantly learning and building innovative solutions.",
                        "sameAs": [
                            "https://github.com/Raj-kumar-singha",
                            "https://twitter.com/Rajkuma48617284",
                            "https://in.linkedin.com/in/raj-kumar-singha-63a7b5169",
                            "https://www.youtube.com/@officialoneway",
                            "https://www.facebook.com/Raj.Kumar.Singha.05",
                            "https://www.instagram.com/itj_raj.kumar"
                        ],
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${myWeb}"
                        }
                    }
                    `}
        </script>
      </Helmet>

      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/gif.mp4"
        autoPlay
        loop
        muted
      ></video>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="text-center p-4 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide mb-10 text-white drop-shadow-lg animate-gradient-text animate-dropAndExpand">
          Hi<span className="text-purple-500">,</span> I am{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600">
            Raj Kumar Singha
          </span>
          <span className="text-blue-600">.</span>
        </h1>
        {showSubText && (
          <p className="text-base md:text-lg lg:text-xl font-medium text-gray-200 opacity-90 max-w-xl mx-auto animate-zoomIn">
            I'm a passionate MERN stack developer, constantly learning and
            building innovative solutions. Let's collaborate and create
            something impactful together.
          </p>
        )}
        <div className="mt-6">
          {showSubText && (
            <Link
              to="/about"
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            >
              Know More
            </Link>
          )}
        </div>

        {showCredit && (
          <p className="text-sm md:text-md text-gray-400 dark:text-gray-300 mt-8 underline decoration-gray-500 decoration-1 decoration-dotted underline-offset-4 transition-all duration-300 animate-slideInFromLeft">
            Developed by{" "}
            <Link to="/about" className="hover:text-blue-400">
              Raj Kumar Singha
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
