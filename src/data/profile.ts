// Section ids, in scroll order — drives both the nav dial and the
// active-section scroll spy.
export const SECTION_IDS = ["home", "work", "contact"];

export const NAV_ITEMS = [
  { id: "home", label: "00 · HOME" },
  { id: "work", label: "01 · WORK" },
  { id: "contact", label: "02 · CONTACT" },
];

export const profile = {
  name: "Neilbert Payusan",
  role: "Software Engineer",
  email: "neil.payusan56@gmail.com",
  github: "https://github.com/L1en-git",
  location: "Minglanilla, Cebu, PH",
  focus: "C# · SQL Server · Angular",
};

export const titleBlockRows = [
  { label: "Based in", value: profile.location },
  { label: "Role", value: profile.role },
  { label: "Focus", value: profile.focus },
];

// The "About" section's three reveal-on-scroll lines, in order.
export const aboutRevealLines = [
  "I read a spec the way a drafter reads a blueprint —",
  "every measurement questioned, every joint tested,",
  "before a single line gets built.",
];

// The "About" section's spec columns, in order.
export const aboutSpecs = [
  { label: "01 — LANGUAGES", value: "C#" },
  { label: "02 — TOOLING", value: "Microsoft SQL Server (MSSQL), Angular" },
  { label: "03 — EDUCATION", value: "BS Computer Engineering, Magna Cum Laude" },
];
