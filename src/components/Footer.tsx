import Divider from "./Divider";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto py-2xl">
      <Divider className="mb-xl" />
      <div className="text-center">
        {/* Support section */}
        <p className="mb-md font-display text-lg italic text-text-primary">
          If these words have found you, consider supporting the work.
        </p>
        <div className="mb-xl flex justify-center gap-md">
          <a
            href="#"
            className="rounded-sm border border-accent px-lg py-sm font-accent text-xs tracking-[0.15em] uppercase text-accent no-underline transition-colors hover:bg-accent hover:text-warm-white"
          >
            Buy a Book
          </a>
          <a
            href="#"
            className="rounded-sm border border-accent-2 px-lg py-sm font-accent text-xs tracking-[0.15em] uppercase text-accent-2 no-underline transition-colors hover:bg-accent-2 hover:text-warm-white"
          >
            Leave a Tip
          </a>
        </div>

        <Divider className="mb-lg" />

        {/* Social links */}
        <ul className="mb-md flex justify-center gap-lg list-none">
          <li>
            <a href="#" className="font-accent text-xs tracking-[0.15em] uppercase text-text-secondary no-underline transition-colors hover:text-accent-2">
              Instagram
            </a>
          </li>
          <li>
            <a href="#" className="font-accent text-xs tracking-[0.15em] uppercase text-text-secondary no-underline transition-colors hover:text-accent-2">
              Substack
            </a>
          </li>
          <li>
            <a href="#" className="font-accent text-xs tracking-[0.15em] uppercase text-text-secondary no-underline transition-colors hover:text-accent-2">
              Bookshop
            </a>
          </li>
        </ul>
        <p className="font-body text-[13px] text-text-muted">
          &copy; {new Date().getFullYear()} Ink & Earth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
