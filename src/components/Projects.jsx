import { motion } from "framer-motion";
import { FiExternalLink, FiFolder, FiStar, FiTrendingUp } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { projects } from "../datas/portfolio";

const Projects = () => (
  <section id="projects" className="section bg-white/60 dark:bg-night-900/50">
    <div className="container-x">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured projects"
        subtitle="Products I've built and owned — from SaaS platforms to open source."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="card group relative flex flex-col overflow-hidden p-6 hover:-translate-y-1.5 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-500/40"
          >
            {/* Corner glow on hover */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-500/15 text-xl text-brand-500">
                <FiFolder />
              </span>
              <div className="flex items-center gap-2">
                {project.featured && (
                  <span className="chip !border-accent-500/40 !bg-accent-500/10 !text-accent-700 dark:!text-accent-400">
                    <FiStar className="text-xs" /> Featured
                  </span>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-white/10 dark:text-slate-300"
                  >
                    <FiExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {project.title}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              {project.kind} · {project.period}
            </p>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {project.description}
            </p>

            <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-accent-700 dark:text-accent-400">
              <FiTrendingUp />
              {project.highlight}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-white/5">
              {project.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
