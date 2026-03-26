import { getPoemBySlug, getPoemSlugs, getAdjacentPoems } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PoemPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPoemSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: PoemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  if (!poem) return { title: "Poem not found" };
  return {
    title: `${poem.title} — Ink & Earth`,
    description: poem.excerpt || `A poem by Ink & Earth`,
  };
}

export default async function PoemPage({ params }: PoemPageProps) {
  const { slug } = await params;
  const poem = await getPoemBySlug(slug);
  if (!poem) notFound();

  const { prev, next } = await getAdjacentPoems(poem.date);

  return (
    <main className="relative z-10 flex-1">
      <article className="mx-auto max-w-[600px] px-lg py-4xl text-center">
        <h1 className="font-display text-[32px] font-normal italic text-text-primary">
          {poem.title}
        </h1>

        {poem.body && (
          <div className="mt-xl font-display text-[22px] font-light leading-[2] text-text-primary [&_em]:italic">
            <PortableText value={poem.body as never} />
          </div>
        )}

        <p className="mt-xl font-accent text-[13px] tracking-[0.15em] uppercase text-text-secondary">
          {poem.date && new Date(poem.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          {poem.tags && poem.tags.length > 0 && ` · ${poem.tags.join(" · ")}`}
        </p>

        {/* Previous / Next */}
        <div className="mt-3xl flex justify-between border-t border-border pt-xl">
          {prev ? (
            <Link
              href={`/poems/${prev.slug.current}`}
              className="font-accent text-xs tracking-[0.12em] uppercase text-text-secondary no-underline hover:text-accent"
            >
              &larr; {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/poems/${next.slug.current}`}
              className="font-accent text-xs tracking-[0.12em] uppercase text-text-secondary no-underline hover:text-accent"
            >
              {next.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>
    </main>
  );
}
