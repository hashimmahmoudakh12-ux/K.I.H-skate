export const BRAND = {
  name: "K.I.H.",
  full: "K.I.H. Skateboarding",
  tagline: "Skateboarding, taught right.",
  phone: "(555) 018-2947",
  email: "hello@kihskate.com",
  address: "Riverside Skate Park — Bay Area, CA",
};

export const INSTRUCTORS = [
  {
    name: "Khyree",
    role: "Co-Founder & Coach",
    bio: "Sets the pace on progression — the one who breaks tricks down into steps that actually click for beginners.",
    initials: "K",
  },
  {
    name: "Ismael",
    role: "Co-Founder & Coach",
    bio: "Runs the safety side of every session — spotter drills, gear checks, and the calm that keeps first-timers confident.",
    initials: "I",
  },
  {
    name: "Hashim",
    role: "Co-Founder & Coach",
    bio: "Brings the energy — camp games, challenges, and the hype that keeps kids coming back every week.",
    initials: "H",
  },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Lessons", href: "#lessons" },
  { label: "Camps", href: "#camps" },
  { label: "About", href: "#about" },
  { label: "Coaches", href: "#instructors" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const WHY_US = [
  {
    icon: "medal",
    title: "Experienced Coach",
    body: "Ten years on boards, thousands of first ollies witnessed. Every drill is battle-tested, not improvised.",
  },
  {
    icon: "shield",
    title: "Safe Environment",
    body: "Padded zones, spotter drills, and a ratio that keeps every rider watched — every single run.",
  },
  {
    icon: "sprout",
    title: "Beginner Friendly",
    body: "No experience, no board, no problem. We start at zero and build real fundamentals from the ground up.",
  },
  {
    icon: "sparkles",
    title: "Fun Learning",
    body: "Games, challenges, and small wins that keep kids coming back — progression that never feels like a lecture.",
  },
  {
    icon: "users",
    title: "Private & Group",
    body: "One-on-one focus or ride with friends. Flexible formats built around how your kid actually learns.",
  },
  {
    icon: "trophy",
    title: "Confidence Building",
    body: "We measure success in courage, not just tricks landed. Kids leave standing taller, on and off the board.",
  },
] as const;

export const LESSONS = [
  {
    name: "Private Lessons",
    price: "$75",
    unit: "per child / session",
    description: "Full attention, zero distractions.",
    features: [
      "1-on-1 coaching",
      "Personalized progression plan",
      "Flexible scheduling",
      "Gear guidance included",
    ],
    featured: false,
    cta: "Book a Private Lesson",
  },
  {
    name: "Small Groups",
    price: "Custom",
    unit: "pricing / group",
    description: "Friends learn together, faster.",
    features: [
      "2–4 riders per coach",
      "Great for families & friends",
      "Friendly peer motivation",
      "Shared progression tracking",
    ],
    featured: true,
    cta: "Get a Group Quote",
  },
  {
    name: "Skate Camps",
    price: "Seasonal",
    unit: "multi-day programs",
    description: "A full week of leveling up.",
    features: [
      "Seasonal skate camps",
      "Structured skill progression",
      "Games & challenges daily",
      "End-of-camp showcase",
    ],
    featured: false,
    cta: "Reserve a Camp Spot",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Marissa Ford",
    role: "Parent of Ellie, age 9",
    quote:
      "Ellie went from scared to stand on a board to dropping into the mini ramp in six weeks. The coaching style is patient, structured, and genuinely fun — she asks to go every single week.",
  },
  {
    name: "Daniel Cho",
    role: "Parent of Theo, age 11",
    quote:
      "What sold me was the safety-first approach without ever killing the excitement. Theo's confidence off the board has changed as much as his skating has.",
  },
  {
    name: "Priya Nair",
    role: "Parent of Aiden & Zoe",
    quote:
      "We booked small group lessons for both kids and it's been the highlight of their week all summer. Real progression, not just supervised playtime.",
  },
  {
    name: "Sam Whitfield",
    role: "Parent of Jonah, age 7",
    quote:
      "Jonah landed his first ollie in lesson four and hasn't stopped talking about it since. Worth every cent — this is coaching, not babysitting.",
  },
] as const;

export const FAQS = [
  {
    q: "What age can kids start?",
    a: "We coach riders from age 5 and up. Younger kids start with balance and board-feel fundamentals before progressing to rolling and stopping — every plan is built around the individual, not a fixed age chart.",
  },
  {
    q: "Do I need a skateboard?",
    a: "Nope — we provide demo boards for every lesson so you can try before you buy. If your child already has a board, bring it along and we'll check it's set up safely.",
  },
  {
    q: "What safety gear is required?",
    a: "A certified helmet is mandatory for every session. Wrist guards, knee pads, and elbow pads are strongly recommended and available to borrow if you don't have your own.",
  },
  {
    q: "How long are lessons?",
    a: "Private and small group lessons run 45 minutes — long enough to build real skill, short enough to keep focus high. Camp days run longer with built-in breaks.",
  },
  {
    q: "Where are lessons held?",
    a: "All lessons take place at Riverside Skate Park, a smooth, well-maintained park with a dedicated beginner zone away from advanced traffic.",
  },
] as const;

export const EXPERIENCE_LEVELS = [
  "Complete Beginner",
  "Some Experience",
  "Intermediate",
  "Advanced",
] as const;

export const SOCIALS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "TikTok", href: "#", icon: "tiktok" },
  { label: "YouTube", href: "#", icon: "youtube" },
] as const;
