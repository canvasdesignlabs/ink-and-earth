import { getAllPoems } from "@/sanity/lib/queries";
import PoemCard from "@/components/PoemCard";
import TagFilter from "@/components/TagFilter";
import FeatherFloat from "@/components/animations/FeatherFloat";

export const metadata = {
  title: "Poems — Ink & Earth",
  description: "Browse all poems",
};

export default async function PoemsPage() {
  const poems = await getAllPoems();

  const allTags = Array.from(
    new Set(poems.flatMap((p: { tags?: string[] }) => p.tags || []))
  ).sort() as string[];

  return (
    <main className="relative z-10 flex-1">
      <FeatherFloat yOffset={15}>
        <section className="mx-auto max-w-[1200px] px-lg py-3xl">
          <h1 className="font-display text-4xl font-normal text-text-primary mb-lg">
            Poems
          </h1>
          <TagFilter tags={allTags} />
          <div className="mt-xl grid gap-xl sm:grid-cols-2 lg:grid-cols-3">
            {poems.map((poem: { _id: string; title: string; slug: { current: string }; excerpt?: string; date: string; tags?: string[] }) => (
              <div key={poem._id} data-tags={JSON.stringify(poem.tags || [])}>
                <PoemCard
                  title={poem.title}
                  slug={poem.slug.current}
                  excerpt={poem.excerpt}
                  date={poem.date}
                  tags={poem.tags}
                />
              </div>
            ))}
          </div>
        </section>
      </FeatherFloat>
    </main>
  );
}
