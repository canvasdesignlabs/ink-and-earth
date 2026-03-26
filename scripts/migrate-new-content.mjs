/**
 * Migrate new content to Sanity:
 * - 6 new poems (with body text)
 * - Body text for 2 existing poems (Weight of Mornings, Root System)
 * - 5 new events + update 2 existing events with descriptions/time/admission
 * - 6 books for the bookstore
 *
 * Usage: SANITY_TOKEN=xxx SANITY_PROJECT_ID=xxx node scripts/migrate-new-content.mjs
 */

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_TOKEN;
const DATASET = "production";
const API_VERSION = "2024-01-01";

if (!PROJECT_ID || !TOKEN) {
  console.error("Missing SANITY_PROJECT_ID or SANITY_TOKEN env vars");
  process.exit(1);
}

const API_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;

async function mutate(mutations) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Sanity API error:", JSON.stringify(data, null, 2));
    throw new Error(`Sanity mutation failed: ${res.status}`);
  }
  return data;
}

function block(text) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    children: [{ _type: "span", _key: Math.random().toString(36).slice(2, 10), text, marks: [] }],
    markDefs: [],
    style: "normal",
  };
}

// ── NEW POEMS ──
const newPoems = [
  {
    _id: "poem-dusk-pastoral",
    _type: "poem",
    title: "Dusk Pastoral",
    slug: { _type: "slug", current: "dusk-pastoral" },
    excerpt: "The field gives back its heat in slow waves, and the last swallows stitch the sky shut.",
    date: "2026-01-15",
    tags: ["Nature", "Free Verse"],
    featured: false,
    body: [
      block("The field gives back its heat"),
      block("in slow waves, and the last swallows"),
      block("stitch the sky shut."),
      block(""),
      block("I have watched this closing"),
      block("a thousand times and still"),
      block("it catches me mid-step,"),
      block("mid-thought, mid-life."),
    ],
  },
  {
    _id: "poem-moss-hymn",
    _type: "poem",
    title: "Moss Hymn",
    slug: { _type: "slug", current: "moss-hymn" },
    excerpt: "Old stone, soft cloak — patience makes its argument in green.",
    date: "2026-01-08",
    tags: ["Haiku", "Nature"],
    featured: false,
    body: [
      block("Old stone, soft cloak worn—"),
      block("patience makes its argument"),
      block("in tender greens."),
    ],
  },
  {
    _id: "poem-letter-to-my-hands",
    _type: "poem",
    title: "Letter to My Hands",
    slug: { _type: "slug", current: "letter-to-my-hands" },
    excerpt: "You who have held everything and kept nothing — I owe you an apology.",
    date: "2025-12-20",
    tags: ["Reflection", "Free Verse"],
    featured: false,
    body: [
      block("You who have held everything"),
      block("and kept nothing—"),
      block("I owe you an apology."),
      block(""),
      block("Every door you opened"),
      block("I walked through without looking back."),
      block("Every page you turned"),
      block("I read with someone else's eyes."),
      block(""),
      block("But you kept working—"),
      block("kneading bread, pulling weeds,"),
      block("writing these lines"),
      block("that try to say what you already know."),
    ],
  },
  {
    _id: "poem-equinox",
    _type: "poem",
    title: "Equinox",
    slug: { _type: "slug", current: "equinox" },
    excerpt: "The day and the dark agree, briefly, to share the table.",
    date: "2025-12-05",
    tags: ["Sonnet", "Nature"],
    featured: false,
    body: [
      block("The day and the dark agree, briefly,"),
      block("to share the table, split the bread,"),
      block("and for one turning of the earth"),
      block("neither claims the larger share."),
      block(""),
      block("I want to live inside this balance—"),
      block("the trembling midpoint, the held breath"),
      block("before the scales tip toward winter"),
      block("or the long exhale of spring."),
    ],
  },
  {
    _id: "poem-kitchen-window",
    _type: "poem",
    title: "Kitchen Window",
    slug: { _type: "slug", current: "kitchen-window" },
    excerpt: "Steam from the kettle fogs the glass — through it, the yard becomes a watercolor.",
    date: "2025-11-18",
    tags: ["Memory", "Reflection"],
    featured: false,
    body: [
      block("Steam from the kettle"),
      block("fogs the glass—through it,"),
      block("the yard becomes a watercolor:"),
      block("green bleeds into brown"),
      block("bleeds into the memory"),
      block("of my mother's kitchen,"),
      block("same window, same fog,"),
      block("different hands on the cup."),
    ],
  },
  {
    _id: "poem-crow-song",
    _type: "poem",
    title: "Crow Song",
    slug: { _type: "slug", current: "crow-song" },
    excerpt: "Three caws at dawn — a language I almost understand, like a word on the tip of forgetting.",
    date: "2025-11-02",
    tags: ["Haiku", "Nature"],
    featured: false,
    body: [
      block("Three caws at cold dawn—"),
      block("a word on the tip of all"),
      block("this world's forgetting."),
    ],
  },
];

