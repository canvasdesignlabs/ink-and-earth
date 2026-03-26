import { getAllBlogPosts } from "@/sanity/lib/queries";
import BlogCard from "@/components/BlogCard";
import FeatherFloat from "@/components/animations/FeatherFloat";

export const metadata = {
  title: "Blog — Ink & Earth",
  description: "Essays on writing, poetry, and the quiet moments in between",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="relative z-10 flex-1">
      <FeatherFloat yOffset={15}>
        <section className="mx-auto max-w-[960px] px-lg py-3xl">
          <h1 className="font-display text-4xl font-normal text-text-primary mb-xl">
            Blog
          </h1>
          <div className="flex flex-col gap-md">
            {posts.map((post: { _id: string; title: string; slug: { current: string }; excerpt?: string; date: string }) => (
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
      </FeatherFloat>
    </main>
  );
}
