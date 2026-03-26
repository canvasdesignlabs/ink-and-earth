import { getAboutPage } from "@/sanity/lib/queries";
import { PortableText } from "@portabletext/react";

export const metadata = {
  title: "About — Ink & Earth",
  description: "About the poet behind Ink & Earth",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <main className="relative z-10 flex-1">
      <section className="mx-auto max-w-[720px] px-lg py-3xl">
        <h1 className="font-display text-4xl font-normal text-text-primary">
          About
        </h1>
        {about?.subtitle && (
          <p className="mt-sm font-accent text-sm tracking-[0.15em] uppercase text-text-secondary">
            {about.subtitle}
          </p>
        )}

        {about?.bio && (
          <div className="mt-2xl font-body text-[17px] leading-[1.7] text-text-primary [&_p]:mb-md">
            <PortableText value={about.bio as never} />
          </div>
        )}
      </section>
    </main>
  );
}
