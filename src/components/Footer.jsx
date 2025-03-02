import { createClient } from "@supabase/supabase-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import {
  BsChevronDoubleUp,
  BsCupStraw,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCopy,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { superBaseKey, superBaseUrl } from "../utils/constants";
import { fetchIp, fetchLocation, fetchWeather } from "./../utils/axiosUrl";

// Initialize Supabase client
const supabase = createClient(superBaseUrl, superBaseKey);

// Validation schema for the email subscription form
const subscriptionSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const Footer = () => {
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ip = await fetchIp(); // Fetch IP
        setIp(ip);

        const location = await fetchLocation(ip); // Fetch location
        setLocation(location);

        const weather = await fetchWeather(location.city, location.countryCode); // Fetch weather
        setWeather(weather);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy IP to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ip).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle subscription form submission
  const handleSubscribe = async (values, { resetForm, setSubmitting }) => {
    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .insert([
          {
            email: values.email,
            subscribed_at: new Date().toISOString(),
            ip_address: ip || "unknown",
          },
        ]);

      if (error) {
        // Check if it's a duplicate email error
        if (error.code === "23505") {
          toast.info("You're already subscribed to our newsletter!");
        } else {
          throw error;
        }
      } else {
        // Success
        toast.success("Successfully subscribed to our newsletter!");
        resetForm();
      }

      // Store subscription in localStorage as backup
      const storedSubscriptions = JSON.parse(
        localStorage.getItem("newsletterSubscriptions") || "[]"
      );
      localStorage.setItem(
        "newsletterSubscriptions",
        JSON.stringify([
          ...storedSubscriptions,
          { email: values.email, subscribedAt: new Date().toISOString() },
        ])
      );
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("There was an error subscribing. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/raj-logo.png" alt="Raj" width={120} height={50} />
          <p className="text-center md:text-left text-gray-400 my-4 font-semibold">
            Designed & Developed by Raj Kumar Singha. Turning ideas into digital
            reality. Explore, learn, and connect with creativity
          </p>
          <div className="text-center md:text-left text-gray-600 text-lg font-semibold">
            {/* IP Address */}
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="bg-gray-400 h-5 w-28 block animate-pulse"></div>
              </div>
            ) : (
              <p className="flex items-center mb-2">
                <AiOutlineGlobal className="mr-2 text-blue-400" />
                <span>Your Ip: {ip}</span>
                <button onClick={copyToClipboard} className="ml-2">
                  {isCopied ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaCopy className="text-blue-400 hover:text-blue-300 cursor-pointer" />
                  )}
                </button>
              </p>
            )}

            {/* Location */}
            {isLoading ? (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="bg-gray-400 h-5 w-28 block animate-pulse"></div>
              </div>
            ) : location ? (
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-400" /> Location:
                <span className="ml-2">
                  {location.city}, {location.country_name}
                </span>
              </p>
            ) : (
              <p className="text-red-500">Weather data unavailable</p>
            )}

            {/* Weather */}
            <div className="flex items-center mb-2">
              {isLoading ? (
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="bg-gray-400 h-5 w-28 block animate-pulse"></div>
                </div>
              ) : weather ? (
                <>
                  <img
                    src={getWeatherIconUrl(weather.weather?.[0]?.icon)}
                    alt="Weather Icon"
                    className="w-10 h-10"
                  />
                  <p>
                    {weather.main?.temp}°C, {weather.weather?.[0]?.description}
                  </p>
                </>
              ) : (
                <p className="text-red-500">Weather data unavailable</p>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center">
          <b className="text-lg mb-4 FooterHeaderText">Follow Me</b>
          <div className="flex flex-col gap-3">
            <Link
              to="https://github.com/Raj-kumar-singha"
              target="_blank"
              className="flex items-center gap-2 hover:text-gray-700"
            >
              <BsGithub size={24} /> Github
            </Link>
            <Link
              to="https://twitter.com/Rajkuma48617284"
              target="_blank"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <BsTwitterX size={22} /> Twitter
            </Link>
            <Link
              to="https://in.linkedin.com/in/raj-kumar-singha-63a7b5169"
              target="_blank"
              className="flex items-center gap-2 hover:text-blue-700"
            >
              <BsLinkedin size={22} /> LinkedIn
            </Link>
            <Link
              to="https://www.youtube.com/@officialoneway"
              target="_blank"
              className="flex items-center gap-2 hover:text-red-500"
            >
              <BsYoutube size={22} /> YouTube
            </Link>
            <Link
              to="https://www.facebook.com/Raj.Kumar.Singha.05"
              target="_blank"
              className="flex items-center gap-2 hover:text-blue-500"
            >
              <BsFacebook size={22} /> Facebook
            </Link>
            <Link
              to="https://www.instagram.com/itj_raj.kumar"
              target="_blank"
              className="flex items-center gap-2 hover:text-pink-500"
            >
              <BsInstagram size={22} /> Instagram
            </Link>
            <Link
              to="https://wa.me/919083960663?text=Hi Raj."
              target="_blank"
              className="flex items-center gap-2 hover:text-green-500"
            >
              <BsWhatsapp size={22} /> WhatsApp
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="text-center md:text-left">
          <b className="text-lg mb-2 FooterHeaderText">Newsletter</b>
          <p className="mb-4 text-gray-400">Enter your email to get updates.</p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={subscriptionSchema}
            onSubmit={handleSubscribe}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <div className="flex join">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="p-2 rounded-l-md input input-bordered text-black w-full focus:outline-none join-item"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 join-item text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submiting..." : "Subscribe"}
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1 text-left"
                />
              </Form>
            )}
          </Formik>

          <div className="mt-4 flex justify-center md:justify-start">
            <Link to="/buy-me-a-coffee" className="w-full md:w-auto">
              <button
                className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-500 w-full md:w-auto justify-center text-black"
                onClick={scrollToTop}
              >
                <BsCupStraw size={20} /> Buy Me a Coffee
              </button>
            </Link>
          </div>
          <div className="text-center md:text-start mt-4 text-lg font-semibold">
            <div>
              <p className="flex items-center justify-center md:justify-start">
                <FaCalendarAlt className="mr-2 text-purple-400" /> Date:{" "}
                <span className="text-blue-400 ml-1">
                  {dateTime.toLocaleDateString()}
                </span>
              </p>
              <p className="flex items-center justify-center md:justify-start mt-2">
                <FaClock className="mr-2 text-purple-400" /> Time:{" "}
                <span className="text-blue-400 ml-1">
                  {dateTime.toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="mt-10 flex justify-center">
        <div
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 hover:text-blue-500 cursor-pointer"
        >
          <BsChevronDoubleUp size={30} />
          <b>Back To Top</b>
        </div>
      </div>

      <hr className="my-2 border-gray-700" />

      <p className="text-center mt-5 text-gray-500 text-sm">
        © {new Date().getFullYear()} Raj All rights reserved.
        <br /> Developed by{" "}
        <Link
          onClick={scrollToTop}
          to="/about"
          className="border-b border-dotted border-gray-500 hover:text-blue-600 hover:border-blue-600 transition-colors duration-300 ease-in-out"
        >
          Raj Kumar Singha
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
