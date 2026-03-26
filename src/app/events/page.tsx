"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeatherFloat from "@/components/animations/FeatherFloat";
import { getAllEvents } from "@/sanity/lib/queries";

interface Event {
  _id: string;
  title: string;
  date: string;
  location?: string;
  link?: string | null;
  description?: string | null;
  time?: string;
  admission?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getAllEvents().then((data: Event[]) => {
      setEvents(data);
    });
  }, []);

  const now = new Date().toISOString();
  const upcoming = events.filter((e) => e.date >= now);
  const past = events.filter((e) => e.date < now);

  function toggleEvent(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <main className="relative z-10 flex-1">
      <FeatherFloat yOffset={15}>
        <section className="mx-auto max-w-[960px] px-lg py-3xl">
          <h1 className="mb-xl font-display text-4xl font-normal text-text-primary">
            Events
          </h1>

          {upcoming.length > 0 && (
            <>
              <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
                Upcoming
              </p>
              <div className="mb-2xl flex flex-col gap-md">
                {upcoming.map((event) => (
                  <div key={event._id}>
                    <button
                      onClick={() => toggleEvent(event._id)}
                      className="w-full cursor-pointer rounded-md border border-border bg-surface p-xl text-left transition-all duration-300 hover:-translate-y-[1px] hover:border-accent/50 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-lg">
                        <div className="flex-1">
                          <p className="font-accent text-sm tracking-[0.12em] uppercase text-accent">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                            {event.time && (
                              <span className="ml-sm text-text-secondary">
                                · {event.time}
                              </span>
                            )}
                          </p>
                          <h3 className="mt-xs font-display text-2xl font-normal text-text-primary">
                            {event.title}
                          </h3>
                          {event.location && (
                            <p className="mt-xs font-body text-sm text-text-secondary">
                              {event.location}
                            </p>
                          )}
                        </div>
                        <div className="mt-sm flex-shrink-0 text-text-muted transition-transform duration-300"
                          style={{ transform: expandedId === event._id ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedId === event._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mx-xl rounded-b-md border-x border-b border-border bg-surface px-xl pb-xl pt-lg">
                            {event.description && (
                              <p className="font-body text-[15px] leading-relaxed text-text-primary">
                                {typeof event.description === "string" ? event.description : ""}
                              </p>
                            )}
                            <div className="mt-lg flex flex-wrap items-center gap-lg">
                              {event.admission && (
                                <span className="font-accent text-xs tracking-[0.12em] uppercase text-accent-2">
                                  {event.admission}
                                </span>
                              )}
                              {event.location && (
                                <span className="font-body text-sm text-text-muted">
                                  {event.location}
                                </span>
                              )}
                            </div>
                            {event.link && (
                              <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-lg inline-block rounded-sm bg-accent px-lg py-sm font-accent text-sm tracking-[0.15em] uppercase text-warm-white no-underline transition-colors hover:bg-accent-hover"
                              >
                                Details
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </>
          )}

          {past.length > 0 && (
            <>
              <div className="mx-auto mb-xl h-[1px] w-16 bg-border" />
              <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-muted">
                Past Events
              </p>
              <div className="flex flex-col gap-sm">
                {past.map((event) => (
                  <div key={event._id}>
                    <button
                      onClick={() => toggleEvent(event._id)}
                      className="w-full cursor-pointer rounded-md border border-border bg-surface/50 p-lg text-left opacity-70 transition-all duration-300 hover:opacity-100 hover:border-border"
                    >
                      <div className="flex items-start justify-between gap-lg">
                        <div className="flex-1">
                          <p className="font-accent text-xs tracking-[0.12em] uppercase text-text-muted">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                            {event.time && (
                              <span className="ml-sm">· {event.time}</span>
                            )}
                          </p>
                          <h3 className="mt-xs font-display text-xl font-normal text-text-secondary">
                            {event.title}
                          </h3>
                          {event.location && (
                            <p className="mt-xs font-body text-sm text-text-muted">
                              {event.location}
                            </p>
                          )}
                        </div>
                        <div className="mt-xs flex-shrink-0 text-text-muted transition-transform duration-300"
                          style={{ transform: expandedId === event._id ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedId === event._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mx-lg rounded-b-md border-x border-b border-border bg-surface/50 px-lg pb-lg pt-md">
                            {event.description && (
                              <p className="font-body text-sm leading-relaxed text-text-secondary">
                                {typeof event.description === "string" ? event.description : ""}
                              </p>
                            )}
                            {event.admission && (
                              <p className="mt-md font-accent text-xs tracking-[0.12em] uppercase text-text-muted">
                                {event.admission}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </>
          )}

          {events.length === 0 && (
            <p className="font-body text-text-secondary">
              No events scheduled yet. Check back soon.
            </p>
          )}
        </section>
      </FeatherFloat>
    </main>
  );
}
