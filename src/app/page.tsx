import { getFeaturedPoem, getAllPoems, getAllBlogPosts } from "@/sanity/lib/queries";
import FeaturedPoem from "@/components/FeaturedPoem";
import PoemCard from "@/components/PoemCard";
import BlogCard from "@/components/BlogCard";
import Divider from "@/components/Divider";
import FeatherFloat from "@/components/animations/FeatherFloat";
import Newsletter from "@/components/Newsletter";


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
      <FeatherFloat delay={0.1}>
        <section className="py-4xl text-center">
          <h1 className="font-display text-[clamp(48px,8vw,80px)] font-light leading-tight tracking-wide text-text-primary">
            Ink & Earth
          </h1>
          <p className="mt-md font-accent text-base tracking-[0.25em] uppercase text-text-secondary">
            Poetry rooted in the soil of being
          </p>
          <Divider className="mt-2xl" />
        </section>
      </FeatherFloat>

      {/* Featured poem as hero */}
      {featuredPoem && featuredPoem.body && (
        <FeatherFloat delay={0.2} yOffset={30}>
          <FeaturedPoem
            title={featuredPoem.title}
            body={featuredPoem.body}
            date={featuredPoem.date}
            tags={featuredPoem.tags}
          />
        </FeatherFloat>
      )}

      {/* Recent Poems */}
      {recentPoems.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-lg py-2xl">
          <FeatherFloat delay={0.1}>
            <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
              Recent Poems
            </p>
          </FeatherFloat>
          <div className="grid gap-xl sm:grid-cols-2 lg:grid-cols-3">
            {recentPoems.map((poem: { _id: string; title: string; slug: { current: string }; excerpt?: string; date: string; tags?: string[] }, index: number) => (
              <FeatherFloat key={poem._id} delay={0.15 + (index * 0.1)}>
                <PoemCard
                  title={poem.title}
                  slug={poem.slug.current}
                  excerpt={poem.excerpt}
                  date={poem.date}
                  tags={poem.tags}
                />
              </FeatherFloat>
            ))}
          </div>
        </section>
      )}

      {/* From the Blog */}
      {recentBlog.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-lg py-2xl">
          <FeatherFloat delay={0.1}>
            <p className="mb-lg font-accent text-[13px] tracking-[0.2em] uppercase text-text-secondary">
              From the Blog
            </p>
          </FeatherFloat>
          <div className="flex flex-col gap-md">
            {recentBlog.map((post: { _id: string; title: string; slug: { current: string }; excerpt?: string; date: string }, index: number) => (
              <FeatherFloat key={post._id} delay={0.15 + (index * 0.1)}>
                <BlogCard
                  title={post.title}
                  slug={post.slug.current}
                  excerpt={post.excerpt}
                  date={post.date}
                />
              </FeatherFloat>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <Newsletter />
    </main>
  );
}
