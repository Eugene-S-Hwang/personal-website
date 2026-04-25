"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects"}
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-black/[0.07]">
      <div className="max-w-5xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-serif italic text-xl tracking-tight text-neutral-900 select-none"
        >
          Eugene Hwang
        </Link>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1 list-none">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "relative font-mono text-[11px] tracking-widest uppercase px-3.5 py-1.5 rounded-lg transition-colors duration-150",
                    isActive
                      ? "text-neutral-900 font-medium after:absolute after:bottom-[-2px] after:left-3.5 after:right-3.5 after:h-px after:bg-neutral-900 after:rounded-full"
                      : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden sm:inline-flex font-mono text-[11px] tracking-wider uppercase font-medium text-neutral-900 border border-black/20 px-4 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors duration-150"
        >
          Contact →
        </Link>

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
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={[
                "block font-mono text-[11px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg transition-colors duration-150",
                pathname === href
                  ? "text-neutral-900 bg-neutral-100 font-medium"
                  : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
          <div className="h-px bg-black/[0.07] my-1.5" />
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block font-mono text-[11px] tracking-widest uppercase px-3.5 py-2.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-150"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}