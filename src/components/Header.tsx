"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/poems", label: "Poems" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/publications", label: "Publications" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-lg py-lg">
        {/* Site name */}
        <Link
          href="/"
          className="font-display text-2xl font-normal text-text-primary no-underline transition-colors hover:text-accent"
        >
          Ink & Earth
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-xl md:flex">
          <ul className="flex gap-xl list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-accent text-[13px] font-medium tracking-[0.2em] uppercase no-underline transition-colors ${
                    (link.exact ? pathname === link.href : pathname?.startsWith(link.href))
                      ? "text-accent-2"
                      : "text-text-primary hover:text-accent-2"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className={`block h-[1.5px] w-[22px] bg-text-primary transition-transform ${
              menuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-[22px] bg-text-primary transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-[22px] bg-text-primary transition-transform ${
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-surface md:hidden">
          <ul className="flex flex-col gap-md px-lg py-xl list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-accent text-[14px] font-medium tracking-[0.2em] uppercase no-underline transition-colors ${
                    (link.exact ? pathname === link.href : pathname?.startsWith(link.href))
                      ? "text-accent-2"
                      : "text-text-primary hover:text-accent-2"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
