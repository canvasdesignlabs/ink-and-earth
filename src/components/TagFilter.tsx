"use client";

import { useState } from "react";

interface TagFilterProps {
  tags: string[];
}

export default function TagFilter({ tags }: TagFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  function handleClick(tag: string) {
    const next = active === tag ? null : tag;
    setActive(next);

    // Filter poem cards by tag
    const cards = document.querySelectorAll("[data-tags]");
    cards.forEach((card) => {
      const cardTags = JSON.parse(card.getAttribute("data-tags") || "[]");
      if (!next || cardTags.includes(next)) {
        (card as HTMLElement).style.display = "";
      } else {
        (card as HTMLElement).style.display = "none";
      }
    });
  }

  return (
    <div className="flex flex-wrap gap-xs">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className={`rounded-sm px-sm py-xs font-accent text-xs tracking-[0.12em] uppercase transition-colors ${
            active === tag
              ? "bg-accent text-warm-white"
              : "bg-sage/15 text-accent hover:bg-sage/25"
          }`}
        >
          {tag}
        </button>
      ))}
      {active && (
        <button
          onClick={() => handleClick(active)}
          className="rounded-sm px-sm py-xs font-accent text-xs tracking-[0.12em] uppercase text-text-secondary hover:text-text-primary"
        >
          Clear
        </button>
      )}
    </div>
  );
}
