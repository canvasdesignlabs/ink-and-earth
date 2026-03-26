"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TagFilterProps {
  tags: string[];
}

export default function TagFilter({ tags }: TagFilterProps) {
  const [active, setActive] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const label = active === "all" ? "Every Verse" : active;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function selectTag(tag: string) {
    setActive(tag);
    setOpen(false);

    // Animate poem cards
    const cards = document.querySelectorAll("[data-tags]");
    cards.forEach((card) => {
      const el = card as HTMLElement;
      const cardTags = JSON.parse(el.getAttribute("data-tags") || "[]");
      const show = tag === "all" || cardTags.includes(tag);

      if (show) {
        el.style.display = "";
        el.style.opacity = "0";
        el.style.transform = "translateY(12px)";
        requestAnimationFrame(() => {
          el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      } else {
        el.style.transition = "opacity 0.3s ease-out";
        el.style.opacity = "0";
        setTimeout(() => {
          el.style.display = "none";
        }, 300);
      }
    });
  }

  return (
    <div className="flex items-center gap-md border-b border-border pb-md">
      <span className="font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
        Filter by Form:
      </span>
      <div className="relative" ref={dropdownRef}>
        {/* Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center gap-sm font-display text-xl font-normal text-text-primary transition-colors hover:text-accent-2"
        >
          <span>{label}</span>
          <div
            className="text-text-muted transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full z-50 mt-sm min-w-[200px] overflow-hidden rounded-md border border-border bg-surface shadow-sm"
            >
              <ul className="flex flex-col list-none py-xs">
                <li>
                  <button
                    onClick={() => selectTag("all")}
                    className={`w-full cursor-pointer px-xl py-sm text-left font-display text-lg transition-all duration-200 hover:-translate-y-[0.5px] ${
                      active === "all"
                        ? "text-accent-2"
                        : "text-text-primary hover:text-accent-2"
                    }`}
                  >
                    Every Verse
                  </button>
                </li>
                {tags.map((tag) => (
                  <li key={tag}>
                    <button
                      onClick={() => selectTag(tag)}
                      className={`w-full cursor-pointer px-xl py-sm text-left font-display text-lg transition-all duration-200 hover:-translate-y-[0.5px] ${
                        active === tag
                          ? "text-accent-2"
                          : "text-text-primary hover:text-accent-2"
                      }`}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
