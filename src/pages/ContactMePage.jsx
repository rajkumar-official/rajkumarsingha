import emailjs from "@emailjs/browser";
import { createClient } from "@supabase/supabase-js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { BsHouseDoor, BsTelephone } from "react-icons/bs";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PageBanner from "../components/PageBanner";
import {
  emailJsPublicKey,
  emailJsServiceId,
  emailJsTempplateId,
  myWeb,
  superBaseKey,
  superBaseUrl,
} from "../utils/constants";
emailjs.init(emailJsPublicKey);

const supabase = createClient(superBaseUrl, superBaseKey);

// Form validation schema using Yup
const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message should be at least 10 characters long")
    .required("Message is required"),
});

const ContactMePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Banner data for PageBanner component
  const BannerData = {
    heading: "Contact Me",
    backgroundUrl: "/contact-banner.webp",
    breadcrumbs: [
      {
        link: "/",
        linkText: "Home",
        icon: BsHouseDoor,
      },
      {
        link: "/contact-me",
        linkText: "Contact Me",
        icon: BsTelephone,
      },
    ],
  };

  // Initial form values
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  // Send email notifications
  const sendEmailNotifications = async (values) => {
    try {
      await emailjs.send(emailJsServiceId, emailJsTempplateId, {
        to_name: values.name,
        to_email: values.email,
        message: `\nYour message: ${values.message}`,
      });

      return true;
    } catch (error) {
      console.error("Error sending email notifications:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitError(null);

      // Insert data into Supabase - primary storage
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: values.name,
            phone: values.phone,
            email: values.email,
            message: values.message,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      // Store submission in localStorage as backup
      const storedSubmissions = JSON.parse(
        localStorage.getItem("contactSubmissions") || "[]"
      );
      localStorage.setItem(
        "contactSubmissions",
        JSON.stringify([
          ...storedSubmissions,
          { ...values, id: Date.now(), submittedAt: new Date().toISOString() },
        ])
      );

      // Try to send email notifications - but continue even if it fails
      try {
        const emailSent = await sendEmailNotifications(values);

        if (emailSent) {
          toast.success("Thank you! We've sent a confirmation to your email.");
        } else {
          // Email failed but data was stored
          toast.info(
            "Your message was received, but we couldn't send a confirmation email."
          );
        }
      } catch (emailError) {
        // Email completely failed but data was stored
        console.error("Email sending failed:", emailError);
        toast.info(
          "Your message was received, but we couldn't send a confirmation email."
        );
      }

      // Show success message
      setIsSubmitted(true);
      resetForm();

      // Display a success toast notification
      toast.success("Your message has been submitted successfully!");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "There was an error sending your message. Please try again later."
      );
      toast.error("There was an error submitting your form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="appbody">
      <Helmet>
        <title>Contact Me | Raj Kumar Singha</title>
        <meta
          name="description"
          content="Get in touch with us. Fill out our contact form and we'll get back to you as soon as possible."
        />
        <meta
          name="keywords"
          content="contact, contact form, get in touch, email, phone, location"
        />
        <link rel="canonical" href={`${myWeb}/contact-me`} />
        <meta property="og:title" content="Contact Me | Raj Kumar Singha" />
        <meta
          property="og:description"
          content="Get in touch with us. Fill out our contact form and we'll get back to you as soon as possible."
        />
        <meta property="og:image" content="/Contactme.webp" />
        <meta property="og:url" content={`${myWeb}/contact-me`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Me | Raj Kumar Singha" />
        <meta
          name="twitter:description"
          content="Get in touch with us. Fill out our contact form and we'll get back to you as soon as possible."
        />
        <meta name="twitter:image" content="/Contactme.webp" />
        <script type="application/ld+json">
          {`
          {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Me",
              "description": "Get in touch with us. Fill out our contact form and we'll get back to you as soon as possible.",
              "url": "${myWeb}/contact-me",
              "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-234-567-8900",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": "English"
              },
              "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Sabang",
                  "addressLocality": "Sabang",
                  "addressRegion": "West Bengal",
                  "postalCode": "Zip",
                  "addressCountry": "IN"
              }
          }
          `}
        </script>
      </Helmet>

      {/* Banner Section */}
      <PageBanner BannerData={BannerData} />
      <div className="container mx-auto px-4 py-8">
        {/* Contact Form Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Image */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/Contactme.webp"
              alt="Contact us"
              className="rounded-lg shadow-lg w-full md:w-3/4"
              loading="lazy"
            />
          </motion.div>

          {/* Right Form */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700">
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700">
                      Phone Number
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your Phone Number (10 digits)"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.phone && touched.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700">
                      Email Address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Your Message"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.message && touched.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="message"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                      <span className="block sm:inline">{submitError}</span>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          className="my-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-center text-2xl font-semibold mb-4">Find Me</h2>
          <div className="text-center text-gray-600">
            <p className="font-mono text-lg">
              My Address: <span>Sabang, West Medinipur, West Bengal</span>
            </p>
          </div>
          <div className="relative w-full h-72 mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29563.10647888023!2d87.5988833!3d22.14928625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02cbaf199e8019%3A0xa09be04d4cb645a1!2sBhua%2C%20West%20Bengal%20721144!5e0!3m2!1sen!2sin!4v1737015376843!5m2!1sen!2sin"
              className="w-full h-full rounded-lg shadow-lg"
              title="Google Map - Our Location"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              aria-label="Our location on Google Maps"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactMePage;
