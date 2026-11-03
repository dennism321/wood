export type JournalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  date: string;
  dateLabel: string;
  hero: string;
  heroAlt: string;
  intro: string;
  sections: JournalSection[];
  takeaways: string[];
  relatedService: string;
  faq?: { q: string; a: string };
};

export const journalPosts: JournalPost[] = [
  {
    slug: "custom-kitchen-cost-connecticut",
    title: "What a custom kitchen really costs in Connecticut",
    description:
      "A honest 2026 cost breakdown for custom kitchens in Connecticut — cabinetry, counters, appliances, labor and the line items homeowners forget.",
    category: "Budgeting",
    readingTime: "7 min read",
    date: "2026-01-14",
    dateLabel: "January 14, 2026",
    hero: "/images/gallery/g03.jpg",
    heroAlt: "Traditional custom kitchen with copper hood and marble island",
    intro:
      "Kitchen budgets fail for a predictable reason: homeowners price the cabinets and forget the room. Here is how a custom kitchen budget actually breaks down in central Connecticut, and where the money genuinely buys something.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Most full custom kitchens we build in the Litchfield Hills and Greater Hartford land between $90,000 and $250,000, all in. A straightforward 200-square-foot galley may come closer to $75,000; a large room with inset cabinetry, a hand-hammered hood, integrated refrigeration and stone slabs can pass $300,000.",
          "Those numbers include cabinetry, counters, appliances, lighting, tile, plumbing trim and installation. They do not include structural work, additions or a new floor.",
        ],
      },
      {
        heading: "Where the money goes",
        bullets: [
          "Custom cabinetry: 35–50% of the budget. Inset doors, dovetailed drawers and a shop-built finish are labor, not materials.",
          "Counters and slabs: 8–15%. Natural stone is priced by the slab, and a large island may need two.",
          "Appliances: 8–18%. Panel-ready refrigeration and professional ranges push this up quickly.",
          "Tile, plumbing and lighting: 8–12%.",
          "Construction, plaster, electrical and installation labor: 15–25%.",
        ],
      },
      {
        heading: "Why custom costs more than stock — and when it does not",
        paragraphs: [
          "Stock cabinets are cheaper per box. But an old house with out-of-square walls pays that difference back in filler panels, soffits and compromises. Custom work is built to the opening, so a 98-inch wall gets a 98-inch run.",
          "Custom is also repairable. A damaged door can be re-made years later in the same profile and finish. With a discontinued stock line, one broken door can mean a whole new elevation.",
        ],
      },
      {
        heading: "The line items homeowners forget",
        bullets: [
          "Temporary kitchen setup if you are living in the house.",
          "Dumpster, permits and inspection fees.",
          "Electrical upgrades: a modern kitchen rarely runs on the old panel.",
          "Plaster repair and paint after cabinet removal.",
          "Hardware upgrades — quality pulls are $20–$80 each.",
          "Lighting design, and the electrician's time to install it.",
        ],
      },
      {
        heading: "How to keep a budget honest",
        paragraphs: [
          "Ask for a proposal with allowances stated as numbers, not adjectives. Lock the design before demolition. And keep a 10% contingency that you do not spend on a nicer range the week before install.",
          "We price from drawings, not from a photograph, and we say plainly when a requested detail will not fit the budget you have. That conversation is much cheaper in the design phase than in the shop.",
        ],
      },
    ],
    takeaways: [
      "Plan on $90k–$250k all-in for most custom kitchens in central Connecticut.",
      "Cabinetry is the largest line and the one that lasts longest.",
      "Budget 10% for what you cannot see until walls are open.",
    ],
    relatedService: "custom-kitchens",
    faq: {
      q: "How much does a custom kitchen cost in Connecticut?",
      a: "Most custom kitchens in central Connecticut run $90,000 to $250,000 all-in, including cabinetry, counters, appliances and installation. Complex rooms with inset cabinetry, integrated refrigeration and large stone islands can exceed $300,000.",
    },
  },
  {
    slug: "choosing-wood-species-cabinetry",
    title: "Choosing a wood species for cabinetry and furniture",
    description:
      "White oak, walnut, maple, cherry or reclaimed chestnut? A joiner's guide to picking the right wood for your kitchen, library or table in New England.",
    category: "Materials",
    readingTime: "5 min read",
    date: "2025-12-02",
    dateLabel: "December 2, 2025",
    hero: "/images/gallery/g08.jpg",
    heroAlt: "Close view of custom inset cabinetry with glass doors and brass hardware",
    intro:
      "The species you choose affects how a piece wears, how it ages and how much it costs. Here is how we help clients decide — usually in the shop, with three samples on the bench.",
    sections: [
      {
        heading: "Painted rooms: hard maple",
        paragraphs: [
          "Hard maple has a tight, even grain that does not telegraph through paint. Poplar is cheaper but blotchy under a dark colour, and softer woods dent. For a crisp, modern kitchen that will be white or a deep colour, maple is the safe engineering choice.",
        ],
      },
      {
        heading: "Natural kitchens: white oak",
        paragraphs: [
          "White oak is stable, water-resistant and visually calm. Rift-sawn faces give straight grain for a modern look; plain sawn gives the cathedral figure people associate with traditional joinery. It also takes a wide range of stains without going muddy.",
        ],
      },
      {
        heading: "Statement pieces: black walnut",
        paragraphs: [
          "Walnut is dark, warm and expensive. It is the right answer for bars, dining tables and stair rails where the wood is meant to be the detail. Match it with brass hardware and let it be the only dark thing in the room.",
        ],
      },
      {
        heading: "Living finishes: cherry and reclaimed chestnut",
        paragraphs: [
          "Cherry darkens with exposure to light, so it is a living finish. Twelve months in a bright room will change it more than any stain choice. Reclaimed chestnut brings old-growth grain and history; we source it regionally and make sure it is dried and checked before it goes on a bench.",
        ],
      },
      {
        heading: "How we decide together",
        bullets: [
          "Match the species to how hard the surface will work.",
          "Bring samples into your room's light, not the showroom's.",
          "Ask what the wood will look like in ten years, not on install day.",
          "Consider the floor and counter — three woods in one room is usually one too many.",
        ],
      },
    ],
    takeaways: [
      "Maple for paint, white oak for natural, walnut for statements.",
      "Judge samples in your own light at three times of day.",
      "Cherry changes colour — decide if you like the aged version.",
    ],
    relatedService: "bespoke-furniture",
  },
  {
    slug: "how-long-does-a-renovation-take",
    title: "How long a renovation actually takes (and why)",
    description:
      "A realistic timeline for custom kitchens, additions and whole-home renovations in Connecticut, including permits, shop time and installation sequencing.",
    category: "Planning",
    readingTime: "6 min read",
    date: "2025-11-08",
    dateLabel: "November 8, 2025",
    hero: "/images/gallery/g02.jpg",
    heroAlt: "Kitchen renovation with reclaimed beams and blue island",
    intro:
      "Timelines slip for reasons that are almost never mysterious. This is the sequence we publish at the start of every project, and where the buffer belongs.",
    sections: [
      {
        heading: "The honest numbers",
        bullets: [
          "Custom furniture: 6–12 weeks from approval.",
          "Kitchen or millwork package: 3–5 months including design.",
          "Additions: 6–10 months including permit review.",
          "Whole-home renovation: 8–14 months, longer for historic properties.",
        ],
      },
      {
        heading: "Design is not the slow part — decisions are",
        paragraphs: [
          "Drawing a kitchen takes weeks. Deciding on a faucet finish can take a month when nobody owns the decision. We build a decision calendar with each client: the date by which counters must be chosen, the date by which tile must be on site. Late selections are the single most common cause of delay.",
        ],
      },
      {
        heading: "Permits and lead times",
        paragraphs: [
          "Connecticut town reviews vary considerably, and historic districts add another layer. Appliances and windows have their own lead times — six to sixteen weeks for some refrigeration. We order early and store materials in our shop when necessary.",
        ],
      },
      {
        heading: "Shop time is working time",
        paragraphs: [
          "While the site is being prepared, your cabinetry is already being milled in Barkhamsted. That overlap is why a full custom kitchen can be finished in a few months instead of a year: the shop is not waiting for the electrician.",
        ],
      },
      {
        heading: "Living through it",
        paragraphs: [
          "If you stay in the house, we sequence the work so a bathroom and a temporary kitchen remain functional. Dust barriers, floor protection and daily cleanup are part of the contract, not a favour.",
        ],
      },
    ],
    takeaways: [
      "Allow 3–5 months for a custom kitchen, 8+ months for a major addition.",
      "Decision dates matter more than contractor hustle.",
      "Overlap shop work with site work to save weeks.",
    ],
    relatedService: "custom-homes-additions",
  },
  {
    slug: "inset-vs-full-overlay-cabinetry",
    title: "Inset vs. full-overlay cabinetry: what to know",
    description:
      "Flush inset doors, full overlay and face-frame construction explained by a Connecticut cabinetmaker — cost, durability, gaps, hardware and historic fit.",
    category: "Craft",
    readingTime: "5 min read",
    date: "2025-10-21",
    dateLabel: "October 21, 2025",
    hero: "/images/gallery/g05.jpg",
    heroAlt: "Coffered ceiling and handcrafted mahogany cabinetry in a pub room",
    intro:
      "Inset looks effortless, is unforgiving to build, and is usually the right answer in an older house. Here is the honest trade-off.",
    sections: [
      {
        heading: "What inset actually means",
        paragraphs: [
          "An inset door sits flush within the face frame, like a piece of furniture. A full-overlay door sits in front of the frame and covers it entirely. Inset reveals (the visible gap around each door) are typically 3/32\" to 1/8\" and must be consistent on every door in the room.",
          "Because the opening must be built to the exact size of the door, inset demands accurate joinery and self-closing hinges with fine adjustment. There is no hiding an error behind an overlapping panel.",
        ],
      },
      {
        heading: "Where inset earns its keep",
        bullets: [
          "Older homes where furniture-style cabinetry belongs.",
          "Visible rooms — inset reads as built-in furniture, not appliances.",
          "Designs where the frame itself is part of the composition.",
          "Period restorations and high-detail bar and library work.",
        ],
      },
      {
        heading: "Where full overlay makes sense",
        paragraphs: [
          "Full overlay gives slightly more usable interior space because doors cover the frame, and it is more forgiving of a room that will settle. In a basement bar or a utility room it is often the sensible choice.",
        ],
      },
      {
        heading: "The costs people do not expect",
        paragraphs: [
          "Expect a meaningful premium for inset: precision, hinging and hand-fitting take time. Realistic timelines are longer too. In exchange you get a kitchen that looks quiet and considered, and that can be repaired piece by piece for decades.",
        ],
      },
    ],
    takeaways: [
      "Inset = flush doors, exposed frame, precision joinery.",
      "Best in older, visible, furniture-style rooms.",
      "Budget a premium and a longer schedule for inset.",
    ],
    relatedService: "custom-cabinetry-millwork",
  },
  {
    slug: "planning-an-addition-in-the-litchfield-hills",
    title: "Planning an addition in the Litchfield Hills",
    description:
      "Site work, septic, slopes, permits and roof tie-ins: what to check before you design a Connecticut addition, from a design-build team that builds them.",
    category: "Design-build",
    readingTime: "6 min read",
    date: "2025-09-18",
    dateLabel: "September 18, 2025",
    hero: "/images/gallery/hero1.jpg",
    heroAlt: "Shingle-style custom home with covered porch and chimneys",
    intro:
      "The most expensive addition mistake happens before a line is drawn: choosing a footprint the site or the septic system will not allow. Here is the pre-design checklist we run.",
    sections: [
      {
        heading: "Check the dirt first",
        bullets: [
          "Septic location and capacity — often the real limit on bedrooms and baths.",
          "Well location and setbacks.",
          "Slope and drainage; a walk-out foundation can be cheaper than fill.",
          "Tree cover and root protection zones.",
          "Access for a concrete truck and a crane.",
        ],
      },
      {
        heading: "Zoning, before drawings",
        paragraphs: [
          "Setbacks, lot coverage and height restrictions decide what is buildable. In several Litchfield County towns a modest addition needs both zoning approval and inland wetlands review. Bringing those conversations forward prevents a beautiful plan that cannot be permitted.",
        ],
      },
      {
        heading: "Roof tie-ins and the invisible cost",
        paragraphs: [
          "The line where a new roof meets an old one is where additions get complicated. Matching pitch, flashing and shingle, and keeping the interior ceiling height sane, usually costs more than the framing itself. We model the tie-in in the first set of drawings.",
        ],
      },
      {
        heading: "Plan the interior millwork early",
        paragraphs: [
          "An addition is the moment to solve storage, mudroom and pantry problems permanently. Deciding where built-ins go while walls are open costs almost nothing; adding them two years later costs five figures.",
        ],
      },
    ],
    takeaways: [
      "Septic and zoning are the real constraints — check them first.",
      "The roof tie-in is the hidden budget line.",
      "Design millwork while the walls are open.",
    ],
    relatedService: "custom-homes-additions",
  },
];

export const getJournalPost = (slug: string) => journalPosts.find((p) => p.slug === slug);
