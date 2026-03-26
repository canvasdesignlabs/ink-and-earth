import Link from "next/link";

interface PoemCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  date: string;
  tags?: string[];
}

export default function PoemCard({ title, slug, excerpt, date, tags }: PoemCardProps) {
  return (
    <Link
      href={`/poems/${slug}`}
      className="flex w-full flex-col rounded-md border border-border bg-surface p-xl no-underline transition-all duration-300 hover:-translate-y-[2px] hover:shadow-sm hover:border-accent"
    >
      <h3 className="font-display text-2xl font-normal text-text-primary">
        {title}
      </h3>
      <p className="mt-xs font-accent text-xs tracking-[0.12em] uppercase text-accent-2">
        {date && new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        {tags && tags.length > 0 && ` · ${tags[0]}`}
      </p>
      {excerpt && (
        <p className="mt-md flex-1 font-display text-lg font-light leading-relaxed text-text-secondary">
          {excerpt}
        </p>
      )}
    </Link>
  );
}
