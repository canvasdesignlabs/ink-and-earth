// Placeholder data used when Sanity is not configured (project ID = PLACEHOLDER)
// This lets the site build and render without a Sanity backend.

export const placeholderPoems = [
  {
    _id: "poem-1",
    title: "After Rain",
    slug: { current: "after-rain" },
    excerpt: "The garden holds its breath, each leaf a cupped hand catching what the sky could not keep.",
    date: "2026-03-20",
    tags: ["Nature"],
    featured: true,
    body: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "The garden holds its breath," },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "each leaf a cupped hand" },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "catching what the sky" },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "could not keep." },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "" }],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "I press my palm" },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "to the wet bark" },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "and feel the pulse" },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "of something " },
          { _type: "span", text: "older", marks: ["em"] },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          { _type: "span", text: "than my asking." },
        ],
        style: "normal",
      },
    ],
  },
  {
    _id: "poem-2",
    title: "Soil Memory",
    slug: { current: "soil-memory" },
    excerpt: "The roots remember what the leaves forget — how to hold on without holding back.",
    date: "2026-03-15",
    tags: ["Nature", "Growth"],
    featured: false,
  },
  {
    _id: "poem-3",
    title: "Letter to No One",
    slug: { current: "letter-to-no-one" },
    excerpt: "I write to the space you left in the doorway, still shaped like almost.",
    date: "2026-02-28",
    tags: ["Love"],
    featured: false,
  },
  {
    _id: "poem-4",
    title: "Kitchen Window",
    slug: { current: "kitchen-window" },
    excerpt: "Steam rises from the cup like a small prayer nobody asked me to say.",
    date: "2026-02-20",
    tags: ["Reflection"],
    featured: false,
  },
  {
    _id: "poem-5",
    title: "The Weight of Mornings",
    slug: { current: "the-weight-of-mornings" },
    excerpt: "Before coffee, before news, when the house is still a shell of sleeping breath.",
    date: "2026-02-10",
    tags: ["Reflection", "Memory"],
    featured: false,
  },
  {
    _id: "poem-6",
    title: "Root System",
    slug: { current: "root-system" },
    excerpt: "Underground, the conversation continues — fungi passing notes between the oaks.",
    date: "2026-01-25",
    tags: ["Nature"],
    featured: false,
  },
];

export const placeholderBlogPosts = [
  {
    _id: "blog-1",
    title: "On Keeping a Notebook",
    slug: { current: "on-keeping-a-notebook" },
    excerpt:
      "There is something about the physical act of writing — pen to paper, not key to screen — that unlocks a different kind of thinking.",
    date: "2026-03-08",
    tags: ["Writing"],
    coverImage: null,
  },
  {
    _id: "blog-2",
    title: "Why I Stopped Submitting",
    slug: { current: "why-i-stopped-submitting" },
    excerpt:
      "The literary magazine circuit is a strange game. You write something intimate, format it in 12pt Times New Roman, and send it to strangers.",
    date: "2026-02-20",
    tags: ["Publishing"],
    coverImage: null,
  },
  {
    _id: "blog-3",
    title: "Morning Observations",
    slug: { current: "morning-observations" },
    excerpt:
      "On the ritual of walking before the world wakes, and what the garden teaches about patience when you stop trying to make things grow.",
    date: "2026-03-12",
    tags: ["Nature", "Reflection"],
    coverImage: null,
  },
];

export const placeholderEvents = [
  {
    _id: "event-1",
    title: "Spring Reading Series",
    description: null,
    date: "2026-04-15T19:00:00Z",
    location: "The Bindery, Portland",
    link: null,
  },
  {
    _id: "event-2",
    title: "Open Mic Night",
    description: null,
    date: "2026-05-01T20:00:00Z",
    location: "Ink & Bean Cafe, Seattle",
    link: null,
  },
];

export const placeholderPublications = [
  {
    _id: "pub-1",
    title: "Small Hours",
    description: null,
    coverImage: null,
    year: 2025,
    buyLink: null,
  },
  {
    _id: "pub-2",
    title: "Field Notes from Nowhere",
    description: null,
    coverImage: null,
    year: 2023,
    buyLink: null,
  },
];

export const placeholderAbout = {
  subtitle: "Poet, observer, occasional gardener",
  photo: null,
  bio: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I write about the small things — the ones that happen while you're busy with the big ones. The crack in the sidewalk where the dandelion insists. The conversation you replay at 2am. The particular blue of a Tuesday sky in March.",
        },
      ],
      style: "normal",
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I've been writing poetry for twenty years, publishing for ten, and questioning whether any of it matters for all of it. The answer, I've decided, is that mattering isn't the point. The writing is the point.",
        },
      ],
      style: "normal",
    },
  ],
};

export const placeholderSettings = {
  siteName: "Ink & Earth",
  tagline: "Poetry rooted in the soil of being",
  socialLinks: [
    { platform: "Instagram", url: "#" },
    { platform: "Substack", url: "#" },
    { platform: "Bookshop", url: "#" },
  ],
  footerText: null,
};
