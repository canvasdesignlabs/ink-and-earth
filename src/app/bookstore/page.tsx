"use client";

import { useState } from "react";
import FeatherFloat from "@/components/animations/FeatherFloat";
import ComingSoonModal from "@/components/ComingSoonModal";

const books = [
  {
    id: 1,
    title: "Roots & Rain",
    subtitle: "Collected Poems 2019–2024",
    description:
      "A gathering of five years' worth of verse — meditations on soil, silence, and the seasons that shape us.",
    price: "$18.00",
    color: "bg-sage/20",
    accentColor: "bg-sage",
    year: "2024",
    format: "Paperback · 112 pages",
  },
  {
    id: 2,
    title: "The Understory",
    subtitle: "A Chapbook",
    description:
      "Twelve poems written beneath old-growth canopy. What grows in shade. What refuses the light.",
    price: "$12.00",
    color: "bg-terracotta/15",
    accentColor: "bg-terracotta",
    year: "2023",
    format: "Chapbook · 32 pages",
  },
  {
    id: 3,
    title: "Fieldwork",
    subtitle: "Essays on Poetry & Place",
    description:
      "Where does a poem begin? In the body, in the land, in the gap between memory and forgetting.",
    price: "$22.00",
    color: "bg-stone/15",
    accentColor: "bg-stone",
    year: "2022",
    format: "Hardcover · 184 pages",
  },
  {
    id: 4,
    title: "Salt & Meridian",
    subtitle: "New & Selected Poems",
    description:
      "A decade of writing distilled — from coastal fog to interior desert, tracing the meridians of longing.",
    price: "$20.00",
    color: "bg-sage-dark/15",
    accentColor: "bg-sage-dark",
    year: "2021",
    format: "Paperback · 148 pages",
  },
  {
    id: 5,
    title: "Ember Hymnal",
    subtitle: "Poems of Fire & Ash",
    description:
      "What burns, what remains. Poems written in the wake of wildfire season — grief, resilience, renewal.",
    price: "$16.00",
    color: "bg-terracotta-dark/15",
    accentColor: "bg-terracotta-dark",
    year: "2020",
    format: "Chapbook · 44 pages",
  },
  {
    id: 6,
    title: "Still Life with Dirt",
    subtitle: "First Collection",
    description:
      "The debut. Poems about hands in soil, kitchen tables, the small ceremonies of domestic life.",
    price: "$15.00",
    color: "bg-fog/30",
    accentColor: "bg-stone",
    year: "2019",
    format: "Paperback · 88 pages",
  },
];

export default function BookstorePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  function handleBuy(title: string) {
    setSelectedBook(title);
    setModalOpen(true);
  }

  return (
    <main className="relative z-10 flex-1">
      <FeatherFloat yOffset={15}>
        <section className="mx-auto max-w-[1100px] px-lg py-3xl">
          {/* Header */}
          <div className="mb-3xl text-center">
            <p className="font-accent text-xs tracking-[0.25em] uppercase text-accent">
              The Collection
            </p>
            <h1 className="mt-sm font-display text-5xl font-light text-text-primary">
              Bookstore
            </h1>
            <p className="mx-auto mt-md max-w-[480px] font-display text-lg italic text-text-secondary">
              Words bound in paper, waiting to be held.
            </p>
          </div>

          {/* Book grid */}
          <div className="grid gap-2xl md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-all duration-300 hover:-translate-y-[2px] hover:shadow-sm hover:border-accent/50"
              >
                {/* Book cover placeholder */}
                <div
                  className={`relative flex h-[220px] items-end justify-start ${book.color} p-xl`}
                >
                  {/* Decorative spine line */}
                  <div
                    className={`absolute left-[28px] top-0 h-full w-[2px] ${book.accentColor} opacity-30`}
                  />
                  <div>
                    <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-text-muted">
                      {book.year}
                    </p>
                    <h3 className="font-display text-2xl font-normal leading-tight text-text-primary">
                      {book.title}
                    </h3>
                    <p className="mt-2xs font-display text-sm italic text-text-secondary">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                {/* Book details */}
                <div className="flex flex-1 flex-col p-xl">
                  <p className="flex-1 font-body text-sm leading-relaxed text-text-secondary">
                    {book.description}
                  </p>
                  <div className="mt-lg">
                    <p className="font-accent text-[11px] tracking-[0.12em] uppercase text-text-muted">
                      {book.format}
                    </p>
                    <div className="mt-md flex items-center justify-between">
                      <span className="font-display text-xl text-text-primary">
                        {book.price}
                      </span>
                      <button
                        onClick={() => handleBuy(book.title)}
                        className="rounded-sm bg-accent px-lg py-sm font-accent text-xs tracking-[0.15em] uppercase text-warm-white transition-colors hover:bg-accent-hover"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-3xl text-center">
            <div className="mx-auto h-[1px] w-16 bg-border" />
            <p className="mt-lg font-body text-sm text-text-muted">
              Independent bookstores and signed copies coming soon.
            </p>
          </div>
        </section>
      </FeatherFloat>

      <ComingSoonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Bookstore"
        message={
          selectedBook
            ? `"${selectedBook}" will be available for purchase soon.`
            : "The bookstore is coming soon."
        }
      />
    </main>
  );
}
