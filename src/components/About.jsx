import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { certifications, education, profile, services } from "../datas/portfolio";

const About = () => (
  <section id="about" className="section">
    <div className="container-x">
      <SectionHeading
        eyebrow="About Me"
        title="Engineering products, not just features"
        subtitle="From architecture to deployment — I own the whole journey."
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Bio + what I do */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="card group p-5 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-500/40"
              >
                <FiCheckCircle className="mb-3 text-xl text-brand-500 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-base font-semibold">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education + certifications */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-xl text-brand-500">
                <FiBookOpen />
              </span>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
              <p className="font-semibold text-slate-800 dark:text-white">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {education.school}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="chip">{education.period}</span>
                <span className="chip !border-accent-500/30 !bg-accent-500/10 !text-accent-700 dark:!text-accent-400">
                  {education.score}
                </span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-xl text-accent-600">
                <FiAward />
              </span>
              <h3 className="text-lg font-semibold">Certifications</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-brand-500" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
