"use client";

import { useState } from "react";

interface TopNavProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'activities', label: 'Activities' },
  { id: 'blog', label: 'Blog' },
  { id: 'projects', label: 'Projects'}
];

export default function Navbar({ currentView, onNavigate }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .font-minecraft { font-family: 'Press Start 2P', monospace; }
        .font-mono-dm  { font-family: 'DM Mono', 'Fira Mono', monospace; }
      `}</style>

      <nav className="font-mono-dm sticky top-0 z-50 border-b border-white/[0.07] bg-[#080b10]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-12">

          {/* Logo */}
          <button
            className="font-minecraft cursor-pointer select-none text-[0.65rem] tracking-tight text-white"
            onClick={() => onNavigate('home')}
          >
            Eugene Hwang
          </button>

          {/* Desktop links */}
          <ul className="hidden list-none items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${
                  currentView === item.id
                    ? "font-medium text-green-400 after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-px after:rounded-full after:bg-green-400"
                    : "text-slate-500 hover:text-green-400"}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="relative cursor-pointer px-3.5 py-1.5 text-[0.65rem] uppercase tracking-widest transition-colors duration-150">{item.label}</span>
              </button>
            ))}
          </ul>

          {/* Desktop CTA */}
          <button
            className="hidden cursor-pointer border border-white/[0.07] px-4 py-1.5 text-[0.65rem] uppercase tracking-widest text-slate-500 transition-colors duration-150 hover:border-green-400 hover:text-green-400 sm:inline-flex"
            onClick={() => onNavigate('contacts')}
          >
            Contact →
          </button>

          {/* Hamburger */}
          <button
            className="flex cursor-pointer flex-col gap-[5px] border-none bg-transparent p-1.5 sm:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={[
                "block h-px w-5 rounded-full bg-slate-200 transition-transform duration-200 origin-center",
                menuOpen ? "translate-y-[6.5px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px w-5 rounded-full bg-slate-200 transition-opacity duration-200",
                menuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px w-5 rounded-full bg-slate-200 transition-opacity duration-200 origin-center",
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute left-4 right-4 top-[68px] z-50 border border-white/[0.07] bg-[#080b10] p-2 sm:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${
                  currentView === item.id
                    ? "font-medium text-green-400 after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-px after:rounded-full after:bg-green-400"
                    : "text-slate-500 hover:text-green-400"}`}
                onClick={() => onNavigate(item.id)}
              >
                <span className="relative px-3.5 py-1.5 text-[0.65rem] uppercase tracking-widest transition-colors duration-150">{item.label}</span>
              </button>
            ))}
            <div className="my-1.5 h-px bg-white/[0.07]" />
            <button
              className="block px-3.5 py-2.5 text-[0.65rem] uppercase tracking-widest text-slate-500 transition-colors duration-150 hover:text-green-400"
              onClick={() => {
                onNavigate('contacts');
                setMenuOpen(false);
              }}
            >
              Contact →
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
