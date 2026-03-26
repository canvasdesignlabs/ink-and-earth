"use client";

import { useEffect } from "react";

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function ComingSoonModal({
  open,
  onClose,
  title = "Coming Soon",
  message = "This feature is on its way. Stay tuned.",
}: ComingSoonModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative mx-md w-full max-w-[420px] rounded-md border border-border bg-surface p-2xl text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-lg top-lg font-accent text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          &times;
        </button>

        <p className="font-accent text-xs tracking-[0.2em] uppercase text-accent">
          {title}
        </p>
        <p className="mt-md font-display text-2xl font-normal text-text-primary">
          {message}
        </p>
        <div className="mx-auto mt-lg h-[1px] w-12 bg-border" />
        <p className="mt-lg font-body text-sm text-text-secondary">
          Check back soon for updates.
        </p>
      </div>
    </div>
  );
}
