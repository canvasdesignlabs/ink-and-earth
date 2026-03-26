import { client } from "./client";
import {
  placeholderPoems,
  placeholderBlogPosts,
  placeholderEvents,
  placeholderPublications,
  placeholderAbout,
  placeholderSettings,
} from "@/lib/placeholder-data";

const usePlaceholder =
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "PLACEHOLDER";

// Poems
export async function getAllPoems() {
  if (usePlaceholder) return placeholderPoems;
  return client.fetch(
    `*[_type == "poem"] | order(date desc) {
      _id, title, slug, excerpt, date, tags, featured
    }`
  );
}

export async function getFeaturedPoem() {
  if (usePlaceholder) return placeholderPoems.find((p) => p.featured) || null;
  return client.fetch(
    `*[_type == "poem" && featured == true][0] {
      _id, title, slug, body, date, tags
    }`
  );
}

export async function getPoemBySlug(slug: string) {
  if (usePlaceholder) return placeholderPoems.find((p) => p.slug.current === slug) || null;
  return client.fetch(
    `*[_type == "poem" && slug.current == $slug][0] {
      _id, title, body, date, tags
    }`,
    { slug }
  );
}

export async function getPoemSlugs(): Promise<string[]> {
  if (usePlaceholder) return placeholderPoems.map((p) => p.slug.current);
  return client.fetch(
    `*[_type == "poem" && defined(slug.current)].slug.current`
  );
}

export async function getAdjacentPoems(date: string) {
  if (usePlaceholder) {
    const sorted = [...placeholderPoems].sort((a, b) => b.date.localeCompare(a.date));
    const idx = sorted.findIndex((p) => p.date === date);
    return {
      prev: idx < sorted.length - 1 ? sorted[idx + 1] : null,
      next: idx > 0 ? sorted[idx - 1] : null,
    };
  }
  const prev = await client.fetch(
    `*[_type == "poem" && date < $date] | order(date desc)[0] { title, slug }`,
    { date }
  );
  const next = await client.fetch(
    `*[_type == "poem" && date > $date] | order(date asc)[0] { title, slug }`,
    { date }
  );
  return { prev, next };
}

// Blog Posts
export async function getAllBlogPosts() {
  if (usePlaceholder) return placeholderBlogPosts;
  return client.fetch(
    `*[_type == "blogPost"] | order(date desc) {
      _id, title, slug, coverImage, excerpt, date, tags
    }`
  );
}

export async function getBlogPostBySlug(slug: string) {
  if (usePlaceholder) return placeholderBlogPosts.find((p) => p.slug.current === slug) || null;
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id, title, coverImage, body, date, tags
    }`,
    { slug }
  );
}

export async function getBlogSlugs(): Promise<string[]> {
  if (usePlaceholder) return placeholderBlogPosts.map((p) => p.slug.current);
  return client.fetch(
    `*[_type == "blogPost" && defined(slug.current)].slug.current`
  );
}

// Events
export async function getAllEvents() {
  if (usePlaceholder) return placeholderEvents;
  return client.fetch(
    `*[_type == "event"] | order(date asc) {
      _id, title, description, date, location, link, time, admission
    }`
  );
}

// Books (Bookstore)
export async function getAllBooks() {
  if (usePlaceholder) return [];
  return client.fetch(
    `*[_type == "book"] | order(sortOrder asc) {
      _id, title, subtitle, description, price, year, format, coverColor, buyLink, sortOrder
    }`
  );
}

// Publications
export async function getAllPublications() {
  if (usePlaceholder) return placeholderPublications;
  return client.fetch(
    `*[_type == "publication"] | order(year desc) {
      _id, title, description, coverImage, year, buyLink
    }`
  );
}

// About Page (singleton)
export async function getAboutPage() {
  if (usePlaceholder) return placeholderAbout;
  return client.fetch(
    `*[_type == "aboutPage"][0] {
      subtitle, photo, bio
    }`
  );
}

// Site Settings (singleton)
export async function getSiteSettings() {
  if (usePlaceholder) return placeholderSettings;
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      siteName, tagline, socialLinks, footerText
    }`
  );
}
