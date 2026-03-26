"use client";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";

interface PoemRevealProps {
  title: string;
  body: PortableTextBlock[];
  date?: string;
  tags?: string[];
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
}

export default function PoemReveal({ title, body, date, tags, prev, next }: PoemRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <h1 className="font-display text-[32px] font-normal italic text-text-primary">
        {title}
      </h1>

      {body && (
        <div className="mt-xl font-display text-[22px] font-light leading-[2] text-text-primary [&_em]:italic">
          <PortableText value={body as never} />
        </div>
      )}

      <p className="mt-xl font-accent text-[13px] tracking-[0.15em] uppercase text-text-secondary">
        {date &&
          new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        {tags && tags.length > 0 && ` · ${tags.join(" · ")}`}
      </p>

      <div className="mt-3xl flex justify-between border-t border-border pt-xl">
        {prev ? (
          <Link
            href={`/poems/${prev.slug}`}
            className="font-accent text-xs tracking-[0.12em] uppercase text-text-secondary no-underline transition-colors hover:text-accent"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/poems/${next.slug}`}
            className="font-accent text-xs tracking-[0.12em] uppercase text-text-secondary no-underline transition-colors hover:text-accent"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <span />
        )}
      </div>
    </motion.div>
  );
}
