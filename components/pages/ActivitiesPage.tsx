"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
        <section className="relative mx-auto flex max-w-5xl flex-col justify-center px-12 pb-20 pt-32">
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px]
                          -translate-x-1/4 rounded-full
                          bg-[radial-gradient(circle,rgba(74,222,128,0.07)_0%,transparent_70%)]" />

          <div className={`mb-10 transition-all duration-700 delay-[50ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <Image
              className="invert opacity-60"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </div>

          <div className={`transition-all duration-700 delay-150
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h1 className="font-minecraft mb-5 text-[clamp(1.6rem,4vw,3.2rem)] leading-[1.4] text-white">
              Activities
            </h1>
          </div>

          <div className={`transition-all duration-700 delay-[350ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="mb-12 max-w-md text-sm leading-loose text-slate-400">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="text-green-400 hover:underline"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="text-green-400 hover:underline"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-[450ms]
                          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex flex-wrap gap-4">
              <a
                className="flex items-center gap-2 bg-green-400 px-7 py-3 text-[0.7rem] uppercase tracking-widest text-[#080b10] transition-all hover:-translate-y-px hover:opacity-85"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={16}
                />
                Deploy Now
              </a>
              <a
                className="border border-white/[0.07] px-7 py-3 text-[0.7rem] uppercase tracking-widest text-slate-500 transition-colors hover:border-green-400 hover:text-green-400"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Documentation
              </a>
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
