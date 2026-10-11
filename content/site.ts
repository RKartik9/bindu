export const site = {
  name: "Bindu",
  url: "https://bindu.studio",
  copyrightYear: 2026,
  description:
    "Bindu is a seven-person design studio in New Delhi, started by Kartik. Identity, packaging, print and websites, mostly for independent Indian brands.",
  email: "hello@bindu.studio",
  phone: "+91 98110 42719",
  bio: [
    "Hi, I'm Kartik. I started Bindu in 2019, and we work out of one room in Shahpur Jat, New Delhi. A bindu is the first dot you put down before you draw anything.",
    "We design identities, packaging, books and websites, mostly for independent Indian brands: a tea maker in Kangra, a potter in Uttam Nagar, a farming magazine, a couple of architects. Most of our clients found us through someone we'd already worked with.",
    "Dhruti keeps the projects and clients on track, I look after the design. There are seven of us, everyone designs, and the people you meet on the first call are the ones who do the work.",
  ],
  addresses: [
    {
      label: "Studio",
      lines: ["Bindu Design Studio", "Third floor, 21 Shahpur Jat", "New Delhi 110049"],
    },
    {
      label: "Visits",
      lines: ["Monday to Friday, 10 to 7", "Call ahead, the chai is better", "when we know you're coming"],
    },
  ],
  contacts: [
    {
      label: "New projects",
      name: "Kartik",
      email: "kartik@bindu.studio",
    },
    {
      label: "Everything else",
      name: "Dhruti",
      email: "dhruti@bindu.studio",
    },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
  nav: {
    left: [
      { label: "Archive", href: "/work" },
      { label: "Services", href: "/services" },
    ],
    right: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "#contact" },
    ],
  },
} as const;
