import {
  FaAws,
  FaGithub,
  FaLinkedinIn,
  FaNpm,
} from "react-icons/fa6";
import {
  SiBootstrap,
  SiCss3,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRender,
  SiStrapi,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const profile = {
  name: "Raj Kumar Singha",
  firstName: "Raj",
  role: "Senior Software Engineer",
  roles: [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Next.js & Node.js Specialist",
    "Product Owner",
  ],
  tagline:
    "I design, build and ship secure, scalable, production-grade software — owning products end-to-end from architecture to deployment.",
  summary:
    "Software Engineer with 4+ years of experience across full-stack web development and product ownership, specializing in Next.js, React, Node.js, TypeScript, Express.js, PostgreSQL and MongoDB, with working knowledge of AWS and Azure. Currently a Senior Software Engineer at Tech Exactly, owning products end-to-end — including a HIPAA-compliant healthcare claims platform and a multi-tenant SaaS API platform for psychometric assessments.",
  email: "rajkumarsinghaofficial@gmail.com",
  phone: "+91 9083960663",
  location: "Sabang, West Bengal, India",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29563.10647888023!2d87.5988833!3d22.14928625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02cbaf199e8019%3A0xa09be04d4cb645a1!2sBhua%2C%20West%20Bengal%20721144!5e0!3m2!1sen!2sin!4v1737015376843!5m2!1sen!2sin",
  resumeUrl: "/raj-kumar-singha-sde.pdf",
  photo: "/raj_kumar.jpg",
  logo: "/raj-logo.png",
};

export const socials = [
  {
    label: "GitHub",
    url: "https://github.com/Raj-kumar-singha",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/raj-kumar-singha-63a7b5169",
    icon: FaLinkedinIn,
  },
  {
    label: "npm",
    url: "https://www.npmjs.com/package/meetschedify",
    icon: FaNpm,
  },
];

export const contactChannels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: FiMail,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: FiPhone,
  },
  {
    label: "Location",
    value: profile.location,
    href: "https://maps.google.com/?q=Sabang,West+Bengal",
    icon: FiMapPin,
  },
];

export const stats = [
  { value: "4+", label: "Years of Experience" },
  { value: "10+", label: "Projects Delivered" },
  { value: "3", label: "Companies" },
  { value: "1", label: "npm Package Published" },
];

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#9ca3af" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#9ca3af" },
      { name: "REST APIs", icon: SiPostman, color: "#FF6C37" },
      { name: "Strapi CMS", icon: SiStrapi, color: "#4945FF" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Azure", icon: VscAzure, color: "#0078D4" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#9ca3af" },
      { name: "Render", icon: SiRender, color: "#8A05FF" },
      { name: "CI/CD", icon: SiGithub, color: "#9ca3af" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#9ca3af" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ],
  },
];

// Flat list used by the scrolling tech marquee
export const marqueeSkills = skillCategories.flatMap((c) => c.skills);

export const experiences = [
  {
    company: "Tech Exactly",
    role: "Senior Software Engineer",
    period: "Mar 2026 — Present",
    current: true,
    points: [
      "Full ownership of product delivery across frontend, backend and deployment.",
      "Built EOB-MAX, a HIPAA-compliant healthcare claims platform for attorneys and medical practices, from the ground up.",
      "Sole engineer on Psychometric Insights — a multi-tenant SaaS API platform — owning backend, frontend and deployment end-to-end.",
    ],
    tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    company: "WATNXT Technologies (WEZO)",
    role: "Full Stack Developer",
    period: "Feb 2025 — Feb 2026",
    points: [
      "Led a development team and guided best practices across frontend and backend.",
      "Architected web-performance optimizations, cutting load times and boosting efficiency.",
      "Worked directly with stakeholders to gather requirements and ship business-driven solutions; mentored juniors and ran code reviews.",
    ],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    company: "MSYS Technologies",
    role: "Software Engineer",
    period: "Aug 2022 — Dec 2024",
    points: [
      "Built scalable full-stack apps with Next.js and Node.js, improving performance by 30%.",
      "Integrated Strapi CMS (–40% content-management time) and optimized UI/UX (–25% bounce rate).",
      "Led MongoDB → PostgreSQL migrations with 100% data integrity and implemented secure authentication protocols.",
    ],
    tech: ["Next.js", "Node.js", "Strapi", "MongoDB", "PostgreSQL"],
  },
];

