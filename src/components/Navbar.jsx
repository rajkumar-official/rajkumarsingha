import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { navLinks, profile } from "../datas/portfolio";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Highlight the nav link of the section currently in view
      let current = "home";
      for (const link of navLinks) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 160) {
          current = link.href.slice(1);
        }
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:pt-4">
      <nav
        className={`container-x flex h-16 items-center justify-between rounded-full border px-4 backdrop-blur-xl transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-slate-200/90 bg-white/90 shadow-nav dark:border-white/10 dark:bg-night-900/90"
            : "border-slate-200/60 bg-white/70 shadow-nav dark:border-white/10 dark:bg-night-900/70"
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex shrink-0 items-center"
          aria-label={`${profile.name} — home`}
        >
          <img
            src={profile.logo}
            alt={profile.name}
            className="h-9 w-auto sm:h-10"
          />
        </a>

        {/* Center links (desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition-all duration-300 hover:border-brand-400 hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-brand-400"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDarkMode ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid place-items-center"
              >
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a href="#contact" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Hire Me
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/60 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:hidden"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="container-x mt-2 lg:hidden"
          >
            <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-nav backdrop-blur-xl dark:border-white/10 dark:bg-night-900/95">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNavClick}
                      className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        activeSection === link.href.slice(1)
                          ? "bg-brand-50 text-brand-600 dark:bg-white/5 dark:text-brand-400"
                          : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={handleNavClick}
                className="btn-primary mt-3 w-full"
              >
                Hire Me
                <FiArrowRight />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