// ── BODY TEXT PATCHES for existing poems ──
const poemBodyPatches = [
  {
    id: "poem-weight-of-mornings",
    body: [
      block("Before coffee, before news,"),
      block("when the house is still"),
      block("a shell of sleeping breath—"),
      block(""),
      block("I sit with the weight"),
      block("of another day arriving"),
      block("uninvited, certain,"),
      block("full of its own purposes."),
    ],
  },
  {
    id: "poem-root-system",
    body: [
      block("Underground, the conversation continues—"),
      block("fungi passing notes between the oaks,"),
      block("a network older than language,"),
      block("older than the need to be understood."),
    ],
  },
];

// ── EVENT UPDATES + NEW EVENTS ──
const eventUpdates = [
  {
    _id: "event-spring-reading",
    patch: {
      description: "An evening of new work from Ink & Earth alongside three guest poets. Wine, conversation, and the first poems of the season. Doors open at 6:30 PM.",
      time: "7:00 PM",
      admission: "Free",
      location: "The Bindery, Portland, OR",
    },
  },
  {
    _id: "event-open-mic",
    patch: {
      description: "Bring your voice, bring your verse. Five-minute slots, all forms welcome. Sign-up at the door. Coffee and pastries provided by the cafe.",
      time: "8:00 PM",
      admission: "Free",
      location: "Ink & Bean Cafe, Seattle, WA",
    },
  },
];

const newEvents = [
  {
    _id: "event-chapbook-launch",
    _type: "event",
    title: "Chapbook Launch: The Understory",
    description: "A reading and signing for the new chapbook. Limited letterpress editions available at the event. Followed by a Q&A on writing from the natural world.",
    date: "2026-06-10T18:30:00Z",
    location: "Powell's City of Books, Portland, OR",
    time: "6:30 PM",
    admission: "Free · Books available for purchase",
  },
  {
    _id: "event-writing-workshop",
    _type: "event",
    title: "Writing Workshop: Rooted Verse",
    description: "A half-day workshop on writing poetry grounded in place and landscape. We'll walk the garden, observe, and draft new work. Bring a notebook and comfortable shoes. Limited to 12 participants.",
    date: "2026-07-20T10:00:00Z",
    location: "Leach Botanical Garden, Portland, OR",
    time: "10:00 AM – 1:00 PM",
    admission: "$35 · Limited spots",
  },
  {
    _id: "event-summer-solstice",
    _type: "event",
    title: "Summer Solstice Reading",
    description: "Poetry under the longest light. An outdoor reading at golden hour, followed by a communal meal. Bring a blanket and a poem to share.",
    date: "2025-06-21T19:00:00Z",
    location: "Oaks Bottom Wildlife Refuge, Portland, OR",
    time: "7:00 PM",
    admission: "Free",
  },
  {
    _id: "event-fermentation",
    _type: "event",
    title: "Poetry & Fermentation",
    description: "An unlikely pairing: readings between courses of fermented foods. What does patience taste like? What does time do to language? An evening of slow things.",
    date: "2025-09-14T18:00:00Z",
    location: "Fermenter's Kitchen, Ashland, OR",
    time: "6:00 PM",
    admission: "$20 · Includes tasting",
  },
  {
    _id: "event-ember-hymnal",
    _type: "event",
    title: "Fall Reading: Ember Hymnal",
    description: "Poems from the collection written in the wake of wildfire season. A conversation about grief, landscape, and what grows back.",
    date: "2025-10-28T19:00:00Z",
    location: "Literary Arts, Portland, OR",
    time: "7:00 PM",
    admission: "Free",
  },
];

