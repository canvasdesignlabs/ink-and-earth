import { getBlogPostBySlug, getBlogSlugs } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Ink & Earth`,
    description: post.excerpt || "A blog post from Ink & Earth",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="relative z-10 flex-1">
      <article className="mx-auto max-w-[720px] px-lg py-3xl">
        <h1 className="font-display text-4xl font-normal text-text-primary">
          {post.title}
        </h1>
        <p className="mt-sm font-accent text-[13px] tracking-[0.15em] uppercase text-text-secondary">
          {post.date && new Date(post.date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          {post.tags && post.tags.length > 0 && ` · ${post.tags.join(" · ")}`}
        </p>

        {post.body && (
          <div className="mt-2xl font-body text-[17px] leading-[1.7] text-text-primary [&_p]:mb-md [&_em]:italic [&_strong]:font-semibold">
            <PortableText value={post.body as never} />
          </div>
        )}
      </article>
    </main>
  );
}
