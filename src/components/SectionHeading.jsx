import { motion } from "framer-motion";

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
  >
    <span className="mb-3 inline-block rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-400">
      {eyebrow}
    </span>
    <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
