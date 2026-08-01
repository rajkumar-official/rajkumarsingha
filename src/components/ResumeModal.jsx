import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiDownload, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { profile } from "../datas/portfolio";
import { inputClass } from "../utils/forms";
import { submitToSheet } from "../utils/sheets";

// Trim before validating so spaces alone can never satisfy a rule
const trimmed = () =>
  Yup.string().transform((v) => (typeof v === "string" ? v.trim() : v));

const ResumeSchema = Yup.object().shape({
  name: trimmed()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be under 60 characters")
    .matches(/^[A-Za-z][A-Za-z\s.'-]*$/, "Name can only contain letters")
    .required("Name is required"),
  email: trimmed()
    .email("Please enter a valid email address")
    .max(100, "Email must be under 100 characters")
    .required("Email is required"),
  purpose: Yup.string().required("Please select a purpose"),
});

const triggerDownload = () => {
  const link = document.createElement("a");
  link.href = profile.resumeUrl;
  link.download = "Raj_Kumar_Singha_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const ResumeModal = ({ isOpen, onClose }) => {
  // Lock page scroll and close on Escape while the modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await submitToSheet({
      formType: "resume",
      name: values.name.trim(),
      email: values.email.trim(),
      purpose: values.purpose,
    });
    // Never block the download on sheet availability — the lead capture is
    // best-effort, the visitor always gets the resume.
    triggerDownload();
    toast.success("Thanks! Your download has started.");
    resetForm();
    setSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="card w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 id="resume-modal-title" className="text-xl font-semibold">
                  Download my resume
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Quick intro before you grab it — I&apos;d love to know who&apos;s
                  reading.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-white/10 dark:text-slate-300"
              >
                <FiX size={18} />
              </button>
            </div>

            <Formik
              initialValues={{ name: "", email: "", purpose: "" }}
              validationSchema={ResumeSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="resume-name"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>
                    <Field
                      id="resume-name"
                      name="name"
                      type="text"
                      maxLength={60}
                      placeholder="Your full name"
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
                      htmlFor="resume-email"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </label>
                    <Field
                      id="resume-email"
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

                  <div>
                    <label
                      htmlFor="resume-purpose"
                      className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Purpose
                    </label>
                    <Field
                      as="select"
                      id="resume-purpose"
                      name="purpose"
                      className={`${inputClass(
                        errors.purpose && touched.purpose
                      )} cursor-pointer dark:[&>option]:bg-night-800`}
                    >
                      <option value="">Select a purpose…</option>
                      <option value="Hiring / Recruitment">
                        Hiring / Recruitment
                      </option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Networking">Networking</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="purpose"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary group w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Preparing…" : "Download Resume"}
                    <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  </button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
