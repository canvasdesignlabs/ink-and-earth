import { getFeaturedPoem, getAllPoems, getAllBlogPosts } from "@/sanity/lib/queries";
import FeaturedPoem from "@/components/FeaturedPoem";
import PoemCard from "@/components/PoemCard";
import BlogCard from "@/components/BlogCard";
import Divider from "@/components/Divider";

export default async function Home() {
  const [featuredPoem, allPoems, blogPosts] = await Promise.all([
    getFeaturedPoem(),
    getAllPoems(),
    getAllBlogPosts(),
  ]);

  const recentPoems = allPoems
    .filter((p: { featured?: boolean }) => !p.featured)
    .slice(0, 6);
  const recentBlog = blogPosts.slice(0, 3);

  return (
    <main className="relative z-10 flex-1">
      {/* Hero — site name */}
      <section className="py-4xl text-center">
        <h1 className="font-display text-[clamp(48px,8vw,80px)] font-light leading-tight tracking-wide text-text-primary">
          Ink & Earth
        </h1>
        <p className="mt-md font-accent text-base tracking-[0.25em] uppercase text-text-secondary">
          Poetry rooted in the soil of being
        </p>
        <Divider className="mt-2xl" />
      </section>

      {/* Featured poem as hero */}
      {featuredPoem && featuredPoem.body && (
        <FeaturedPoem
          title={featuredPoem.title}
          body={featuredPoem.body}
          date={featuredPoem.date}
          tags={featuredPoem.tags}
        />
      )}

      {/* Recent Poems */}
      {recentPoems.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-lg py-2xl">
          <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
            Recent Poems
          </p>
          <div className="grid gap-xl sm:grid-cols-2 lg:grid-cols-3">
            {recentPoems.map((poem: { _id: string; title: string; slug: { current: string }; excerpt?: string; date: string; tags?: string[] }) => (
              <PoemCard
                key={poem._id}
                title={poem.title}
                slug={poem.slug.current}
                excerpt={poem.excerpt}
                date={poem.date}
                tags={poem.tags}
              />
            ))}
          </div>
        </section>
      )}

      {/* From the Blog */}
      {recentBlog.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-lg py-2xl">
          <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
            From the Blog
          </p>
          <div className="flex flex-col gap-md">
            {recentBlog.map((post: { _id: string; title: string; slug: { current: string }; excerpt?: string; date: string }) => (
              <BlogCard
                key={post._id}
                title={post.title}
                slug={post.slug.current}
                excerpt={post.excerpt}
                date={post.date}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
