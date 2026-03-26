"use client";

import { useState } from "react";
import ComingSoonModal from "./ComingSoonModal";

export default function TipButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-sm border border-accent-2 px-lg py-sm font-accent text-xs tracking-[0.15em] uppercase text-accent-2 no-underline transition-colors hover:bg-accent-2 hover:text-warm-white"
      >
        Leave a Tip
      </button>
      <ComingSoonModal
        open={open}
        onClose={() => setOpen(false)}
        title="Tipping"
        message="A way to support this work is coming soon."
      />
    </>
  );
}
