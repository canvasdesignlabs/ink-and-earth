import { PortableText } from "@portabletext/react";
import Divider from "./Divider";

interface FeaturedPoemProps {
  title: string;
  body: unknown[];
  date: string;
  tags?: string[];
}

export default function FeaturedPoem({ title, body, date, tags }: FeaturedPoemProps) {
  return (
    <section className="relative z-10 py-4xl">
      <div className="mx-auto max-w-[600px] px-lg text-center">
        <p className="font-accent text-xs tracking-[0.2em] uppercase text-text-secondary mb-lg">
          Featured Poem
        </p>
        <h2 className="font-display text-[32px] font-normal italic text-text-primary mb-xl">
          {title}
        </h2>
        <div className="font-display text-[22px] font-light leading-[2] text-text-primary [&_em]:italic">
          <PortableText value={body as never} />
        </div>
        <p className="mt-xl font-accent text-[13px] tracking-[0.15em] uppercase text-accent-2">
          {date && new Date(date + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          {tags && tags.length > 0 && ` · ${tags[0]}`}
        </p>
        <Divider className="mt-2xl" />
      </div>
    </section>
  );
}
