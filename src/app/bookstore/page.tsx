"use client";

import { useState, useEffect } from "react";
import FeatherFloat from "@/components/animations/FeatherFloat";
import ComingSoonModal from "@/components/ComingSoonModal";
import { getAllBooks } from "@/sanity/lib/queries";

interface Book {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  year?: string;
  format?: string;
  coverColor?: string;
  buyLink?: string | null;
}

const colorMap: Record<string, { bg: string; accent: string }> = {
  sage: { bg: "bg-sage/20", accent: "bg-sage" },
  terracotta: { bg: "bg-terracotta/15", accent: "bg-terracotta" },
  stone: { bg: "bg-stone/15", accent: "bg-stone" },
  "sage-dark": { bg: "bg-sage-dark/15", accent: "bg-sage-dark" },
  "terracotta-dark": { bg: "bg-terracotta-dark/15", accent: "bg-terracotta-dark" },
  fog: { bg: "bg-fog/30", accent: "bg-stone" },
};

export default function BookstorePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  useEffect(() => {
    getAllBooks().then((data: Book[]) => {
      setBooks(data);
    });
  }, []);

  function handleBuy(title: string, buyLink?: string | null) {
    if (buyLink) {
      window.open(buyLink, "_blank", "noopener,noreferrer");
    } else {
      setSelectedBook(title);
      setModalOpen(true);
    }
  }

  function getColors(coverColor?: string) {
    return colorMap[coverColor || "sage"] || colorMap.sage;
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
            {books.map((book) => {
              const colors = getColors(book.coverColor);
              return (
                <div
                  key={book._id}
                  className="group flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-all duration-300 hover:-translate-y-[2px] hover:shadow-sm hover:border-accent/50"
                >
                  {/* Book cover placeholder */}
                  <div
                    className={`relative flex h-[220px] items-end justify-start ${colors.bg} p-xl`}
                  >
                    <div
                      className={`absolute left-[28px] top-0 h-full w-[2px] ${colors.accent} opacity-30`}
                    />
                    <div>
                      <p className="font-accent text-[10px] tracking-[0.2em] uppercase text-text-muted">
                        {book.year}
                      </p>
                      <h3 className="font-display text-2xl font-normal leading-tight text-text-primary">
                        {book.title}
                      </h3>
                      {book.subtitle && (
                        <p className="mt-2xs font-display text-sm italic text-text-secondary">
                          {book.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Book details */}
                  <div className="flex flex-1 flex-col p-xl">
                    {book.description && (
                      <p className="flex-1 font-body text-sm leading-relaxed text-text-secondary">
                        {book.description}
                      </p>
                    )}
                    <div className="mt-lg">
                      {book.format && (
                        <p className="font-accent text-[11px] tracking-[0.12em] uppercase text-text-muted">
                          {book.format}
                        </p>
                      )}
                      <div className="mt-md flex items-center justify-between">
                        {book.price && (
                          <span className="font-display text-xl text-text-primary">
                            {book.price}
                          </span>
                        )}
                        <button
                          onClick={() => handleBuy(book.title, book.buyLink)}
                          className="rounded-sm bg-accent px-lg py-sm font-accent text-xs tracking-[0.15em] uppercase text-warm-white transition-colors hover:bg-accent-hover"
                        >
                          {book.buyLink ? "Buy" : "Coming Soon"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {books.length === 0 && (
            <p className="text-center font-body text-text-secondary">
              The bookstore is being stocked. Check back soon.
            </p>
          )}

          {/* Bottom note */}
          {books.length > 0 && (
            <div className="mt-3xl text-center">
              <div className="mx-auto h-[1px] w-16 bg-border" />
              <p className="mt-lg font-body text-sm text-text-muted">
                Independent bookstores and signed copies coming soon.
              </p>
            </div>
          )}
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
