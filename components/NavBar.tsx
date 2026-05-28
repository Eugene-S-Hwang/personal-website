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
    <nav className="sticky top-0 z-50 bg-white border-b border-black/[0.07]">
      <div className="max-w-5xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <button
          className="font-serif italic text-xl tracking-tight text-neutral-900 select-none cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          Eugene Hwang
        </button>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1 list-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                currentView === item.id 
                  ? "text-neutral-900 font-medium after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-px after:bg-neutral-900 after:rounded-full"
                  : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="relative font-mono text-[11px] tracking-widest uppercase px-3.5 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer">{item.label}</span>
            </button>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          className="hidden sm:inline-flex font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-900 border border-black/20 px-4 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors duration-150 cursor-pointer"
          onClick = {() => onNavigate('contacts')}
        >
          Contact →
        </button>

        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col gap-[5px] p-1.5 cursor-pointer bg-transparent border-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={[
              "block w-5 h-px bg-neutral-900 rounded-full transition-transform duration-200 origin-center",
              menuOpen ? "translate-y-[6.5px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-neutral-900 rounded-full transition-opacity duration-200",
              menuOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-neutral-900 rounded-full transition-transform duration-200 origin-center",
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-[68px] left-4 right-4 bg-white border border-black/[0.08] rounded-xl p-2 shadow-sm z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${
                currentView === item.id 
                  ? "text-neutral-900 font-medium after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-px after:bg-neutral-900 after:rounded-full"
                  : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="relative font-mono text-[11px] tracking-widest uppercase px-3.5 py-1.5 rounded-lg transition-colors duration-150">{item.label}</span>
            </button>
          ))}
          <div className="h-px bg-black/[0.07] my-1.5" />
          <button
            className="block font-mono text-[11px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-150"
            onClick = {() => {
              onNavigate('contacts');
              setMenuOpen(false);
            }}
          >
            Contact →
          </button>
        </div>
      )}
    </nav>
  );
}