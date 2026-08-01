import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { navLinks, profile, socials } from "../datas/portfolio";

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="border-t border-slate-200/80 bg-white/70 dark:border-white/5 dark:bg-night-900/70">
      <div className="container-x flex flex-col items-center gap-6 py-10">
        <a href="#home" aria-label="Back to top">
          <img src={profile.logo} alt={profile.name} className="h-10 w-auto" />
        </a>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-brand-500 dark:text-slate-400 dark:hover:text-brand-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {socials.map(({ label, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-500 dark:border-white/10 dark:text-slate-300"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Crafted with React &
          Tailwind CSS.
        </p>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top"
        className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-gradient-to-r from-brand-600 to-brand-400 text-white shadow-glow transition-all duration-300 hover:-translate-y-1 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <FiArrowUp size={18} />
      </button>
    </footer>
  );
};

export default Footer;
