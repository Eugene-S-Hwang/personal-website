"use client";
import { useState, useEffect } from "react";

// ─── Font loader (add to your layout.tsx instead if preferred) ───────────────
// In layout.tsx: import { Press_Start_2P, DM_Mono } from "next/font/google"
// Then pass className to <body>. For portability we load via <link> here.

const STACK = ["Python", "SQL", "React", "TypeScript", "Node.js", "Next.js", "C++", "C", "Google Cloud", "Supabase"];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <>
      {/* Google Fonts — move to layout.tsx for production */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Press+Start+2P&display=swap"
      />

      {/* Keyframes that Tailwind can't express inline */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .animate-blink { animation: blink 1s step-end infinite; }
        .font-minecraft { font-family: 'Press Start 2P', monospace; }
        .font-mono-dm  { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

      <div className="font-mono-dm min-h-screen overflow-x-hidden bg-[#080b10] text-slate-200">
        {/* ── Hero ────────────────────────────────────────── */}
        <section className="relative mx-auto flex max-w-5xl flex-col
                            justify-center px-12 pb-20 pt-32">
          {/* background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px]
                          -translate-x-1/4 rounded-full
                          bg-[radial-gradient(circle,rgba(74,222,128,0.07)_0%,transparent_70%)]" />

          <div className={`transition-all duration-700 delay-[50ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="mb-6 text-[0.65rem] uppercase tracking-[0.18em] text-green-400">
              Studying at Carnegie Mellon University
            </p>
          </div>

          <div className={`transition-all duration-700 delay-150
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="font-minecraft mb-5 text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.4] text-white">
              Eugene<br />Hwang
            </h1>
          </div>

          <div className={`transition-all duration-700 delay-[350ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="mb-12 max-w-md text-sm leading-loose text-slate-400">
              I'm passionate about full-stack development, machine learning, and natural language processing. 
            </p>
          </div>

          <div className={`transition-all duration-700 delay-[450ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex flex-wrap gap-4">
              <a href="#work"
                 className="bg-green-400 px-7 py-3 text-[0.7rem] uppercase tracking-widest
                            text-[#080b10] transition-all hover:-translate-y-px hover:opacity-85">
                View my work
              </a>
              <a href="#contact"
                 className="border border-white/[0.07] px-7 py-3 text-[0.7rem] uppercase
                            tracking-widest text-slate-500 transition-colors
                            hover:border-green-400 hover:text-green-400">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* ── Stack bar ───────────────────────────────────── */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-12
                        border-y border-white/[0.07] px-12 py-5">
          <span className="flex-shrink-0 text-[0.6rem] uppercase tracking-[0.15em] text-slate-500">
            Stack
          </span>
          <div className="flex flex-wrap gap-3">
            {STACK.map((s) => (
              <span key={s}
                    className="border border-white/[0.07] bg-white/[0.03] px-3.5 py-1.5
                               text-[0.65rem] tracking-wide text-slate-300
                               transition-colors hover:border-green-400 hover:text-green-400">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── About ───────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-5xl px-12 py-24">
          <div className="mb-14 flex items-baseline gap-5">
            <h2 className="font-minecraft text-[1.1rem] text-white">About</h2>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div className="space-y-5 text-sm leading-loose text-slate-400">
              <p>
                I'm Eugene, a sophomore studying at Carnegie Mellon University. 
                I am an Information Systems and Artificial Intelligence double major.
                I first started coding through competitive programming and now I am currently working in 
                full-stack development and natural language processing research.
              </p>
              <p>
                I've always enjoyed tackling complex problems and working on big projects. 
                I also love participating in programming or math competitions!
              </p>
              <p>
                When I'm not coding, I'm probably playing Minecraft, learning how to cook, 
                or hopefully touching some lovely grass. Feel free to{" "}
                <a href="#contact" className="text-green-400 hover:underline">reach out</a>{" "}!.
              </p>
            </div>

          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────── */}
        {/* <section id="contact" className="mx-auto max-w-5xl px-12 py-24">
          <div className="flex flex-wrap items-center justify-between gap-10
                          border border-white/[0.07] bg-white/[0.03] p-14">
            <h2 className="font-minecraft text-[clamp(0.85rem,1.8vw,1.3rem)] leading-relaxed text-white">
              Let's build<br />something{" "}
              <span className="text-green-400">great.</span>
            </h2>
            <div className="flex flex-col gap-3">
              <a href="mailto:eugene@example.com"
                 className="bg-green-400 px-7 py-3 text-center text-[0.65rem]
                            uppercase tracking-widest text-[#080b10]
                            transition-all hover:-translate-y-px hover:opacity-85">
                ehwang2@andrew.cmu.edu
              </a>
              <div className="flex gap-3">
                {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                  <a key={s} href="#"
                     className="flex-1 border border-white/[0.07] px-4 py-3 text-center
                                text-[0.6rem] uppercase tracking-widest text-slate-500
                                transition-colors hover:border-green-400 hover:text-green-400">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* ── Footer ──────────────────────────────────────── */}
        <footer className="mx-auto flex max-w-5xl flex-wrap items-center justify-between
                           gap-2 border-t border-white/[0.07] px-12 py-6
                           text-[0.65rem] tracking-wide text-slate-500">
          <span>Designed &amp; built by me</span>
        </footer>

      </div>
    </>
  );
}