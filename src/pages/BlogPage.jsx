import React from "react";
import { BsHouseDoor, BsJournalText } from "react-icons/bs";
import PageBanner from "../components/PageBanner";
import { Helmet } from "react-helmet";
import { myWeb } from "../utils/constants";

const BlogPage = () => {
  const BannerData = {
    heading: "Blogs",
    backgroundUrl: "/Blogs.webp",
    breadcrumbs: [
      {
        link: "/",
        linkText: "Home",
        icon: BsHouseDoor,
      },
      {
        link: "/blogs",
        linkText: "All Blogs",
        icon: BsJournalText,
      },
    ],
  };

  return (
    <div className="appbody">
      <Helmet>
        <title>Blogs | Raj Kumar Singha</title>
        <meta
          name="description"
          content="Explore insightful blogs by Raj Kumar Singha on web development, Next.js, React, Node.js, and software engineering best practices."
        />
        <meta
          name="keywords"
          content="web development blogs, Next.js tutorials, React guides, Node.js articles, Raj Kumar Singha, software engineering, frontend development, backend development"
        />
        <link rel="canonical" href={`${myWeb}/blogs`} />
        <meta property="og:title" content="Blogs | Raj Kumar Singha" />
        <meta
          property="og:description"
          content="Explore insightful blogs by Raj Kumar Singha on web development, Next.js, React, Node.js, and software engineering best practices."
        />
        <meta property="og:image" content="/Blogs.webp" />
        <meta property="og:url" content={`${myWeb}/blogs`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogs | Raj Kumar Singha" />
        <meta
          name="twitter:description"
          content="Explore insightful blogs by Raj Kumar Singha on web development, Next.js, React, Node.js, and software engineering best practices."
        />
        <meta name="twitter:image" content="/Blogs.webp" />
        <script type="application/ld+json">
          {`
          {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Blogs | Raj Kumar Singha",
              "description": "Explore insightful blogs by Raj Kumar Singha on web development, Next.js, React, Node.js, and software engineering best practices.",
              "url": "${myWeb}/blogs",
              "author": {
                  "@type": "Person",
                  "name": "Raj Kumar Singha",
                  "jobTitle": "Software Engineer",
                  "description": "Software engineer with over 2+ years of experience in web application development."
              },
              "publisher": {
                  "@type": "Person",
                  "name": "Raj Kumar Singha"
              }
          }
          `}
        </script>
      </Helmet>
      <PageBanner BannerData={BannerData} />
      <div className="text-center text-xl text-gray-600 bg-gray-200 p-5 flex items-center justify-center">
        <p>Blogs will be uploaded soon...</p>
      </div>
    </div>
  );
};

export default BlogPage;
