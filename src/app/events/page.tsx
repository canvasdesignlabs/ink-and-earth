import { getAllEvents } from "@/sanity/lib/queries";
import FeatherFloat from "@/components/animations/FeatherFloat";

export const metadata = {
  title: "Events — Ink & Earth",
  description: "Readings, open mics, and events",
};

export default async function EventsPage() {
  const events = await getAllEvents();
  const now = new Date().toISOString();
  const upcoming = events.filter((e: { date: string }) => e.date >= now);
  const past = events.filter((e: { date: string }) => e.date < now);

  return (
    <main className="relative z-10 flex-1">
      <FeatherFloat yOffset={15}>
      <section className="mx-auto max-w-[960px] px-lg py-3xl">
        <h1 className="font-display text-4xl font-normal text-text-primary mb-xl">
          Events
        </h1>

        {upcoming.length > 0 && (
          <>
            <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
              Upcoming
            </p>
            <div className="flex flex-col gap-md mb-2xl">
              {upcoming.map((event: { _id: string; title: string; date: string; location?: string; link?: string }) => (
                <div
                  key={event._id}
                  className="rounded-md border border-border bg-surface p-xl"
                >
                  <p className="font-accent text-sm tracking-[0.12em] uppercase text-accent">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mt-xs font-display text-2xl font-normal text-text-primary">
                    {event.title}
                  </h3>
                  {event.location && (
                    <p className="mt-xs font-body text-sm text-text-secondary">
                      {event.location}
                    </p>
                  )}
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-md inline-block rounded-sm bg-accent px-lg py-sm font-accent text-sm tracking-[0.15em] uppercase text-warm-white no-underline transition-colors hover:bg-accent-hover"
                    >
                      Details
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {past.length > 0 && (
          <>
            <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-muted">
              Past Events
            </p>
            <div className="flex flex-col gap-sm">
              {past.map((event: { _id: string; title: string; date: string; location?: string }) => (
                <div
                  key={event._id}
                  className="rounded-md border border-border bg-surface/50 p-lg opacity-70"
                >
                  <p className="font-accent text-xs tracking-[0.12em] uppercase text-text-muted">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
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
              ))}
            </div>
          </>
        )}

        {events.length === 0 && (
          <p className="font-body text-text-secondary">No events scheduled yet. Check back soon.</p>
        )}
      </section>
      </FeatherFloat>
    </main>
  );
}
