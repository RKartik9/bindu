export const categories = [
  "Branding",
  "Editorial",
  "Digital",
  "Packaging",
  "Campaign",
] as const;

export type Category = (typeof categories)[number];

export type Ratio = "portrait" | "tall" | "square" | "landscape";

export const ratioSize: Record<Ratio, { width: number; height: number }> = {
  portrait: { width: 768, height: 1024 },
  tall: { width: 768, height: 1024 },
  square: { width: 1024, height: 1024 },
  landscape: { width: 1024, height: 768 },
};

export type Motif = "poster" | "grid" | "letter" | "mockup" | "stripes" | "arches" | "type";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: Category;
  year: number;
  summary: string;
  palette: { bg: string; fg: string; accent: string };
  motif: Motif;
  ratios: Ratio[];
};

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "mitti-ceramics",
    title: "Mitti Ceramics",
    client: "Mitti Ceramics",
    category: "Branding",
    year: 2026,
    summary:
      "A potter in Kumhar Gram, Delhi's potters' colony, with a waiting list and no logo. We drew a wordmark from the stamp she presses into the base of every piece, picked colours from her glazes, and made a price tag that doubles as a care card.",
    palette: { bg: "#e9d8c4", fg: "#2b1d14", accent: "#c4532d" },
    motif: "letter",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "kangra-chai",
    title: "Kangra Chai Co.",
    client: "Kangra Chai Co.",
    category: "Packaging",
    year: 2026,
    summary:
      "Pouches and tins for a small tea maker in Palampur. Every estate gets its own colour pair, everything prints in two inks on kraft, and the plucking date is stamped by hand at the factory because that's how they already did it.",
    palette: { bg: "#ffd23f", fg: "#1b1b1b", accent: "#3a86ff" },
    motif: "mockup",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "yamuna-review",
    title: "The Yamuna Review, Issue 07",
    client: "The Yamuna Review",
    category: "Editorial",
    year: 2025,
    summary:
      "We've laid out this Delhi literary quarterly since issue 04. For issue 07 we rebuilt the grid so English and Urdu can sit side by side without one looking like a translation of the other.",
    palette: { bg: "#f4f1ea", fg: "#141414", accent: "#e63946" },
    motif: "type",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "raah-mobility",
    title: "Raah Scooter App",
    client: "Raah",
    category: "Digital",
    year: 2025,
    summary:
      "An app for renting electric scooters by the hour in South Delhi. Most riders open it standing on the pavement in the sun, so we designed for one thumb, bright light and patchy 4G.",
    palette: { bg: "#0f1b2d", fg: "#e8f1ff", accent: "#5ef38c" },
    motif: "grid",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "monsoon-sound",
    title: "Monsoon Sound Festival 2025",
    client: "Monsoon Sound",
    category: "Campaign",
    year: 2025,
    summary:
      "Posters, stage screens and Instagram for a three-day festival in Delhi, in the middle of the rains. The lineup changed four times before the gates opened, so we built templates the festival team could update themselves.",
    palette: { bg: "#ff6b35", fg: "#fff4e6", accent: "#2a1a5e" },
    motif: "poster",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "pahadi-trails",
    title: "Pahadi Trails",
    client: "Pahadi Trails",
    category: "Branding",
    year: 2025,
    summary:
      "Identity for a trekking company in Uttarakhand. The colours come from the paint on trail markers, and the logo still reads when it's stitched small on a cap or covered in mud on a duffel bag.",
    palette: { bg: "#d7e3d4", fg: "#14281d", accent: "#f25c05" },
    motif: "arches",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "sikka-finance",
    title: "Sikka Finance",
    client: "Sikka",
    category: "Digital",
    year: 2024,
    summary:
      "Brand and website for a savings app aimed at first-time earners. We kept the jargon out, used one strong blue, and made the illustrations out of coins because that's what the product is about.",
    palette: { bg: "#1d3bff", fg: "#ffffff", accent: "#ffcf3f" },
    motif: "poster",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "sutra-ayurveda",
    title: "Sutra Ayurveda",
    client: "Sutra Ayurveda",
    category: "Packaging",
    year: 2024,
    summary:
      "Packaging for a Rishikesh family business moving from local chemists to online. Type only, no leaves or lotus flowers, with the Hindi name given as much room as the English one.",
    palette: { bg: "#f6e1e1", fg: "#3d2c2e", accent: "#b5838d" },
    motif: "mockup",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "khet-magazine",
    title: "Khet Magazine",
    client: "Khet",
    category: "Editorial",
    year: 2024,
    summary:
      "A redesign for a Hindi and English magazine about farming and food. Bigger type, since many readers are over fifty, and a cover colour that changes with the crop season.",
    palette: { bg: "#c9b27c", fg: "#1f1a10", accent: "#6b4226" },
    motif: "stripes",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "nabz-health",
    title: "Nabz Health",
    client: "Nabz",
    category: "Digital",
    year: 2023,
    summary:
      "A patient app and a doctor dashboard for a chain of clinics in Gurugram. The hardest part was the reports screen: lab results that a sixty-year-old can actually read on a phone.",
    palette: { bg: "#e8f4f2", fg: "#0d2b2a", accent: "#ff5d73" },
    motif: "grid",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "ghar-architects",
    title: "Ghar Architects",
    client: "Ghar Architects",
    category: "Branding",
    year: 2023,
    summary:
      "Identity, website and a small monograph for a Delhi practice that builds low-cost housing. The grid is taken from their own plans, drawn at 1:50.",
    palette: { bg: "#d9d9d6", fg: "#111111", accent: "#9c2c2c" },
    motif: "arches",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "lal-bazaar-diwali",
    title: "Lal Bazaar Diwali 2023",
    client: "Lal Bazaar",
    category: "Campaign",
    year: 2023,
    summary:
      "The Diwali campaign for a department store in Connaught Place: shop windows, newspaper ads, hoardings and a gift guide. We avoided the usual gold-and-diya look and went with night-sky colours instead.",
    palette: { bg: "#120d2b", fg: "#f1eaff", accent: "#7cf5c8" },
    motif: "stripes",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "kinnaur-cider",
    title: "Kinnaur Cider Co.",
    client: "Kinnaur Cider Co.",
    category: "Packaging",
    year: 2022,
    summary:
      "Labels for a small-batch apple cider maker in Kalpa. Letterpress on cotton paper, numbered by hand, and a wordmark adapted from the painted signboard on their family orchard.",
    palette: { bg: "#2c1f17", fg: "#f2e6d0", accent: "#d4a24c" },
    motif: "letter",
    ratios: ["tall", "landscape", "square"],
  },
  {
    slug: "apna-ghar-book",
    title: "Apna Ghar, Ten Years",
    client: "Apna Ghar Trust",
    category: "Editorial",
    year: 2022,
    summary:
      "A book for a Delhi housing trust's tenth year. Interviews with the families who live in the homes, printed in Hindi, Urdu and English, next to photographs from the trust's archive.",
    palette: { bg: "#eae6df", fg: "#202020", accent: "#2f6f4f" },
    motif: "type",
    ratios: ["tall", "landscape", "square"],
  },
];

export function getShots(project: Project): Shot[] {
  return project.ratios.map((ratio, i) => ({
    src: `/work/${project.slug}/${String(i + 1).padStart(2, "0")}.jpg`,
    ...ratioSize[ratio],
    alt: `${project.title}, image ${i + 1}`,
  }));
}

export function getProject(slug: string | null | undefined) {
  return projects.find((p) => p.slug === slug);
}

export function getCover(project: Project): Shot {
  return getShots(project)[0];
}
