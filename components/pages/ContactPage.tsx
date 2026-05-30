"use client";

import { useState, useEffect } from "react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const links = [
    {
      type: "Github",
      link: "https://github.com/Eugene-S-Hwang"
    },
    {
      type: "Linkedin",
      link: "https://www.linkedin.com/in/eugene-s-hwang/"
    }
  ]

  return (
    <>
      <style>{`
        .font-minecraft { font-family: 'Press Start 2P', monospace; }
        .font-mono-dm  { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

      <div className="font-mono-dm min-h-screen overflow-x-hidden bg-[#080b10] text-slate-200">
        <section className="relative mx-auto flex max-w-5xl flex-col justify-center px-12 pb-20 pt-32">
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px]
                          -translate-x-1/4 rounded-full
                          bg-[radial-gradient(circle,rgba(74,222,128,0.07)_0%,transparent_70%)]" />

          <div className={`transition-all duration-700 delay-[50ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="font-minecraft mb-5 text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.4] text-white">
              Contacts
            </h1>
          </div>
          {/* "
                          flex flex-wrap items-center justify-between gap-10
                          border border-white/[0.07] bg-white/[0.03] p-14" */}
          <div className={`transition-all duration-700 delay-150
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="font-minecraft text-[clamp(0.85rem,1.8vw,1.3rem)] leading-relaxed text-white">
              Let's connect
            </h2>
            <div className="flex flex-col gap-3">
              <a href="mailto:ehwang2@andrew.cmu.edu"
                 className="bg-green-400 px-7 py-3 text-center text-[0.65rem]
                            uppercase tracking-widest text-[#080b10]
                            transition-all hover:-translate-y-px hover:opacity-85">
                ehwang2@andrew.cmu.edu
              </a>
              <div className="flex gap-3">
                {links.map((s) => (
                  <a key={s.type} href={s.link}
                     className="flex-1 border border-white/[0.07] px-4 py-3 text-center
                                text-[0.6rem] uppercase tracking-widest text-slate-500
                                transition-colors hover:border-green-400 hover:text-green-400">
                    {s.type}
                  </a>
                ))}
              </div>
            </div>
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
