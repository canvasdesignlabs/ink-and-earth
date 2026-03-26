import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "date",
      title: "Date & Time",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "Display time (e.g. '7:00 PM' or '10:00 AM – 1:00 PM')",
    }),
    defineField({
      name: "admission",
      title: "Admission",
      type: "string",
      description: "Admission info (e.g. 'Free', '$35 · Limited spots')",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Optional link for tickets or more info",
    }),
  ],
  orderings: [
    {
      title: "Date (Upcoming first)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", location: "location" },
    prepare({ title, date, location }) {
      return {
        title,
        subtitle: `${date ? new Date(date).toLocaleDateString() : "TBD"} — ${location || "TBD"}`,
      };
    },
  },
});
