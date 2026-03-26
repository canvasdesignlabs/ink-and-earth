"use client";

import { useState } from "react";
import FeatherFloat from "./animations/FeatherFloat";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    // Mock simulation of API signup
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="relative z-10 mx-auto max-w-[600px] px-lg py-4xl text-center">
      <FeatherFloat yOffset={15} delay={0.2}>
        <h2 className="font-display text-[28px] font-normal italic text-text-primary mb-sm">
          Letters from the Earth
        </h2>
        <p className="font-body text-[15px] font-light text-text-secondary mb-xl">
          Occasional poetry and field notes, delivered quietly to your inbox.
        </p>

        {status === "success" ? (
          <div className="py-md">
            <p className="font-accent text-[13px] tracking-[0.2em] uppercase text-accent-2">
              Welcome to the Inkwell.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative mx-auto mt-lg max-w-[400px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              required
              disabled={status === "submitting"}
              className="w-full border-b border-border bg-transparent py-sm pl-0 pr-[40px] font-body text-base font-light text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-accent-2 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              aria-label="Subscribe to newsletter"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-xs text-text-secondary transition-colors hover:text-accent-2 disabled:opacity-50"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        )}
      </FeatherFloat>
    </section>
  );
}
