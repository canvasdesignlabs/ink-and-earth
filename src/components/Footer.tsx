import Divider from "./Divider";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto py-2xl">
      <Divider className="mb-xl" />
      <div className="text-center">
        <ul className="mb-md flex justify-center gap-lg list-none">
          <li className="font-accent text-xs tracking-[0.15em] uppercase text-text-secondary">
            Instagram
          </li>
          <li className="font-accent text-xs tracking-[0.15em] uppercase text-text-secondary">
            Substack
          </li>
          <li className="font-accent text-xs tracking-[0.15em] uppercase text-text-secondary">
            Bookshop
          </li>
        </ul>
        <p className="font-body text-[13px] text-text-muted">
          &copy; {new Date().getFullYear()} Ink & Earth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
