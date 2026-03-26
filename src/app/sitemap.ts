import { MetadataRoute } from "next";
import { getPoemSlugs, getBlogSlugs } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ink-and-earth.vercel.app";

  const poemSlugs = await getPoemSlugs();
  const blogSlugs = await getBlogSlugs();

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/poems`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/events`, lastModified: new Date() },
    { url: `${baseUrl}/publications`, lastModified: new Date() },
  ];

  const poemPages = poemSlugs.map((slug: string) => ({
    url: `${baseUrl}/poems/${slug}`,
    lastModified: new Date(),
  }));

  const blogPages = blogSlugs.map((slug: string) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...poemPages, ...blogPages];
}
