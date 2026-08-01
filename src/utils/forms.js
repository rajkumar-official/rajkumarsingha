// Shared input styling for the contact form and resume-download modal
export const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 ${
    hasError
      ? "border-red-400 dark:border-red-500/60"
      : "border-slate-200 dark:border-white/10"
  }`;
