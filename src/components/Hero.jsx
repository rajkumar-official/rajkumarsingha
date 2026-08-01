import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { profile, socials, stats } from "../datas/portfolio";

// Lightweight typewriter for the rotating role line
const useTypewriter = (words, typeSpeed = 70, deleteSpeed = 40, pause = 1800) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === word) {
      delay = pause;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
};

const Hero = () => {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="home" className="relative overflow-hidden pt-32 sm:pt-36">
      {/* Background: grid + brand-colored glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-night-950" />
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl animate-blob" />
        <div className="absolute -right-24 top-48 h-80 w-80 rounded-full bg-accent-500/15 blur-3xl animate-blob [animation-delay:4s]" />
      </div>

      <div className="container-x relative grid items-center gap-14 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold text-accent-700 dark:text-accent-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Available for new opportunities
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl xl:text-6xl">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="mt-4 min-h-8 text-xl font-semibold text-slate-800 dark:text-slate-100 sm:text-2xl">
            {typed}
            <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-brand-500 text-transparent">
              |
            </span>
          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400 lg:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a href="#projects" className="btn-primary group">
              View My Work
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={profile.resumeUrl}
              download="Raj_Kumar_Singha_Resume.pdf"
              className="btn-outline group"
            >
              <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
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
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-64 sm:w-80 lg:w-full lg:max-w-sm"
        >
          <div className="relative aspect-square">
            {/* Rotating gradient ring */}
            <div className="absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,#1cb0e6,#a3d639,#1cb0e6)] opacity-80 blur-[2px] animate-spin-slow" />
            <div className="absolute -inset-1 rounded-full bg-slate-50 dark:bg-night-950" />
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative h-full w-full rounded-full border-4 border-white object-cover object-top shadow-card dark:border-night-800"
            />

            {/* Floating badges */}
            <div className="absolute -left-6 top-8 animate-float rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2 shadow-card backdrop-blur dark:border-white/10 dark:bg-night-800/90 sm:-left-10">
              <p className="text-lg font-bold text-brand-500">4+</p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Years Experience
              </p>
            </div>
            <div className="absolute -right-4 bottom-10 animate-float-delay rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2 shadow-card backdrop-blur dark:border-white/10 dark:bg-night-800/90 sm:-right-8">
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                Full-Stack
              </p>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Next.js · Node.js · TS
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="container-x relative pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card grid grid-cols-2 divide-slate-200/80 dark:divide-white/10 sm:grid-cols-4 sm:divide-x"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-6 text-center">
              <p className="gradient-text text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
