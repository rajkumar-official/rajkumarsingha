import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { experiences } from "../datas/portfolio";

const Experience = () => (
  <section id="experience" className="section">
    <div className="container-x">
      <SectionHeading
        eyebrow="Career"
        title="Work experience"
        subtitle="4+ years of shipping production software across three companies."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Timeline rail */}
        <div
          className="absolute bottom-4 left-5 top-2 w-px bg-gradient-to-b from-brand-500 via-brand-400/40 to-transparent sm:left-6"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {experiences.map((job, i) => (
            <motion.article
              key={job.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative pl-14 sm:pl-16"
            >
              {/* Timeline node */}
              <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-brand-200 bg-white text-brand-500 shadow-sm dark:border-brand-500/30 dark:bg-night-800 sm:h-12 sm:w-12">
                <FiBriefcase className="text-lg" />
              </span>

              <div className="card p-6 hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-500/40">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{job.role}</h3>
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                      {job.company}
                    </p>
                  </div>
                  <span
                    className={`chip ${
                      job.current
                        ? "!border-accent-500/40 !bg-accent-500/10 !text-accent-700 dark:!text-accent-400"
                        : ""
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
