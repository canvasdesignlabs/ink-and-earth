export default function Home() {
  return (
    <main className="relative z-10 min-h-screen bg-page">
      <div className="mx-auto max-w-[960px] px-lg py-4xl text-center">
        <h1 className="font-display text-[clamp(48px,8vw,80px)] font-light leading-tight tracking-wide text-text-primary">
          Ink & Earth
        </h1>
        <p className="mt-md font-accent text-base tracking-[0.25em] uppercase text-text-secondary">
          Poetry rooted in the soil of being
        </p>

        <div className="mx-auto my-2xl h-px w-[60px] bg-accent opacity-60" />

        <div className="mx-auto max-w-[600px]">
          <h2 className="font-display text-3xl font-normal italic text-text-primary">
            After Rain
          </h2>
          <div className="mt-xl font-display text-[22px] font-light leading-[2] text-text-primary">
            <p>The garden holds its breath,</p>
            <p>each leaf a cupped hand</p>
            <p>catching what the sky</p>
            <p>could not keep.</p>
            <p className="mt-lg">I press my palm</p>
            <p>to the wet bark</p>
            <p>and feel the pulse</p>
            <p>of something <em>older</em></p>
            <p>than my asking.</p>
          </div>
          <p className="mt-xl font-accent text-[13px] tracking-[0.15em] uppercase text-text-secondary">
            March 2026 &middot; Nature
          </p>
        </div>

        <div className="mx-auto my-2xl h-px w-[60px] bg-accent opacity-60" />

        <div className="flex flex-wrap justify-center gap-sm">
          <span className="rounded-sm bg-sage/15 px-sm py-xs font-accent text-xs tracking-[0.12em] uppercase text-accent">
            Nature
          </span>
          <span className="rounded-sm bg-terracotta/15 px-sm py-xs font-accent text-xs tracking-[0.12em] uppercase text-accent-2">
            Featured
          </span>
          <span className="rounded-sm bg-stone/10 px-sm py-xs font-accent text-xs tracking-[0.12em] uppercase text-text-secondary">
            Reflection
          </span>
        </div>

        <div className="mt-2xl flex justify-center gap-sm">
          <button className="rounded-sm bg-accent px-lg py-sm font-accent text-sm tracking-[0.15em] uppercase text-warm-white transition-colors hover:bg-accent-hover">
            Read More
          </button>
          <button className="rounded-sm border border-accent bg-transparent px-lg py-sm font-accent text-sm tracking-[0.15em] uppercase text-accent transition-colors hover:bg-accent hover:text-warm-white">
            Subscribe
          </button>
        </div>

        <p className="mt-3xl font-body text-[17px] leading-[1.7] text-text-secondary">
          A poet writes not to be remembered, but to remember. Each line is a thread pulled
          from the weave of daily life — the smell of rain on warm pavement, the weight of
          silence after a door closes, the impossible green of new growth in spring.
        </p>
      </div>
    </main>
  );
}
