import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { myWeb } from "../utils/constants";

const NotFoundPage = () => {
  return (
    <div className="appbody flex items-center justify-center min-h-[85vh] bg-gray-100">
      <Helmet>
        <title>404 - Page Not Found | Raj Kumar Singha</title>
        <meta
          name="description"
          content="Sorry, the page you are looking for cannot be found. Navigate back to the homepage to explore Raj Kumar Singha's portfolio."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${myWeb}/404`} />
        <meta
          property="og:title"
          content="404 - Page Not Found | Raj Kumar Singha"
        />
        <meta
          property="og:description"
          content="Sorry, the page you are looking for cannot be found. Navigate back to the homepage to explore Raj Kumar Singha's portfolio."
        />
        <meta property="og:url" content={`${myWeb}/404`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="404 - Page Not Found | Raj Kumar Singha"
        />
        <meta
          name="twitter:description"
          content="Sorry, the page you are looking for cannot be found. Navigate back to the homepage to explore Raj Kumar Singha's portfolio."
        />
      </Helmet>
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg">
        <h1 className="text-6xl font-bold text-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist. It might have been
          removed or the URL might be incorrect.
        </p>
        <Link to="/">
          <button className="btn btn-primary px-6 py-3">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
