import { defineField, defineType } from "sanity";

export default defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Display price (e.g. '$18.00')",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      description: "e.g. 'Paperback · 112 pages'",
    }),
    defineField({
      name: "coverColor",
      title: "Cover Color",
      type: "string",
      description: "Tailwind color class for cover background (e.g. 'sage', 'terracotta', 'stone')",
      options: {
        list: [
          { title: "Sage", value: "sage" },
          { title: "Terracotta", value: "terracotta" },
          { title: "Stone", value: "stone" },
          { title: "Sage Dark", value: "sage-dark" },
          { title: "Terracotta Dark", value: "terracotta-dark" },
          { title: "Fog", value: "fog" },
        ],
      },
    }),
    defineField({
      name: "buyLink",
      title: "Buy Link",
      type: "url",
      description: "External purchase link (leave empty for Coming Soon)",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", year: "year" },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: `${subtitle || ""} ${year ? `(${year})` : ""}`.trim(),
      };
    },
  },
});