export const projects = [
  {
    title: "Psychometric Insights",
    kind: "Multi-Tenant SaaS API Platform",
    period: "2026 — Present",
    featured: true,
    description:
      "SaaS platform providing psychometric assessment APIs that schools, colleges and companies integrate into their own products. Admin & client panels manage multilingual question sets (US, UK, Haiti, Hindi, Spanish and more); end-users get score bands via API with zero user data stored on the platform.",
    highlight: "Sole engineer — backend, frontend & deployment",
    tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    title: "EOB-MAX",
    kind: "HIPAA-Compliant Healthcare Claims Platform",
    period: "2026",
    featured: true,
    description:
      "Secure claims platform managing EOB, AOB and CMS-1500 forms, medical records, billing data and claim documents. APIs for practices, claims, audit logs and auth, with file hashing, pre-signed document viewing, PHI/PII isolation and immutable audit logs.",
    highlight: "Built from the ground up, HIPAA-focused",
    tech: ["Node.js", "Express", "React", "PostgreSQL", "AWS S3"],
  },
  {
    title: "Watnxt",
    kind: "Job & Internship Matching Platform",
    period: "2025 — 2026",
    description:
      "Next.js career platform for students and employers with real-time application tracking, role-based dashboards, and backend workflows that cut query execution times by 30%.",
    highlight: "–30% query execution time",
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Remzo Platform",
    kind: "Multi-Tenant SaaS HR & Attendance System",
    period: "2025",
    description:
      "Multi-tenant HR platform with Admin, Employer and Employee portals, automated timezone-aware attendance with cron auto check-outs (–60% manual errors), Stripe subscriptions and React Query caching (+40% fetch efficiency).",
    highlight: "–60% manual errors, +40% fetch efficiency",
    tech: ["Next.js", "TypeScript", "Express", "MongoDB", "Stripe"],
  },
  {
    title: "HUMD",
    kind: "AI-Powered Printing & SaaS Marketplace",
    period: "2025",
    description:
      "Scalable e-commerce platform with GraphQL/Hasura, custom caching strategies that cut data-fetching times by 40%, secure payments and streamlined order management.",
    highlight: "–40% data-fetching time",
    tech: ["Next.js", "React", "GraphQL", "Hasura", "Apollo"],
  },
  {
    title: "meetschedify",
    kind: "Open-Source npm Package",
    period: "Open Source",
    description:
      "Published npm package providing a reusable meeting-scheduling utility for JavaScript and Node.js projects.",
    highlight: "Live on the npm registry",
    tech: ["JavaScript", "Node.js", "npm"],
    link: "https://www.npmjs.com/package/meetschedify",
  },
];

export const education = {
  school: "Dream Institute of Technologies, Kolkata",
  degree: "B.Tech — Electronics & Communication Engineering",
  period: "2018 — 2022",
  score: "8.82 CGPA",
};

export const certifications = [
  "Node.js Development — Udemy",
  "Full Stack Development — PW Skills",
  "DevOps — Tutedude",
  "Startup India Learning Program — Upgrad",
];

export const services = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end web apps with Next.js, React, Node.js and TypeScript — from clean UI to robust APIs.",
  },
  {
    title: "System Architecture",
    description:
      "Scalable, multi-tenant SaaS architectures with security, caching and performance designed in from day one.",
  },
  {
    title: "Product Ownership",
    description:
      "Owning delivery from requirements through deployment — collaborating directly with stakeholders.",
  },
  {
    title: "Team Leadership",
    description:
      "Leading teams, mentoring developers and enforcing quality through reviews and best practices.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
