import { getPoemBySlug, getPoemSlugs, getAdjacentPoems } from "@/sanity/lib/queries";
import PoemReveal from "@/components/PoemReveal";
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
        <PoemReveal
          key={slug}
          title={poem.title}
          body={poem.body || []}
          date={poem.date}
          tags={poem.tags}
          prev={prev ? { title: prev.title, slug: prev.slug.current } : undefined}
          next={next ? { title: next.title, slug: next.slug.current } : undefined}
        />
      </article>
    </main>
  );
}
