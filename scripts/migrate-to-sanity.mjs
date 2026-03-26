#!/usr/bin/env node
/**
 * Migrate placeholder data into Sanity CMS.
 * Run: SANITY_API_TOKEN=xxx node scripts/migrate-to-sanity.mjs
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "jaqqnp1j";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_TOKEN;

if (!TOKEN) {
  console.error("Missing SANITY_API_TOKEN");
  process.exit(1);
}

const API = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01`;

async function createOrReplace(doc) {
  const res = await fetch(`${API}/data/mutate/${DATASET}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [{ createOrReplace: doc }],
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`FAILED: ${doc._type} "${doc.title || doc._id}"`, data);
  } else {
    console.log(`OK: ${doc._type} "${doc.title || doc._id}"`);
  }
  return data;
}

function block(text, marks) {
  const span = { _type: "span", _key: rk(), text };
  if (marks) span.marks = marks;
  return {
    _type: "block",
    _key: rk(),
    children: [span],
    style: "normal",
    markDefs: [],
  };
}

let _c = 0;
function rk() {
  return `k${Date.now().toString(36)}${(++_c).toString(36)}`;
}

// --- POEMS ---
const poems = [
  {
    _id: "poem-after-rain",
    _type: "poem",
    title: "After Rain",
    slug: { _type: "slug", current: "after-rain" },
    excerpt: "The garden holds its breath, each leaf a cupped hand catching what the sky could not keep.",
    date: "2026-03-20",
    tags: ["Nature"],
    featured: true,
    body: [
      block("The garden holds its breath,"),
      block("each leaf a cupped hand"),
      block("catching what the sky"),
      block("could not keep."),
      block(""),
      block("I press my palm"),
      block("to the wet bark"),
      block("and feel the pulse"),
      block("of something older", ["em"]),
      block("than my asking."),
    ],
  },
  {
    _id: "poem-architecture-of-rain",
    _type: "poem",
    title: "The Architecture of Rain",
    slug: { _type: "slug", current: "the-architecture-of-rain" },
    excerpt: "We build houses of glass to watch the sky break...",
    date: "2026-03-15",
    tags: ["Free Verse", "Nature"],
    featured: false,
    body: [
      block("We build houses of glass"),
      block("to watch the sky break,"),
      block("forgetting that water has no memory"),
      block("but the earth remembers everything."),
      block(""),
      block("The soil drinks the storm"),
      block("and turns it into veins of green,"),
      block("a silent rebellion against the gray"),
      block("that hangs above us."),
      block(""),
      block("I stood in the doorway"),
      block("as the world washed its hands,"),
      block("wondering if the rivers"),
      block("ever get tired of moving forward."),
    ],
  },
  {
    _id: "poem-winters-edge",
    _type: "poem",
    title: "Winter's Edge",
    slug: { _type: "slug", current: "winters-edge" },
    excerpt: "Frost upon the branch...",
    date: "2026-02-28",
    tags: ["Haiku", "Winter"],
    featured: false,
    body: [
      block("Frost upon the branch,"),
      block("The breath of the quiet dawn,"),
      block("Shadows turn to glass."),
    ],
  },
  {
    _id: "poem-quiet-tide",
    _type: "poem",
    title: "The Quiet Tide",
    slug: { _type: "slug", current: "the-quiet-tide" },
    excerpt: "The ocean speaks in syllables of foam...",
    date: "2026-02-20",
    tags: ["Sonnet", "Ocean"],
    featured: false,
    body: [
      block("The ocean speaks in syllables of foam,"),
      block("A language written deep within the crest."),
      block("It drags the wandering sailors back to home,"),
      block("And pulls the weary sun into the west."),
      block(""),
      block("We stand upon the borders of the sand,"),
      block("And watch the monumental waters shift."),
      block("It is a force we cannot understand,"),
      block("A violent beauty, or a sudden gift."),
      block(""),
      block("For all the rigid structures that we make,"),
      block("The tides will always rise to claim their due."),
      block("There is a promise that it will not break,"),
      block("To wash the stones and start the world anew."),
      block(""),
      block("So let the currents carry what they will,"),
      block("And leave the empty shores profoundly still."),
    ],
  },
  {
    _id: "poem-weight-of-mornings",
    _type: "poem",
    title: "The Weight of Mornings",
    slug: { _type: "slug", current: "the-weight-of-mornings" },
    excerpt: "Before coffee, before news, when the house is still a shell of sleeping breath.",
    date: "2026-02-10",
    tags: ["Reflection", "Memory"],
    featured: false,
    body: [
      block("Before coffee, before news,"),
      block("when the house is still"),
      block("a shell of sleeping breath,"),
      block("I sit with the weight of it —"),
      block(""),
      block("the way morning arrives"),
      block("without permission,"),
      block("filling every room"),
      block("with its insistent light."),
      block(""),
      block("I have learned to hold"),
      block("this uninvited brightness"),
      block("the way you hold a child's hand:"),
      block("loosely, so they stay."),
    ],
  },
  {
    _id: "poem-root-system",
    _type: "poem",
    title: "Root System",
    slug: { _type: "slug", current: "root-system" },
    excerpt: "Underground, the conversation continues — fungi passing notes between the oaks.",
    date: "2026-01-25",
    tags: ["Nature"],
    featured: false,
    body: [
      block("Underground, the conversation"),
      block("continues — fungi passing notes"),
      block("between the oaks, a network"),
      block("older than our language."),
      block(""),
      block("The roots know what we've forgotten:"),
      block("that sharing is not weakness"),
      block("but the architecture"),
      block("of survival."),
      block(""),
      block("I kneel in the garden"),
      block("and press my ear to the soil,"),
      block("listening for the hum"),
      block("of a world that never learned to be alone."),
    ],
  },
];

// --- BLOG POSTS ---
const blogPosts = [
  {
    _id: "blog-keeping-notebook",
    _type: "blogPost",
    title: "On Keeping a Notebook",
    slug: { _type: "slug", current: "on-keeping-a-notebook" },
    excerpt: "There is something about the physical act of writing — pen to paper, not key to screen — that unlocks a different kind of thinking.",
    date: "2026-03-08",
    tags: ["Writing"],
    body: [
      block("There is something about the physical act of writing — pen to paper, not key to screen — that unlocks a different kind of thinking. The hand moves slower than the mind, and in that gap, something unexpected emerges."),
      block("I've kept notebooks for twenty years now. Moleskines, Field Notes, cheap composition books from the drugstore. They're all the same in the dark, which is when the best ideas come."),
      block("The notebook doesn't judge. It doesn't autocorrect. It doesn't suggest a better word. It simply waits, patient as soil, for whatever you're willing to plant in it."),
      block("Some mornings I write three pages. Some mornings I write a single line. Both are enough."),
    ],
  },
  {
    _id: "blog-stopped-submitting",
    _type: "blogPost",
    title: "Why I Stopped Submitting",
    slug: { _type: "slug", current: "why-i-stopped-submitting" },
    excerpt: "The literary magazine circuit is a strange game. You write something intimate, format it in 12pt Times New Roman, and send it to strangers.",
    date: "2026-02-20",
    tags: ["Publishing"],
    body: [
      block("The literary magazine circuit is a strange game. You write something intimate, format it in 12pt Times New Roman, and send it to strangers. Then you wait three to six months to find out if your intimacy was good enough."),
      block("I played this game for years. I got good at it — learned which journals liked what, how to write a cover letter that sounded both humble and accomplished, when to submit and when to hold back."),
      block("Then one morning I realized I was writing for acceptance letters instead of writing for the poems. The tail was wagging the dog."),
      block("So I stopped. Not writing — never that. But submitting. I write for the notebook now, and for anyone who stumbles across this site. That feels like enough."),
    ],
  },
  {
    _id: "blog-morning-observations",
    _type: "blogPost",
    title: "Morning Observations",
    slug: { _type: "slug", current: "morning-observations" },
    excerpt: "On the ritual of walking before the world wakes, and what the garden teaches about patience when you stop trying to make things grow.",
    date: "2026-03-12",
    tags: ["Nature", "Reflection"],
    body: [
      block("I walk before the world wakes. Not for exercise — the body moves, but that's incidental. I walk because the world is different at 5:47am. Quieter, yes, but also more honest."),
      block("The garden teaches patience when you stop trying to make things grow. You can water, you can weed, you can whisper encouragement to the tomatoes. But growing is the plant's business, not yours."),
      block("This morning: a spider had built a web between the fence posts overnight. Perfect geometry, invisible until the dew arrived to trace its lines. Art that exists only because no one was watching."),
      block("I think the best poems work this way too. Built in the dark, visible only when the light catches them at the right angle."),
    ],
  },
];

// --- EVENTS ---
const events = [
  {
    _id: "event-spring-reading",
    _type: "event",
    title: "Spring Reading Series",
    date: "2026-04-15T19:00:00Z",
    location: "The Bindery, Portland",
    description: [
      block("An evening of new work from the upcoming collection. Doors open at 6:30pm, reading begins at 7pm. Books available for purchase and signing."),
    ],
  },
  {
    _id: "event-open-mic",
    _type: "event",
    title: "Open Mic Night",
    date: "2026-05-01T20:00:00Z",
    location: "Ink & Bean Cafe, Seattle",
    description: [
      block("Monthly open mic for poets, storytellers, and anyone with something to say. Five-minute slots, sign up at the door. All skill levels welcome."),
    ],
  },
];

// --- PUBLICATIONS ---
const publications = [
  {
    _id: "pub-small-hours",
    _type: "publication",
    title: "Small Hours",
    year: 2025,
    description: [
      block("A collection of poems written between midnight and dawn. Forty-two pieces exploring insomnia, memory, and the strange clarity that comes when the rest of the world is sleeping."),
    ],
  },
  {
    _id: "pub-field-notes",
    _type: "publication",
    title: "Field Notes from Nowhere",
    year: 2023,
    description: [
      block("Poems from a year spent paying attention to the ordinary. Laundromats, parking lots, the space between conversations. Winner of the Pacific Northwest Poetry Prize."),
    ],
  },
];

// --- ABOUT PAGE ---
const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  subtitle: "Poet, observer, occasional gardener",
  bio: [
    block("I write about the small things — the ones that happen while you're busy with the big ones. The crack in the sidewalk where the dandelion insists. The conversation you replay at 2am. The particular blue of a Tuesday sky in March."),
    block("I've been writing poetry for twenty years, publishing for ten, and questioning whether any of it matters for all of it. The answer, I've decided, is that mattering isn't the point. The writing is the point."),
  ],
};

// --- SITE SETTINGS ---
const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Ink & Earth",
  tagline: "Poetry rooted in the soil of being",
  socialLinks: [
    { _key: rk(), platform: "Instagram", url: "https://instagram.com" },
    { _key: rk(), platform: "Substack", url: "https://substack.com" },
    { _key: rk(), platform: "Bookshop", url: "https://bookshop.org" },
  ],
  footerText: "Words planted in digital soil",
};

// --- RUN MIGRATION ---
async function migrate() {
  console.log(`\nMigrating to Sanity: ${PROJECT_ID} / ${DATASET}\n`);

  const allDocs = [
    ...poems,
    ...blogPosts,
    ...events,
    ...publications,
    aboutPage,
    siteSettings,
  ];

  for (const doc of allDocs) {
    await createOrReplace(doc);
  }

  console.log(`\nDone! ${allDocs.length} documents created.\n`);
}

migrate().catch(console.error);
