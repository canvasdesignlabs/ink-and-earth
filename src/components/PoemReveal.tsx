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
  const lineCount = body?.length || 0;
  // Keep total poem animation under ~3s
  const staggerDelay = Math.min(0.12, 2.0 / Math.max(lineCount, 1));
  const poemEndDelay = 0.4 + lineCount * staggerDelay;

  return (
    <>
      {/* Title flows in first */}
      <motion.h1
        className="font-display text-[32px] font-normal italic text-text-primary"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {title}
      </motion.h1>

      {/* Each line staggers in */}
      {body && (
        <div className="mt-xl font-display text-[22px] font-light leading-[2] text-text-primary [&_em]:italic">
          {body.map((block, i) => {
            const isBlank =
              block.children?.length === 1 &&
              (block.children[0] as { text?: string }).text === "";

            return (
              <motion.div
                key={block._key || i}
                initial={{ opacity: 0, y: isBlank ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * staggerDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <PortableText value={[block] as never} />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Meta fades in after poem */}
      <motion.p
        className="mt-xl font-accent text-[13px] tracking-[0.15em] uppercase text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: poemEndDelay + 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {date &&
          new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        {tags && tags.length > 0 && ` · ${tags.join(" · ")}`}
      </motion.p>

      {/* Previous / Next — fades in last */}
      <motion.div
        className="mt-3xl flex justify-between border-t border-border pt-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: poemEndDelay + 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
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
      </motion.div>
    </>
  );
}
