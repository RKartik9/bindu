export const services = [
  {
    title: "Identity",
    description:
      "Logo, typefaces, colours, stationery and a short guide your team can use without calling us. Sometimes a name, if you don't have one yet.",
    deliverables: ["Logo and wordmark", "Type and colour", "Stationery", "Brand guide"],
    timeline: "Usually 8 to 12 weeks",
    image: "/work/mitti-ceramics/01.jpg",
  },
  {
    title: "Packaging",
    description:
      "From one label to a full range. We work with your printer from the first round, so the files that reach the press are the ones that will actually print well.",
    deliverables: ["Labels and boxes", "Range system", "Printer handover", "Press checks"],
    timeline: "Usually 6 to 10 weeks",
    image: "/work/kangra-chai/01.jpg",
  },
  {
    title: "Books and magazines",
    description:
      "Layout, covers and print production for magazines, books and reports. Comfortable in more than one language and script on the same page.",
    deliverables: ["Grid and type system", "Covers", "Layout", "Print production"],
    timeline: "Depends on page count",
    image: "/work/yamuna-review/01.jpg",
  },
  {
    title: "Websites and apps",
    description:
      "Marketing sites and product design. We design in the browser where we can, and work with your developers or with the two we trust.",
    deliverables: ["UX and UI", "Design systems", "Prototypes", "Marketing sites"],
    timeline: "Usually 6 to 14 weeks",
    image: "/work/raah-mobility/02.jpg",
  },
  {
    title: "Campaigns",
    description:
      "Launches, festivals and seasonal campaigns: posters, hoardings, social and short motion. One idea, worked out for every size it has to run at.",
    deliverables: ["Key visual", "Posters and OOH", "Social templates", "Motion"],
    timeline: "Usually 4 to 8 weeks",
    image: "/work/monsoon-sound/01.jpg",
  },
] as const;

export const process = [
  {
    title: "A call",
    text: "Tell us what you need and by when. If we're not the right studio for it, we'll say so and try to suggest someone who is.",
  },
  {
    title: "A proposal",
    text: "A short document with what we'll make, what it costs and how long it takes. We start once half the fee is in.",
  },
  {
    title: "The work",
    text: "We share progress every week on a call, rather than disappearing for a month and coming back with a big reveal.",
  },
  {
    title: "Handover",
    text: "Final files, a guide, and a month of small fixes included. Most clients come back for the next thing.",
  },
] as const;

export const clients = [
  "Mitti Ceramics",
  "Kangra Chai Co.",
  "The Yamuna Review",
  "Raah",
  "Monsoon Sound",
  "Pahadi Trails",
  "Sikka",
  "Sutra Ayurveda",
  "Khet",
  "Nabz",
  "Ghar Architects",
  "Lal Bazaar",
  "Kinnaur Cider Co.",
  "Apna Ghar Trust",
] as const;

export const stats = [
  { value: "2019", label: "Started" },
  { value: "7", label: "People" },
  { value: "70+", label: "Projects" },
  { value: "1", label: "Room" },
] as const;

export const values = [
  {
    title: "You talk to the designers",
    text: "There's no account manager in between. Dhruti runs the project, and the person designing your work is on every call.",
  },
  {
    title: "We take on a few projects at a time",
    text: "Four or five at most, so nothing gets handed to whoever happens to be free that week.",
  },
  {
    title: "Files you can actually use",
    text: "Clear names, a short guide, and templates in the tools your team already uses. We'd rather you didn't need us for small changes.",
  },
] as const;

export const studioPhotos = [
  { src: "/studio/01.jpg", width: 1024, height: 768, alt: "The studio room in Shahpur Jat, with two long worktables and a wall of pinned prints" },
  { src: "/studio/03.jpg", width: 768, height: 1024, alt: "Pinboard with type tests, colour swatches and sketches" },
  { src: "/studio/02.jpg", width: 1024, height: 768, alt: "Three designers reviewing printed proofs at the big table" },
  { src: "/studio/05.jpg", width: 768, height: 1024, alt: "Sorting paper samples for a book cover" },
  { src: "/studio/04.jpg", width: 1024, height: 768, alt: "A desk with a swatch fan, logo sketches and a glass of chai" },
] as const;

export const team = [
  { name: "Kartik", role: "Founder, design", photo: "/team/01.jpg" },
  { name: "Tushar Gaurav", role: "Senior designer", photo: "/team/02.jpg" },
  { name: "Dhruti Nayak", role: "Studio lead, projects and clients", photo: "/team/03.jpg" },
  { name: "Gourav Mandal", role: "Designer, digital", photo: "/team/04.jpg" },
  { name: "Ishita Malhotra", role: "Designer, print and type", photo: "/team/05.jpg" },
  { name: "Aman Bhatia", role: "Motion and illustration", photo: "/team/06.jpg" },
  { name: "Simran Kaur", role: "Junior designer", photo: "/team/07.jpg" },
] as const;
