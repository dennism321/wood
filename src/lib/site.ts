/**
 * TechAthos "PREVIEW" watermark tiled faintly over every page, for showing the
 * site to the client before launch. Set to false to remove it.
 */
export const showPreviewWatermark = true;

export const site = {
  name: "Soraghan Woodworking",
  legalName: "Soraghan Woodworking LLC",
  tagline: "Custom woodworking, cabinetry & general contracting in Connecticut",
  shortDescription:
    "Family-owned design-build studio and woodworking shop founded in 1987 by Irish master joiners Paul and Brian Soraghan. Custom kitchens, cabinetry, millwork, bars, furniture and whole-home construction across the Litchfield Hills and Greater Hartford.",
  founded: 1987,
  phone: "860-379-9837",
  phoneHref: "tel:+18603799837",
  email: "soraghanwoodworking@gmail.com",
  emailHref: "mailto:soraghanwoodworking@gmail.com",
  instagramHandle: "@soraghanwoodworking",
  instagramUrl: "https://www.instagram.com/soraghanwoodworking/",
  houzzUrl: "https://www.houzz.com/professionals/general-contractors/soraghan-woodworking-pfvwus-pf~277803647",
  office: {
    label: "Design studio & office",
    street: "374 West Street, Suite 100",
    city: "Bristol",
    state: "CT",
    zip: "06010",
  },
  shop: {
    label: "Woodworking shop",
    street: "4 Old North Road",
    city: "Barkhamsted",
    state: "CT",
    zip: "06063",
  },
  hours: [
    { day: "Monday – Friday", time: "7:00am – 5:00pm" },
    { day: "Saturday", time: "By appointment" },
    { day: "Sunday", time: "Closed" },
  ],
  serviceRegion: "Connecticut, New York, Massachusetts, Vermont & New Hampshire",
  url: "https://www.soraghanwoodworking.net",
} as const;

export const formatAddress = (a: { street: string; city: string; state: string; zip: string }) =>
  `${a.street}, ${a.city}, ${a.state} ${a.zip}`;

export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/our-process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/service-area", label: "Service Area" },
  { href: "/journal", label: "Journal" },
  { href: "/faq", label: "FAQ" },
];

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  intro: string[];
  highlights: string[];
  materials: string[];
  idealFor: string;
  timeline: string;
  image: string;
  imageAlt: string;
  galleryTags: string[];
  faqIndexes: number[];
};

