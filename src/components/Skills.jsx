import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { marqueeSkills, skillCategories } from "../datas/portfolio";

const Skills = () => (
  <section id="skills" className="section bg-white/60 dark:bg-night-900/50">
    <div className="container-x">
      <SectionHeading
        eyebrow="Skills"
        title="My technical arsenal"
        subtitle="Tools and technologies I use to bring products to life."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="card p-6 hover:-translate-y-1 hover:border-brand-300 dark:hover:border-brand-500/40"
          >
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map(({ name, icon: Icon, color }) => (
                <span
                  key={name}
                  className="chip !py-1.5 !text-[13px] transition-all duration-200 hover:scale-105 hover:border-brand-300 dark:hover:border-brand-500/50"
                >
                  <Icon style={{ color }} className="text-base" />
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Infinite tech marquee */}
    <div className="mask-fade-x mt-14 overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 px-5">
        {[...marqueeSkills, ...marqueeSkills].map(
          ({ name, icon: Icon, color }, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-slate-400 dark:text-slate-500"
            >
              <Icon style={{ color }} className="text-2xl" />
              {name}
            </span>
          )
        )}
      </div>
    </div>
  </section>
);

export default Skills;