// ── BOOKS ──
const books = [
  {
    _id: "book-roots-and-rain",
    _type: "book",
    title: "Roots & Rain",
    subtitle: "Collected Poems 2019–2024",
    description: "A gathering of five years' worth of verse — meditations on soil, silence, and the seasons that shape us.",
    price: "$18.00",
    coverColor: "sage",
    year: "2024",
    format: "Paperback · 112 pages",
    sortOrder: 1,
  },
  {
    _id: "book-the-understory",
    _type: "book",
    title: "The Understory",
    subtitle: "A Chapbook",
    description: "Twelve poems written beneath old-growth canopy. What grows in shade. What refuses the light.",
    price: "$12.00",
    coverColor: "terracotta",
    year: "2023",
    format: "Chapbook · 32 pages",
    sortOrder: 2,
  },
  {
    _id: "book-fieldwork",
    _type: "book",
    title: "Fieldwork",
    subtitle: "Essays on Poetry & Place",
    description: "Where does a poem begin? In the body, in the land, in the gap between memory and forgetting.",
    price: "$22.00",
    coverColor: "stone",
    year: "2022",
    format: "Hardcover · 184 pages",
    sortOrder: 3,
  },
  {
    _id: "book-salt-and-meridian",
    _type: "book",
    title: "Salt & Meridian",
    subtitle: "New & Selected Poems",
    description: "A decade of writing distilled — from coastal fog to interior desert, tracing the meridians of longing.",
    price: "$20.00",
    coverColor: "sage-dark",
    year: "2021",
    format: "Paperback · 148 pages",
    sortOrder: 4,
  },
  {
    _id: "book-ember-hymnal",
    _type: "book",
    title: "Ember Hymnal",
    subtitle: "Poems of Fire & Ash",
    description: "What burns, what remains. Poems written in the wake of wildfire season — grief, resilience, renewal.",
    price: "$16.00",
    coverColor: "terracotta-dark",
    year: "2020",
    format: "Chapbook · 44 pages",
    sortOrder: 5,
  },
  {
    _id: "book-still-life-with-dirt",
    _type: "book",
    title: "Still Life with Dirt",
    subtitle: "First Collection",
    description: "The debut. Poems about hands in soil, kitchen tables, the small ceremonies of domestic life.",
    price: "$15.00",
    coverColor: "fog",
    year: "2019",
    format: "Paperback · 88 pages",
    sortOrder: 6,
  },
];

// ── EXECUTE ──
async function run() {
  const mutations = [];

  // New poems (createOrReplace)
  for (const poem of newPoems) {
    mutations.push({ createOrReplace: poem });
    console.log(`+ Poem: ${poem.title}`);
  }

  // Patch existing poems with body text
  for (const p of poemBodyPatches) {
    mutations.push({
      patch: { id: p.id, set: { body: p.body } },
    });
    console.log(`~ Patch poem body: ${p.id}`);
  }

  // Patch existing events
  for (const e of eventUpdates) {
    mutations.push({
      patch: { id: e._id, set: e.patch },
    });
    console.log(`~ Patch event: ${e._id}`);
  }

  // New events
  for (const event of newEvents) {
    mutations.push({ createOrReplace: event });
    console.log(`+ Event: ${event.title}`);
  }

  // Books
  for (const book of books) {
    mutations.push({ createOrReplace: book });
    console.log(`+ Book: ${book.title}`);
  }

  console.log(`\nSending ${mutations.length} mutations to Sanity...`);
  const result = await mutate(mutations);
  console.log(`Done! ${result.results?.length || 0} mutations applied.`);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
