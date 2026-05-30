"use client";

import { useState, useEffect } from "react";
import ProjectCard, { type ProjectCardProps } from "@/components/ProjectCard";

const GENERAL_PROJECTS: ProjectCardProps[] = [
  {
    title: "Grantflow",
    description:
      "Helps nonprofits find grants, get personalized recommendations, and complete applications with fine-tuned LLMs and RAG.",
    tags: ["React", "TypeScript", "Python", "Hugging Face Embeddings", "OpenAI API", "RAG", "Rest API"],
    href: "https://github.com/allanhotpotato/ProdHacks-ab2gene-",
  },
  {
    title: "This personal website!",
    description:
      "This personal website that you are currently on! Includes a finger navigation feature powered by MediaPipe.",
    tags: ["React", "Next.js", "TypeScript", "MediaPipe"],
    href: "https://github.com/Eugene-S-Hwang/personal-website",
  },
  {
    title: "Personal Kanban Board",
    description:
      "A personal kanban board that I quickly made in a weekend.",
    tags: ["Supabase", "React", "TypeScript"],
    href: "https://github.com/Eugene-S-Hwang/Personal_Kanban_Board",
  },
  {
    title: "Score Calculator for CMWMC (Carnegie Mellon Winter Math Competition)",
    description:
      "A score calculator for participants of CMWMC 2025. Sent to all participants of the contest (60+).",
    tags: ["Python", "Streamlit", "Google Sheets API"],
    href: "https://github.com/Eugene-S-Hwang/CMWMC_2025_Score_Calculator",
  },
];

const CONTEST_PROJECTS: ProjectCardProps[] = [
  {
    title: "MosaicGPU",
    description:
      "Reached TartanHacks 2026 Top 10. A web application that utilizes GPU power of multiple devices for 3D image rendering.",
    tags: ["Supabase", "AWS", "WebGPU", "React"],
    href: "https://github.com/asanth7/distributeGPU",
  },
  {
    title: "AWAP 2026 Game Engine",
    description:
      "Won 4th Place in Algorithms with a Purpose 2026 (Advanced Division). An algorithmic programming competition hosted by ACM@CMU.",
    tags: ["Python"],
    href: "https://github.com/Eugene-S-Hwang/awap-2026",
  },
  {
    title: "CompostED",
    description:
      "A virtual compost simulator that my teammate and I submitted to HackNYU 2025.",
    tags: ["Python", "Streamlit", "Ollama"],
    href: "https://devpost.com/software/composted",
  },
  {
    title: "My USACO Solutions",
    description:
      "My solutions for various USACO problems, ranging from Bronze to Gold division.",
    tags: ["C++", "Python"],
    href: "https://github.com/Eugene-S-Hwang/USACO",
  },
];

const RESEARCH_PROJECTS: ProjectCardProps[] = [
  {
    title: "Detecting Specialized Words",
    description:
      "Part of my research at the LTI. Downloading arXiv papers and running TF-IDF and BM25 analyses on them.",
    tags: ["Python", "Streamlit", "Google Cloud Platform", "TF-IDF", "BM25"],
    href: "https://github.com/Eugene-S-Hwang/specialized_terms",
  },
  {
    title: "Analyzing Semantic Shifts within American Political Parties",
    description:
      "My research project for the Wolfram Summer Research Program in 2024.",
    tags: [
      "Wolfram Language",
      "Word Embedding",
      "Natural Language Processing",
      "ML",
      "TF-IDF",
    ],
    href: "https://community.wolfram.com/groups/-/m/t/3213886",
  },
];

const PROJECT_SECTIONS = [
  { title: "General", projects: GENERAL_PROJECTS },
  { title: "Contests", projects: CONTEST_PROJECTS },
  { title: "Research", projects: RESEARCH_PROJECTS },
] as const;

function ProjectGrid({ projects }: { projects: ProjectCardProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          description={project.description}
          tags={project.tags}
          href={project.href}
        />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <>
      <style>{`
        .font-minecraft { font-family: 'Press Start 2P', monospace; }
        .font-mono-dm  { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

      <div className="font-mono-dm min-h-screen overflow-x-hidden bg-[#080b10] text-slate-200">
        <section className="relative mx-auto max-w-5xl px-12 pb-12 pt-20">
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px]
                          -translate-x-1/4 rounded-full
                          bg-[radial-gradient(circle,rgba(74,222,128,0.07)_0%,transparent_70%)]" />

          <div
            className={`mb-16 transition-all duration-700 delay-[50ms]
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h1 className="font-minecraft mb-4 text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.4] text-white">
              Projects
            </h1>
            <p className="max-w-2xl text-lg leading-snug text-slate-400">
              Look at what I&apos;ve worked on! These only include projects that
              I&apos;ve been a part of since its creation (not including my work
              for CMIMC).
            </p>
          </div>

          <div
            className={`space-y-16 transition-all duration-700 delay-150
                        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {PROJECT_SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-minecraft mb-6 text-[1.1rem] text-white">
                  {section.title}
                </h2>
                <ProjectGrid projects={section.projects} />
              </div>
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