export const services: Service[] = [
  {
    slug: "custom-kitchens",
    title: "Custom kitchen design & build",
    shortTitle: "Custom Kitchens",
    eyebrow: "Kitchens",
    summary:
      "Bespoke kitchens drawn, milled and installed by one team — from hand-finished cabinetry to islands built around how your family actually cooks.",
    intro: [
      "A kitchen is the most heavily used furniture in a house. Every drawer, door swing and counter height gets touched dozens of times a day, which is why we build kitchens the way a joiner builds a piece of furniture: measured, mocked up and assembled in our Barkhamsted shop before it ever reaches your home.",
      "Our designers work alongside the same craftsmen who mill the cabinetry, so a change on the drawing table is a change on the bench — not a change order lost between a dealer, a factory and three subcontractors.",
    ],
    highlights: [
      "Full design drawings, elevations and 3D views before a single board is cut",
      "Face-frame, inset and flush-inset cabinetry built in our own shop",
      "Islands, banquettes, hutches and pantry walls built to the inch",
      "Paint-grade maple, white oak, walnut, cherry, ash and reclaimed stock",
      "Coordinated counters, plaster, tile, lighting and appliance integration",
      "Appliance panels, integrated refrigeration and hidden charging drawers",
    ],
    materials: ["White oak", "Black walnut", "Hard maple", "Cherry", "Reclaimed pine"],
    idealFor: "Whole-kitchen remodels, additions, historic restorations and new custom homes.",
    timeline: "Design 4–8 weeks · shop & install 10–16 weeks",
    image: "/images/gallery/g02.jpg",
    imageAlt:
      "Custom kitchen with a blue painted island, marble and walnut counters, reclaimed timber beams and white inset cabinetry",
    galleryTags: ["kitchens"],
    faqIndexes: [0, 2, 5],
  },
  {
    slug: "custom-cabinetry-millwork",
    title: "Custom cabinetry & architectural millwork",
    shortTitle: "Cabinetry & Millwork",
    eyebrow: "Millwork",
    summary:
      "Butler's pantries, mudrooms, libraries, dressing rooms and paneling — millwork designed to look original to the house and built to outlast it.",
    intro: [
      "Architectural millwork is what makes a house feel considered. We match existing profiles, re-create period trim and then build new work that reads as though it has always been there — because the details are cut to the same rules as the originals.",
      "From a single window seat to a full floor of paneling, everything is drawn to the space, milled in-house and finished by hand.",
    ],
    highlights: [
      "Butler's pantries, mudrooms, laundry rooms and boot rooms",
      "Libraries, built-in desks, reading nooks and window seats",
      "Wall paneling, wainscot, coffered ceilings and crown profiles",
      "Dressing rooms, closet systems and integrated storage",
      "Doors, windows, casing and trim matched to existing profiles",
      "Historic restoration and profile duplication",
    ],
    materials: ["Paint-grade poplar", "White oak", "Mahogany", "Douglas fir", "V-groove boards"],
    idealFor: "Renovations, additions and homes that need volume and utility handled beautifully.",
    timeline: "Design 3–6 weeks · shop & install 6–12 weeks",
    image: "/images/gallery/g08.jpg",
    imageAlt:
      "Custom white inset cabinetry with glass-front uppers, brass hardware and a warm stone countertop",
    galleryTags: ["millwork"],
    faqIndexes: [1, 4, 5],
  },
  {
    slug: "bars-libraries",
    title: "Bars, libraries & statement rooms",
    shortTitle: "Bars & Libraries",
    eyebrow: "Signature work",
    summary:
      "The room everyone gathers in. Pub bars, tasting rooms, panelled libraries and speakeasies with carved columns, glass doors and hardware built for the space.",
    intro: [
      "Some projects are pure joy. A sunken pub bar in mahogany, a brick-backed back bar with leaded glass, a library wrapped in quarter-sawn oak — these are the rooms where our joiners' training in Ireland really shows.",
      "We engineer for real life as well: refrigeration and drainage hidden behind panels, wiring for glass-door lighting, and finishes that stand up to a full house.",
    ],
    highlights: [
      "Pub bars, back bars, tap systems and undercounter refrigeration",
      "Carved columns, corbels and hand-crafted capitals",
      "Coffered and panelled ceilings, moulded counter edges",
      "Leaded, seeded and mirrored glass doors",
      "Library shelving, rolling ladders and integrated lighting",
      "Wine rooms, tasting tables and humidor-grade detailing",
    ],
    materials: ["Mahogany", "Black walnut", "Quarter-sawn white oak", "Cherry", "Maple"],
    idealFor: "Finished lower levels, additions, tasting rooms and one-of-a-kind statement spaces.",
    timeline: "Design 4–8 weeks · shop & install 10–18 weeks",
    image: "/images/gallery/g05.jpg",
    imageAlt:
      "Handcrafted mahogany pub bar with spiral columns, coffered ceiling, brick back wall and glass-front cabinets",
    galleryTags: ["bars"],
    faqIndexes: [3, 5],
  },
  {
    slug: "custom-homes-additions",
    title: "Custom homes, additions & general contracting",
    shortTitle: "Custom Homes & Additions",
    eyebrow: "Design-build",
    summary:
      "One accountable team for the whole build: design, permits, structure, millwork, finishes and the punch list. Built for New England weather and Connecticut review boards.",
    intro: [
      "Soraghan Woodworking began as a general contracting firm, and that is still how we deliver major work. We can carry a project from feasibility and zoning through framing, millwork and final finish, or join your architect's team as the millwork and construction partner.",
      "Because the shop is ours, the interior details are never a value-engineering afterthought. The people who draw the plan are a short walk from the people who build it.",
    ],
    highlights: [
      "Custom homes, major additions and whole-house renovations",
      "Additions over garages, primary suites and in-law suites",
      "Structural review, permitting and zoning coordination",
      "Roofing, siding, windows, HVAC and envelope coordination",
      "Kitchens, baths, millwork, stairs and built-ins under one contract",
      "Phased work to keep a family at home during construction",
    ],
    materials: ["White cedar", "White oak", "Local hardwoods", "Standing-seam metal", "Natural stone"],
    idealFor: "Families planning a forever home, addition or top-to-bottom renovation.",
    timeline: "Design 8–16 weeks · construction 6–14 months",
    image: "/images/gallery/hero1.jpg",
    imageAlt:
      "Custom shingle-style home with twin brick chimneys, a covered porch and gravel motor court",
    galleryTags: ["homes"],
    faqIndexes: [2, 6, 7],
  },
  {
    slug: "bespoke-furniture",
    title: "Bespoke furniture & built-ins",
    shortTitle: "Bespoke Furniture",
    eyebrow: "Furniture",
    summary:
      "Dining tables, desks, banquettes and case pieces made to your dimensions, in the species and finish you choose — signed and dated by the maker.",
    intro: [
      "Sometimes the right answer isn't cabinetry at all. A dining table that fits a narrow room, a desk that hides the printer, a bench that curves with a bay window: small commissions are where we get to play with grain, joinery and edge profiles.",
      "Every piece is drawn first, then built solid — no particleboard cores, no veneer over filler. We finish in hard-wax oil or lacquer, and we tell you exactly how to care for it.",
    ],
    highlights: [
      "Dining, conference and game tables in solid hardwood",
      "Writing desks, credenzas and storage case pieces",
      "Banquettes, window seats and upholstered built-ins",
      "Bedroom furniture, dressers and nightstands",
      "Restoration and repair of heirloom pieces",
      "Hand-cut joinery: dovetails, mortise-and-tenon, breadboard ends",
    ],
    materials: ["Black walnut", "White oak", "Ash", "Cherry", "Reclaimed chestnut"],
    idealFor: "Client-owned homes and businesses wanting one perfectly sized, lasting piece.",
    timeline: "Design 2–4 weeks · build 4–10 weeks",
    image: "/images/gallery/hero2.jpg",
    imageAlt:
      "Custom dining table with upholstered chairs and floor-to-ceiling white built-in cabinetry in a sunlit room",
    galleryTags: ["furniture"],
    faqIndexes: [3, 5],
  },
  {
    slug: "historic-restoration",
    title: "Historic restoration & period joinery",
    shortTitle: "Historic Restoration",
    eyebrow: "Restoration",
    summary:
      "New England houses deserve joiners, not filler. We replicate profiles, match old growth timber and make repairs you cannot pick out of the original.",
    intro: [
      "Litchfield County is full of 18th and 19th century houses, and they ask for a different kind of care. We measure existing profiles by hand, match patina and species, and use joinery that lets old timber move the way it needs to.",
      "Where work is new, we build it to look old — and where something is genuinely historic, we repair rather than replace whenever it is structurally sane to do so.",
    ],
    highlights: [
      "Profile duplication for casings, rails, stiles and mouldings",
      "Historic window repair, sash restoration and storms",
      "Curved stair rails, balusters and newel turning",
      "Matching reclaimed and old-growth lumber",
      "Period-correct paneling, shutters and doors",
      "Discreet structural reinforcement and rot repair",
    ],
    materials: ["Reclaimed chestnut", "Old-growth pine", "Mahogany", "White oak"],
    idealFor: "Antique homes, barns, estates and buildings with local historic district review.",
    timeline: "Assessment 1–2 weeks · work scheduled in phases",
    image: "/images/gallery/g09.jpg",
    imageAlt:
      "Hand-finished curved walnut stair handrail with a volute over turned white spindles and white paneled wainscot",
    galleryTags: ["millwork", "homes"],
    faqIndexes: [4, 7],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export type GallerySeed = {
  slug: string;
  title: string;
  caption: string;
  alt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  site: string;
  baseLikes: number;
  featured?: boolean;
  daysAgo: number;
};

/** Content sourced from the Soraghan Woodworking site + Instagram grid. */
export const gallerySeed: GallerySeed[] = [
  {
    slug: "litchfield-kitchen-blue-island",
    title: "Litchfield Hills kitchen",
    caption:
      "Blue painted island, oak beams and a walnut counter section. Built in our shop, installed in a 1790s farmhouse that needed a working kitchen, not a showroom.",
    alt: "Custom blue painted kitchen island with dark wood and marble counters beneath reclaimed oak beams",
    imageUrl: "/images/gallery/g02.jpg",
    category: "Kitchens",
    tags: ["kitchens", "white-oak", "farmhouse"],
    site: "Litchfield Hills, CT",
    baseLikes: 214,
    featured: true,
    daysAgo: 2,
  },
  {
    slug: "mahogany-pub-bar",
    title: "The mahogany pub",
    caption:
      "Spiral columns turned by hand, a coffered ceiling and a bar top shaped for elbows. Eight weeks in the shop for a room the family will use every weekend.",
    alt: "Mahogany home pub bar with hand-turned spiral columns, coffered ceiling and brick back wall",
    imageUrl: "/images/gallery/g05.jpg",
    category: "Bars & Libraries",
    tags: ["bars", "mahogany", "joinery"],
    site: "Barkhamsted, CT",
    baseLikes: 487,
    featured: true,
    daysAgo: 5,
  },
  {
    slug: "copper-hood-kitchen",
    title: "Copper hood, oak floor",
    caption:
      "A full-height run in inset white cabinetry with a hand-hammered copper hood. The island is one slab — our installers measured the doorway twice.",
    alt: "Traditional kitchen with a hand-hammered copper hood, marble island and glass-front inset cabinetry",
    imageUrl: "/images/gallery/g03.jpg",
    category: "Kitchens",
    tags: ["kitchens", "cabinetry", "hardware"],
    site: "Greater Hartford, CT",
    baseLikes: 356,
    featured: true,
    daysAgo: 8,
  },
  {
    slug: "mahogany-bar-panelled-ceiling",
    title: "Panelled ceiling & bar",
    caption:
      "Coffered ceiling, glass-front uppers and a bar front detailed with inlaid diamonds. A basement that no longer feels like a basement.",
    alt: "Dark wood paneled bar room with coffered ceiling, glass-front cabinets and a clock",
    imageUrl: "/images/gallery/g04.jpg",
    category: "Bars & Libraries",
    tags: ["bars", "library", "mahogany"],
    site: "Farmington Valley, CT",
    baseLikes: 298,
    daysAgo: 12,
  },
  {
    slug: "georgian-estate",
    title: "Georgian estate",
    caption:
      "Full-service build for a classical Georgian house: envelope, trim, interior doors, cabinetry and the details you only notice on the third visit.",
    alt: "Classical Georgian estate home with symmetrical facade, balustrades and gravel drive",
    imageUrl: "/images/gallery/g06.jpg",
    category: "Custom Homes",
    tags: ["homes", "millwork", "exterior"],
    site: "Litchfield County, CT",
    baseLikes: 641,
    featured: true,
    daysAgo: 16,
  },
  {
    slug: "garden-pool-house",
    title: "Pool house & pergola",
    caption:
      "A pool house built to the same standard as the main home: arched openings, standing-seam roof, cedar pergola and stone coping around the water.",
    alt: "Garden pool house with arched openings beside a long stone-edged swimming pool and lawn",
    imageUrl: "/images/gallery/g07.jpg",
    category: "Custom Homes",
    tags: ["homes", "outdoor", "timber"],
    site: "Litchfield Hills, CT",
    baseLikes: 402,
    daysAgo: 21,
  },
  {
    slug: "bay-window-corbels",
    title: "Bay window & corbels",
    caption:
      "New exterior millwork on an older home. Corbels, crown and casing cut to match the original profile — then primed and hand-finished on site.",
    alt: "Exterior bay window with decorative white corbels and paneled base on a New England home",
    imageUrl: "/images/gallery/g01.jpg",
    category: "Millwork",
    tags: ["millwork", "exterior", "restoration"],
    site: "New Hartford, CT",
    baseLikes: 187,
    daysAgo: 26,
  },
  {
    slug: "inset-cabinetry-detail",
    title: "Inset cabinetry, brass hardware",
    caption:
      "Butler's pantry cabinetry in a soft warm finish. Glass uppers, a wood counter for work, and drawers that close with one finger.",
    alt: "Custom inset cabinetry with glass-front upper doors, brass pulls and a wood countertop",
    imageUrl: "/images/gallery/g08.jpg",
    category: "Millwork",
    tags: ["millwork", "cabinetry", "hardware"],
    site: "West Hartford, CT",
    baseLikes: 263,
    daysAgo: 32,
  },
  {
    slug: "curved-stair-handrail",
    title: "Curved rail, hand-cut volute",
    caption:
      "A walnut rail with a carved volute, fitted to a curved stringer. This is the piece we use when people ask what a master joiner actually does.",
    alt: "Curved walnut stair handrail ending in a carved volute above turned white spindles",
    imageUrl: "/images/gallery/g09.jpg",
    category: "Millwork",
    tags: ["millwork", "stairs", "joinery"],
    site: "Barkhamsted shop",
    baseLikes: 512,
    featured: true,
    daysAgo: 38,
  },
  {
    slug: "shingle-style-residence",
    title: "Shingle-style residence",
    caption:
      "A new build in the shingle style, with a covered porch deep enough for August afternoons. Framing through finish, one team.",
    alt: "Shingle-style custom home with green siding, twin brick chimneys and covered porch",
    imageUrl: "/images/gallery/hero1.jpg",
    category: "Custom Homes",
    tags: ["homes", "exterior"],
    site: "Litchfield County, CT",
    baseLikes: 377,
    daysAgo: 46,
  },
  {
    slug: "banquette-and-bookcase",
    title: "Banquette & bookcase",
    caption:
      "A dining room built around a window seat: full-height bookcase on one wall, upholstered banquette on the other, table to fit the room exactly.",
    alt: "Dining room with floor-to-ceiling built-in bookcase, upholstered banquette and custom wood table",
    imageUrl: "/images/gallery/hero2.jpg",
    category: "Furniture",
    tags: ["furniture", "millwork", "interiors"],
    site: "New York, NY",
    baseLikes: 331,
    daysAgo: 54,
  },
  // From the @soraghanwoodworking Instagram feed
  {
    slug: "palm-beach-sinker-cypress-kitchen",
    title: "Palm Beach, 1925",
    caption:
      "Hand-joined doors and kitchen cabinets in reclaimed sinker cypress, recovered from river bottoms, for a landmarked Volk & Maass home. The restoration won the 2018 Polly Earl and Addison Mizner awards.",
    alt: "Mediterranean-style kitchen with a carved cypress island, iron lanterns and a beamed, arched ceiling",
    imageUrl: "/images/instagram/palm-beach-cypress-kitchen.jpg",
    category: "Kitchens",
    tags: ["kitchens", "reclaimed", "restoration"],
    site: "Palm Beach, FL",
    baseLikes: 402,
    daysAgo: 58,
  },
  {
    slug: "adirondack-church-altar",
    title: "An Adirondack altar",
    caption:
      "A new church altar and carved reredos in the heart of the Adirondacks — gothic tracery, layered arches and a frame sized to the rose window above.",
    alt: "Tall carved wooden church altarpiece with gothic arches beneath a round stained-glass window",
    imageUrl: "/images/instagram/adirondack-church-altar.jpg",
    category: "Millwork",
    tags: ["millwork", "carving", "ecclesiastical"],
    site: "Adirondacks, NY",
    baseLikes: 365,
    daysAgo: 62,
  },
  {
    slug: "white-oak-bar-cabinet",
    title: "Quarter-sawn oak bar cabinet",
    caption:
      "Sliding doors in quarter-sawn white oak with antique mirror inlays and black lattice accents, on a painted base with tapered legs.",
    alt: "Bar cabinet with sliding antique-mirror doors framed in black lattice over white oak drawers",
    imageUrl: "/images/instagram/oak-bar-cabinet.jpg",
    category: "Furniture",
    tags: ["furniture", "white-oak", "bars"],
    site: "Connecticut",
    baseLikes: 248,
    daysAgo: 66,
  },
  {
    slug: "marlo-laz-archway",
    title: "Marlo Laz, West Village",
    caption:
      "The Rajasthani-inspired archway at the Marlo Laz jewelry flagship on Bleecker Street, conceived by the designer and built in our shop. Fortuny fabric hangs beneath it.",
    alt: "Pink plaster jewelry boutique with a scalloped Rajasthani-style wooden archway hung with red drapes",
    imageUrl: "/images/instagram/marlo-laz-archway.jpg",
    category: "Millwork",
    tags: ["millwork", "commercial", "arches"],
    site: "New York, NY",
    baseLikes: 296,
    daysAgo: 70,
  },
  {
    slug: "marlo-laz-store",
    title: "The Marlo Laz flagship",
    caption:
      "Pink Venetian plaster, a 1970s Murano chandelier and marble vitrines, with our archway framing the back of the room.",
    alt: "Pink jewelry store interior with a Murano glass chandelier, display vitrines and an arched alcove",
    imageUrl: "/images/instagram/marlo-laz-store.jpg",
    category: "Millwork",
    tags: ["millwork", "commercial", "interiors"],
    site: "New York, NY",
    baseLikes: 211,
    daysAgo: 71,
  },
  {
    slug: "chestnut-farmhouse-kitchen",
    title: "Retro farmhouse kitchen",
    caption:
      "Hand-painted cabinets and countertops cut from 200-year-old chestnut, with open shelves and a vintage drainboard sink.",
    alt: "Farmhouse kitchen with yellow painted cabinets, chestnut countertops, open shelving and a vintage white sink",
    imageUrl: "/images/instagram/chestnut-farmhouse-kitchen.jpg",
    category: "Kitchens",
    tags: ["kitchens", "reclaimed", "farmhouse"],
    site: "Connecticut",
    baseLikes: 187,
    daysAgo: 76,
  },
  {
    slug: "collinsville-mint-kitchen",
    title: "Mint green in Collinsville",
    caption:
      "A 2019 remodel: mint green cabinetry that ties together the Bertazzoni range, farmhouse sink and quartz tops, under a planked wood hood.",
    alt: "Kitchen with mint green cabinets, a wood-clad range hood, subway tile and a gas range",
    imageUrl: "/images/instagram/collinsville-mint-kitchen.jpg",
    category: "Kitchens",
    tags: ["kitchens", "cabinetry", "remodel"],
    site: "Collinsville, CT",
    baseLikes: 233,
    daysAgo: 82,
  },
  {
    slug: "island-with-bookshelves",
    title: "An island for cookbooks",
    caption:
      "A painted island with open shelving on the end for cookbooks, inside a kitchen of full-height inset cabinetry.",
    alt: "White kitchen island with a dark countertop and open bookshelves on its end",
    imageUrl: "/images/instagram/island-bookshelves.jpg",
    category: "Kitchens",
    tags: ["kitchens", "cabinetry", "shelving"],
    site: "Connecticut",
    baseLikes: 174,
    daysAgo: 88,
  },
  {
    slug: "walk-in-pantry",
    title: "The organized pantry",
    caption:
      "Open shelves to the ceiling, butcher-block counters for small appliances and deep drawers below. Everything has a place.",
    alt: "Walk-in pantry with white open shelving, butcher-block counters and baskets",
    imageUrl: "/images/instagram/walk-in-pantry.jpg",
    category: "Millwork",
    tags: ["millwork", "pantry", "storage"],
    site: "Connecticut",
    baseLikes: 205,
    daysAgo: 94,
  },
  {
    slug: "closet-library-ladder",
    title: "A dressing room with a ladder",
    caption:
      "Built-in shelving and drawers wall to wall, with a rolling library ladder to reach the top shelves.",
    alt: "Bright walk-in closet with white built-in shelves, drawers and a rolling wooden library ladder",
    imageUrl: "/images/instagram/closet-library-ladder.jpg",
    category: "Millwork",
    tags: ["millwork", "closets", "storage"],
    site: "Connecticut",
    baseLikes: 192,
    daysAgo: 100,
  },
];

/** Shop video from the @soraghanwoodworking Instagram feed. */
export const shopVideo = {
  title: "A walnut table, slab to supper",
  caption: "From our hands to their home — a table made for new beginnings.",
  src: "/videos/walnut-table.mp4",
  poster: "/videos/walnut-table-poster.jpg",
  instagramUrl: "https://www.instagram.com/reel/DP81FUbgJFR/",
  steps: [
    "Rough black walnut slabs picked from the stack",
    "Milled flat on the planer and jointer",
    "Glued up, clamped and finished in the shop",
    "Delivered and set in the family's dining room",
  ],
};

export const galleryCategories = [
  "All",
  "Kitchens",
  "Bars & Libraries",
  "Millwork",
  "Custom Homes",
  "Furniture",
] as const;

export type Faq = { q: string; a: string; category: string };

export const faqs: Faq[] = [
  {
    q: "What does a custom kitchen cost in Connecticut?",
    a: "Most full custom kitchens we build land between $90,000 and $250,000 including cabinetry, counters, appliances and installation; large or highly detailed rooms can exceed that. Because we design, mill and install in-house, we can give you a realistic range after the first walkthrough and a firm number once drawings are approved — before the shop starts cutting.",
    category: "Cost & timelines",
  },
  {
    q: "Do you only build furniture, or do you also handle construction?",
    a: "Both. Soraghan Woodworking is a family-owned design-build and general contracting firm as well as a woodworking shop. We take on whole-house renovations, additions and new custom homes, and we also build one-off pieces of furniture and single runs of cabinetry.",
    category: "Working together",
  },
  {
    q: "How long does a project take from first call to installation?",
    a: "A single furniture commission typically takes six to twelve weeks. Kitchens and millwork projects usually run three to five months from design approval, and whole-home work runs six to fourteen months depending on permits and scope. We publish a milestone schedule at the start and update it weekly.",
    category: "Cost & timelines",
  },
  {
    q: "Can you match the trim and mouldings already in my house?",
    a: "Yes. We measure existing profiles by hand and have knives ground when a profile is unusual or no longer made. For antique homes we also match species, grain direction and finish sheen so new work is indistinguishable from the original.",
    category: "Materials & craft",
  },
  {
    q: "What wood species and finishes do you recommend?",
    a: "For painted cabinetry, hard maple is our standard because it takes paint cleanly and wears well. For natural finishes we reach for white oak (stable, beautiful grain), black walnut (rich, warm, distinctive) and cherry (which deepens with light). We finish with hard-wax oil or a catalyzed lacquer depending on how the surface will be used.",
    category: "Materials & craft",
  },
  {
    q: "Where is your workshop, and can I visit?",
    a: "Our shop is at 4 Old North Road in Barkhamsted, Connecticut, and our design studio is at 374 West Street, Suite 100 in Bristol. Shop visits and finish samples are welcome by appointment — it is the best way to understand what you are buying.",
    category: "Working together",
  },
  {
    q: "Which towns and states do you serve?",
    a: "We work throughout the Litchfield Hills and Greater Hartford, including Bristol, Barkhamsted, Avon, Simsbury, Farmington, West Hartford, Litchfield, Torrington, New Hartford, Canton, Goshen, Washington and Salisbury. We also take on select projects in New York, Massachusetts, Vermont and New Hampshire.",
    category: "Logistics",
  },
  {
    q: "Do you handle permits, drawings and historic district approvals?",
    a: "Yes. We coordinate structural review, building permits, zoning and historic district submissions, and we work with your architect or engineer when one is already involved. Where local review is required, we prepare the drawings and finish schedules that boards ask for.",
    category: "Logistics",
  },
  {
    q: "Is a custom kitchen really worth it over stock cabinets?",
    a: "Custom cabinetry earns its cost in fit and function: awkward corners, uneven old walls, specific pan sizes and a room that is 11 feet 4 inches wide instead of 12. Stock boxes force the room to compromise. Independently, a well-built custom kitchen is also more repairable — doors and drawers can be re-made rather than replaced.",
    category: "Cost & timelines",
  },
  {
    q: "Can you build cabinetry for a contractor or designer I already hired?",
    a: "Frequently. We act as the millwork partner for architects, interior designers and general contractors, building to their drawings and delivering on their schedule. We can also take on the general contract if that is simpler for you.",
    category: "Working together",
  },
  {
    q: "What does a first consultation involve?",
    a: "A walkthrough of the space, a conversation about how you live in it, rough measurements and photos, and an honest read on what is possible at your budget. There is no charge for the initial conversation and no obligation to proceed.",
    category: "Working together",
  },
  {
    q: "How do you protect the rest of my house during installation?",
    a: "Floors are covered, air handlers are sealed off during dusty operations, spray work happens in our shop rather than your home, and we clean at the end of each day. On occupied renovations we sequence work so at least one kitchen and bathroom stays usable throughout.",
    category: "Logistics",
  },
];

export const faqCategories = [
  "All",
  "Working together",
  "Cost & timelines",
  "Materials & craft",
  "Logistics",
];

export const values = [
  {
    title: "Integrity",
    body: "Straight answers on scope, cost and what we would not do in your home. The same crew that starts the job is there at the punch list.",
  },
  {
    title: "Quality",
    body: "Solid stock, hand-cut joinery and hardware chosen to work in ten years, not just to photograph well on day one.",
  },
  {
    title: "Creativity",
    body: "Every house fights back somewhere. A curved rail, a hidden pantry, a window that has to stay — we design around the reality.",
  },
  {
    title: "Precision design",
    body: "Drawings are measured against the actual room, mocked up where it matters, and approved before anything is cut.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Conversation & walkthrough",
    body: "We meet in the space, take measurements and photos, and talk about how you actually live. No charge, no pressure, honest feedback on budget.",
    detail: "1–2 weeks",
  },
  {
    step: "02",
    title: "Design & samples",
    body: "Elevations, plans and 3D views, plus physical samples of paint, stain and wood. We refine together until the room is right on paper.",
    detail: "3–8 weeks",
  },
  {
    step: "03",
    title: "Approval & schedule",
    body: "A detailed proposal, a milestone schedule and a single point of contact. Permits and structural review are handled before demolition.",
    detail: "1–3 weeks",
  },
  {
    step: "04",
    title: "Shop build",
    body: "Cabinetry and furniture are milled, finished and assembled in Barkhamsted. You are welcome to visit your project mid-build.",
    detail: "4–12 weeks",
  },
  {
    step: "05",
    title: "Installation",
    body: "Our own installers protect the house, work clean and set the final details — counters, hardware, trim, lighting and touch-up.",
    detail: "1–4 weeks",
  },
  {
    step: "06",
    title: "Care & follow-up",
    body: "A walkthrough, a care guide for every finish, and a standing invitation to call if something needs adjusting. We answer.",
    detail: "Ongoing",
  },
];

export const woodSpecies = [
  {
    name: "White oak",
    note: "Stable, water-resistant and quietly beautiful. Our default for natural-finish cabinetry.",
    color: "#c8ab7d",
    best: "Kitchens, flooring, stairs",
  },
  {
    name: "Black walnut",
    note: "Deep chocolate heartwood with dramatic figure. Reserved for statement pieces.",
    color: "#513526",
    best: "Bars, tables, rails",
  },
  {
    name: "Hard maple",
    note: "Tight, even grain that takes paint perfectly and resists wear.",
    color: "#e3d3b4",
    best: "Painted cabinetry",
  },
  {
    name: "Cherry",
    note: "Warm and smooth, darkening with light. Ages beautifully in south-facing rooms.",
    color: "#8d5236",
    best: "Libraries, furniture",
  },
  {
    name: "Reclaimed chestnut",
    note: "Old-growth character with history. Sourced from regional barns where we can.",
    color: "#6d5b46",
    best: "Restoration, beams",
  },
];

export const stats = [
  { value: 1987, label: "Family founded", suffix: "" },
  { value: 40, label: "Years in the trade", suffix: "+" },
  { value: 5, label: "New England states served", suffix: "" },
  { value: 100, label: "Projects under one roof", suffix: "%" },
];

export const towns = [
  {
    name: "Bristol",
    note: "Our office and design studio. From Federal Hill to Chippens Hill, we know the housing stock, the permit office and the trades.",
  },
  {
    name: "Barkhamsted",
    note: "Home of our woodworking shop on Old North Road, where every cabinet and table is milled and finished.",
  },
  {
    name: "Avon & Simsbury",
    note: "Farmington Valley kitchens, mudrooms, libraries and additions — often on older homes with uneven walls.",
  },
  {
    name: "West Hartford",
    note: "Butler's pantries, inset cabinetry and period-sensitive millwork in the town's 1920s housing stock.",
  },
  {
    name: "Litchfield & Goshen",
    note: "Estate work, barn restoration and kitchens that have to work as well as they look.",
  },
  {
    name: "Torrington & New Hartford",
    note: "Renovations, additions and shop-built furniture for families upsizing without moving.",
  },
  {
    name: "Salisbury & Sharon",
    note: "Second-home build-outs and full-service renovations with long-distance build management.",
  },
  {
    name: "Hartford & Farmington",
    note: "Commercial fit-outs, office millwork and residential work throughout Greater Hartford.",
  },
];

export const testimonials = [
  {
    quote:
      "Paul and Brian built our kitchen and a library wall in the same winter. Four years on, the drawers still close with a finger and nothing has moved.",
    author: "Homeowner",
    place: "Litchfield Hills, CT",
  },
  {
    quote:
      "They matched mouldings from 1830 that nobody stocks anymore. You cannot tell where the old work stops.",
    author: "Homeowner",
    place: "Salisbury, CT",
  },
  {
    quote:
      "The shop is the difference. Our designer could walk over, put a door sample on the bench and settle it that afternoon.",
    author: "Interior designer",
    place: "West Hartford, CT",
  },
];
