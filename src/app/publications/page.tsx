import { getAllPublications } from "@/sanity/lib/queries";
import FeatherFloat from "@/components/animations/FeatherFloat";

export const metadata = {
  title: "Publications — Ink & Earth",
  description: "Books, chapbooks, and anthologies",
};

export default async function PublicationsPage() {
  const publications = await getAllPublications();

  return (
    <main className="relative z-10 flex-1">
      <FeatherFloat yOffset={15}>
      <section className="mx-auto max-w-[960px] px-lg py-3xl">
        <h1 className="font-display text-4xl font-normal text-text-primary mb-xl">
          Publications
        </h1>
        <div className="grid gap-xl sm:grid-cols-2">
          {publications.map((pub: { _id: string; title: string; year?: number; buyLink?: string }) => (
            <div
              key={pub._id}
              className="rounded-md border border-border bg-surface p-xl"
            >
              <h3 className="font-display text-2xl font-normal text-text-primary">
                {pub.title}
              </h3>
              {pub.year && (
                <p className="mt-xs font-accent text-xs tracking-[0.12em] uppercase text-text-secondary">
                  {pub.year}
                </p>
              )}
              {pub.buyLink && (
                <a
                  href={pub.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-md inline-block rounded-sm bg-accent-2 px-lg py-sm font-accent text-sm tracking-[0.15em] uppercase text-warm-white no-underline transition-colors hover:bg-accent-2-hover"
                >
                  Buy
                </a>
              )}
            </div>
          ))}
        </div>
        {publications.length === 0 && (
          <p className="font-body text-text-secondary">Publications coming soon.</p>
        )}
      </section>
      </FeatherFloat>
    </main>
  );
}
