"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";

const ACTIVITIES = [
  {
    title: "Carnegie Mellon University",
    description:
      "Rising sophomore double majoring in Information Systems and Artificial Intelligence.",
  },
  {
    title: "Cedge.ai",
    description:
      "Quantitative developer intern building investment tools for small hedge funds and individual investors.",
  },
  {
    title: "Changeling Lab · LTI",
    description:
      "Research assistant to Professor David Mortensen at CMU's Language Technologies Institute, studying methods to detect specialized terminology.",
  },
  {
    title: "CMIMC",
    description:
      "Software Head at Carnegie Mellon Informatics and Mathematics Competitions, building grading and admin systems for competitions serving 500+ high school students.",
  },
  {
    title: "Grantflow",
    description:
      "Building an application that helps nonprofits find grants, get personalized recommendations, and complete applications using fine-tuned large language models with retrieval-augmented generation (RAG).",
  },
];

const FEATURED_PROJECTS = [
  {
    title: "Grantflow",
    description:
      "Helps nonprofits find grants, get personalized recommendations, and complete applications with fine-tuned LLMs and RAG.",
    tags: ["LLM", "RAG", "Next.js"],
  },
  // {
  //   title: "CMIMC Platform",
  //   description:
  //     "Grading and admin systems for Carnegie Mellon Informatics and Mathematics Competitions, serving 500+ high school students.",
  //   tags: ["Full-stack", "TypeScript"],
  // },
  // {
  //   title: "Cedge.ai Tools",
  //   description:
  //     "Investment tooling for small hedge funds and individual investors, built as a quantitative developer intern.",
  //   tags: ["Python", "Quant"],
  // },
];

export default function ActivitiesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <>
      <style>{`
        .font-minecraft { font-family: 'Press Start 2P', monospace; }
        .font-mono-dm  { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

      <div className="font-mono-dm min-h-screen overflow-x-hidden bg-[#080b10] text-slate-200">
        <section className="relative mx-auto max-w-5xl px-12 pb-24 pt-32">
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px]
                          -translate-x-1/4 rounded-full
                          bg-[radial-gradient(circle,rgba(74,222,128,0.07)_0%,transparent_70%)]" />

          <div className={`mb-10 transition-all duration-700 delay-[50ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="font-minecraft mb-4 text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.4] text-white">
              Activities
            </h1>
            <h2 className="text-lg text-slate-400">
              What I am doing right now.
            </h2>
          </div>

          <ul
            className={`list-none space-y-4 transition-all duration-700 delay-150
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {ACTIVITIES.map((activity) => (
              <li key={activity.title} className="flex gap-3">
                <span
                  className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-green-400"
                  aria-hidden
                />
                <p className="text-lg leading-snug text-slate-400">
                  <span className="text-white">{activity.title}</span>
                  {" — "}
                  {activity.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-5xl px-12 pb-24">
          <h2
            className={`font-minecraft mb-8 text-[1.1rem] text-white transition-all duration-700 delay-200
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Featured Projects
          </h2>
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700 delay-300
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
              />
            ))}
          </div>
        </section>

        <footer className="mx-auto flex max-w-5xl flex-wrap items-center justify-between
                           gap-2 border-t border-white/[0.07] px-12 py-6
                           text-[0.65rem] tracking-wide text-slate-500">
          <span>Designed &amp; built by me</span>
        </footer>
      </div>
    </>
  );
}
