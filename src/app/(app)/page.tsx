"use client";
import React, { useEffect, useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, setActiveSection, setProjectFilter, toggleMobileMenu, closeMobileMenu, setActiveSkillCategory } from "@/store/store";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

// ─── Utility ──────────────────────────────────────────────────────────────────
const cn = (...classes:any[]) => classes.filter(Boolean).join(" ");

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const Icon = {
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  ExternalLink: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  Cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <path strokeLinecap="round" d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/>
    </svg>
  ),
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const dispatch = useDispatch();
  const { mobileMenuOpen } = useSelector((s:any) => s.ui);
  const [scrolled, setScrolled] = useState(false);
  const { personal } = PORTFOLIO_DATA;

 

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    // { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id:string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    dispatch(closeMobileMenu());
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-gray-950/90 backdrop-blur-md border-b border-cyan-900/30 py-3" : "py-5"
    )}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Icon.Brain />
          </div>
          <span className="font-mono text-sm font-semibold text-white tracking-wider">
            {personal.name.split(" ")[0]}<span className="text-cyan-400">.</span>dev
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-cyan-400 font-mono transition-colors duration-200 rounded-lg hover:bg-cyan-950/40"
            >
              {link.label}
            </button>
          ))}
          <a
            href={`mailto:${personal.email}`}
            className="ml-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono rounded-lg hover:bg-cyan-500/20 transition-all duration-200"
          >
            Hire Me →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => dispatch(toggleMobileMenu())}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <Icon.X /> : <Icon.Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md border-t border-cyan-900/30 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left px-4 py-3 text-gray-300 font-mono text-sm hover:text-cyan-400 hover:bg-cyan-950/30 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { personal, stats } = PORTFOLIO_DATA;
   const [launchingEmail,setLaunchingEmail] = React.useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" style={{ backgroundImage: "linear-gradient(to right, rgba(6,182,212,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.07) 1px, transparent 1px)" }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-950/60 border border-cyan-800/50 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-300 tracking-wider">
            {personal.availableForWork ? "AVAILABLE FOR AI PROJECTS" : "OPEN TO OPPORTUNITIES"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
          <span className="block">Full Stack</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            → GenAI Dev
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-4 leading-relaxed font-light">
          {personal.tagline}
        </p>

        {/* Current pursuit badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/40 border border-violet-700/30 rounded-lg mb-10">
          <Icon.Brain />
          <span className="text-xs text-violet-300 font-mono">Currently: PG Certificate in GenAI & Agentic AI</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 text-sm"
          >
            Learn More
          </button>
          
            { launchingEmail?
            (<div
            className="px-8 py-3.5 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-cyan-700 hover:text-cyan-400 transition-all text-sm"
            >
              Loading
            </div>)
            :(<a
              onClick={()=>{
                setLaunchingEmail(true);
                setTimeout(()=>setLaunchingEmail(false),2000);
              }}
              href={`mailto:${personal.email}`}
              className="px-8 py-3.5 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:border-cyan-700 hover:text-cyan-400 transition-all text-sm"
            >
              Get In Touch
            </a>)
            }
          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900/60 border border-gray-800/60 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-black text-cyan-400 font-mono">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection() {
  const { personal, about, education, certifications } = PORTFOLIO_DATA;

  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6">
      <SectionHeader label="About" title="The Developer Behind the Code" />

      <div className="grid md:grid-cols-2 gap-16 mt-16 items-start">
        <div>
          <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">{about}</p>

          <div className="flex gap-4">
            <a href={personal.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono">
              <Icon.Github /><span>GitHub</span>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm font-mono">
              <Icon.Linkedin /><span>LinkedIn</span>
            </a>
            <a href={`mailto:${personal.email}`}
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm font-mono">
              <Icon.Mail /><span>Email</span>
            </a>
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Education & Certs</h3>
          {education.map((ed) => (
            <div
              key={ed.degree}
              className={cn(
                "p-5 rounded-xl border transition-colors",
                ed.highlight
                  ? "bg-gradient-to-r from-violet-950/40 to-cyan-950/40 border-violet-700/40"
                  : "bg-gray-900/40 border-gray-800/50"
              )}
            >
              {ed.highlight && (
                <span className="text-xs font-mono text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded mb-2 inline-block">
                  In Progress
                </span>
              )}
              <div className="text-sm font-semibold text-white leading-snug">{ed.degree}</div>
              <div className="text-xs text-gray-500 mt-1">{ed.institution} · {ed.period}</div>
            </div>
          ))}

          {certifications.map((cert) => (
            <div key={cert.name} className="flex items-center justify-between py-3 border-b border-gray-800/50">
              <div>
                <div className="text-sm text-gray-300">{cert.name}</div>
                <div className="text-xs text-gray-600">{cert.issuer}</div>
              </div>
              <span className="text-xs font-mono text-gray-600">{cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
function SkillsSection() {
  const dispatch = useDispatch();
  const { activeSkillCategory } = useSelector((s:any) => s.ui);
  const { skills } = PORTFOLIO_DATA;
  const categories = Object.keys(skills);

  return (
    <section id="skills" className="py-28 bg-gray-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader label="Skills" title="Technical Arsenal" />

        <div className="flex flex-wrap gap-2 mt-12 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setActiveSkillCategory(cat))}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-mono transition-all",
                activeSkillCategory === cat
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-cyan-800 hover:text-cyan-400"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {(skills as any)[activeSkillCategory].map((skill:any) => (
            <div key={skill.name} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 font-medium">{skill.name}</span>
                <span className="text-xs font-mono text-cyan-500">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
// function ProjectsSection() {
//   const dispatch = useDispatch();
//   const { activeProjectFilter } = useSelector((s) => s.ui);
//   const { projects } = PORTFOLIO_DATA;
//   const filters = ["All", "AI", "Web"];

//   const filtered = activeProjectFilter === "All"
//     ? projects
//     : projects.filter((p) => p.category === activeProjectFilter);

//   return (
//     <section id="projects" className="py-28 max-w-6xl mx-auto px-6">
//       <SectionHeader label="Projects" title="Things I've Built" />

//       <div className="flex gap-2 mt-12 mb-10">
//         {filters.map((f) => (
//           <button
//             key={f}
//             onClick={() => dispatch(setProjectFilter(f))}
//             className={cn(
//               "px-4 py-2 rounded-lg text-sm font-mono transition-all",
//               activeProjectFilter === f
//                 ? "bg-cyan-500 text-white"
//                 : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-cyan-800 hover:text-cyan-400"
//             )}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filtered.map((project) => (
//           <ProjectCard key={project.title} project={project} />
//         ))}
//       </div>
//     </section>
//   );
// }

function ProjectCard({ project }:any) {
  const isAI = project.category === "AI";
  return (
    <div className={cn(
      "group relative flex flex-col p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      isAI
        ? "bg-gradient-to-br from-gray-900 to-cyan-950/20 border-cyan-900/40 hover:border-cyan-700/60 hover:shadow-cyan-950/40"
        : "bg-gray-900/60 border-gray-800/50 hover:border-gray-700 hover:shadow-gray-900/40"
    )}>
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          isAI ? "bg-cyan-500/10 text-cyan-400" : "bg-blue-500/10 text-blue-400"
        )}>
          {isAI ? <Icon.Brain /> : <Icon.Cpu />}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-mono px-2 py-0.5 rounded-full",
            project.status === "live"
              ? "text-green-400 bg-green-950/50"
              : "text-amber-400 bg-amber-950/50"
          )}>
            {project.status === "live" ? "● live" : "⚡ building"}
          </span>
        </div>
      </div>

      <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag:string) => (
          <span key={tag} className="text-xs px-2 py-1 bg-gray-800/70 text-gray-400 rounded-md font-mono">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <a href={project.github} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors font-mono">
          <Icon.Github /><span>Code</span>
        </a>
        <a href={project.link} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-cyan-400 transition-colors font-mono">
          <Icon.ExternalLink /><span>Live</span>
        </a>
      </div>
    </div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
function ExperienceSection() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-28 bg-gray-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader label="Experience" title="Where I've Worked" />

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent" />

          <div className="space-y-12 pl-16">
            {experience.map((exp) => (
              <div key={exp.company} className="relative">
                {/* Dot */}
                <div className="absolute -left-[41px] w-3 h-3 rounded-full bg-cyan-500 border-2 border-gray-950 top-1" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-cyan-400 text-sm font-medium">{exp.company}</span>
                      <span className="text-xs font-mono text-gray-600 bg-gray-800/50 px-2 py-0.5 rounded">{exp.period}</span>
                      {exp.type === "consulting" && (
                        <span className="text-xs font-mono text-violet-400 bg-violet-950/40 border border-violet-800/30 px-2 py-0.5 rounded">Consulting</span>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                      <span className="text-cyan-500 mt-0.5 shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="py-28 max-w-6xl mx-auto px-6">
      <div className="relative rounded-3xl bg-gradient-to-br from-gray-900 via-cyan-950/20 to-gray-900 border border-cyan-900/30 p-12 md:p-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08),transparent_60%)]" />

        <div className="relative">
          <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">{`Let's Build Together`}</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6">
            Have an AI project in mind?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            {`Whether you're looking to integrate LLMs into your product, build agentic workflows,
            or develop intelligent applications — let's talk.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
            >
              <Icon.Mail />
              <span>Send a Message</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-gray-800 text-gray-300 font-semibold rounded-xl hover:bg-gray-700 transition-colors"
            >
              <Icon.Linkedin />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { personal } = PORTFOLIO_DATA;
  return (
    <footer className="py-8 border-t border-gray-800/50 text-center">
      <p className="text-gray-600 text-sm font-mono">
        {personal.name} · {new Date().getFullYear()} · Built with React + Redux
      </p>
    </footer>
  );
}

// ─── Shared: Section Header ───────────────────────────────────────────────────
function SectionHeader({ label, title }:{label:string,title:string}) {
  return (
    <div>
      <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">{label}</span>
      <h2 className="text-4xl font-black text-white mt-2">{title}</h2>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
function AppContent() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      {/* <ProjectsSection /> */}
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
