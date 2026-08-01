import emailjs from "@emailjs/browser";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SectionHeading from "./SectionHeading";
import { contactChannels, profile, socials } from "../datas/portfolio";
import {
  emailJsPublicKey,
  emailJsServiceId,
  emailJsTempplateId,
} from "../utils/constants";
import { inputClass } from "../utils/forms";
import { submitToSheet } from "../utils/sheets";

// Email is optional — the form still works (via the Google Sheet) when
// EmailJS isn't configured or its Gmail connection has expired.
const emailConfigured = Boolean(
  emailJsPublicKey && emailJsServiceId && emailJsTempplateId
);

if (emailConfigured) {
  emailjs.init(emailJsPublicKey);
}

const sendEmailNotification = (values) =>
  emailjs.send(emailJsServiceId, emailJsTempplateId, {
    to_name: values.name,
    to_email: values.email,
    message: `Phone: ${values.phone || "—"}\nMessage: ${values.message}`,
  });

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string().matches(
    /^\d{10}$/,
    "Please enter a valid 10-digit phone number"
  ),
  message: Yup.string()
    .min(10, "Message should be at least 10 characters long")
    .required("Message is required"),
});

const Contact = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Save to the Google Sheet and send the email notification in
      // parallel — either one succeeding counts as a delivered message.
      const [sheetResult, emailResult] = await Promise.allSettled([
        submitToSheet({ formType: "contact", ...values }),
        emailConfigured
          ? sendEmailNotification(values)
          : Promise.reject(new Error("EmailJS is not configured")),
      ]);

      const sheetOk =
        sheetResult.status === "fulfilled" && sheetResult.value === true;
      const emailOk = emailResult.status === "fulfilled";

      if (!emailOk) {
        const reason = emailResult.reason?.text || emailResult.reason;
        console.error("EmailJS failed:", reason);
        if (String(reason).toLowerCase().includes("invalid grant")) {
          console.error(
            "Fix: EmailJS dashboard → Email Services → your Gmail service → " +
              "Reconnect account (tick 'Send email on your behalf')."
          );
        }
      }

      if (sheetOk || emailOk) {
        toast.success("Thanks for reaching out! I'll get back to you soon.");
        resetForm();
      } else {
        toast.error("Couldn't send your message. Please email me directly.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Couldn't send your message. Please email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have a project in mind or a role to discuss? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-4"
          >
            {contactChannels.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Location" ? "_blank" : undefined}
                rel={label === "Location" ? "noopener noreferrer" : undefined}
                className="card group flex items-center gap-4 p-5 hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-500/40"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-xl text-brand-500 transition-transform duration-300 group-hover:scale-110">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {label}
                  </p>
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {value}
                  </p>
                </div>
              </a>
            ))}

            <div className="card overflow-hidden">
              <iframe
                src={profile.mapEmbedUrl}
                className="h-56 w-full grayscale transition-all duration-500 hover:grayscale-0 dark:opacity-80"
                title={`Map — ${profile.location}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="card p-6 sm:p-8"
          >
            <Formik
              initialValues={{ name: "", email: "", phone: "", message: "" }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className={inputClass(errors.name && touched.name)}
                      />
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass(errors.email && touched.email)}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 text-xs text-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Phone{" "}
                      <span className="text-xs font-normal text-slate-400">
                        (optional)
                      </span>
                    </label>
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="10-digit phone number"
                      className={inputClass(errors.phone && touched.phone)}
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tell me about your project…"
                      className={`${inputClass(
                        errors.message && touched.message
                      )} resize-none`}
                    />
                    <ErrorMessage
                      name="message"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary group w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                    <FiSend className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </button>

                  <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                    Prefer email? Reach me directly at{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-medium text-brand-500 hover:underline"
                    >
                      {profile.email}
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>

        {/* Socials row */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {socials.map(({ label, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:text-brand-500 hover:shadow-glow dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              <Icon size={19} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
