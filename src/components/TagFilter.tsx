"use client";

import { useState } from "react";

interface TagFilterProps {
  tags: string[];
}

export default function TagFilter({ tags }: TagFilterProps) {
  const [active, setActive] = useState<string>("all");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    setActive(next);

    // Filter poem cards by tag
    const cards = document.querySelectorAll("[data-tags]");
    cards.forEach((card) => {
      const cardTags = JSON.parse(card.getAttribute("data-tags") || "[]");
      if (next === "all" || cardTags.includes(next)) {
        (card as HTMLElement).style.display = "";
      } else {
        (card as HTMLElement).style.display = "none";
      }
    });
  }

  return (
    <div className="flex items-center gap-md border-b border-border pb-md">
      <label htmlFor="poem-filter" className="font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
        Filter by Form:
      </label>
      <div className="relative">
        <select
          id="poem-filter"
          value={active}
          onChange={handleChange}
          className="appearance-none bg-transparent pr-xl font-display text-xl font-normal text-text-primary outline-none transition-colors hover:text-accent-2 cursor-pointer"
        >
          <option value="all">Every Verse</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {/* Custom minimalist arrow */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
