import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
}

export default function BlogCard({ title, slug, excerpt, date }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block rounded-md border border-border bg-surface p-xl no-underline transition-colors hover:border-accent"
    >
      <h3 className="font-display text-2xl font-normal text-text-primary">
        {title}
      </h3>
      <p className="mt-xs font-accent text-xs tracking-[0.12em] uppercase text-text-secondary">
        {date && new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      {excerpt && (
        <p className="mt-md font-body text-[15px] leading-relaxed text-text-secondary">
          {excerpt}
        </p>
      )}
    </Link>
  );
}
