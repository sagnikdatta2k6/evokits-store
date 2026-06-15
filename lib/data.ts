/* ============================================
   EVOKITS — Product & Site Data
   ============================================ */

export interface Jersey {
  id: string;
  name: string;
  team: string;
  league: string;
  price: number;
  originalPrice?: number;
  colors: [string, string]; // gradient pair
  badge: string; // emoji
  tag?: "new" | "hot" | "sale" | "limited";
  year: string;
  image?: string;
  gallery?: string[];
  category?: string;
  stock: Record<string, number>;
}

const defaultStock = { S: 10, M: 10, L: 10, XL: 10, XXL: 10 };

const rawJerseys: Omit<Jersey, "stock">[] = [
  {
    id: "barca-home-25",
    name: "Home Kit 2025/26",
    team: "FC Barcelona",
    league: "La Liga",
    price: 1499,
    originalPrice: 2499,
    colors: ["#A50044", "#004D98"],
    badge: "🔵🔴",
    tag: "hot",
    year: "2025/26",
  },
  {
    id: "rma-home-25",
    name: "Home Kit 2025/26",
    team: "Real Madrid",
    league: "La Liga",
    price: 1499,
    colors: ["#FEBE10", "#FFFFFF"],
    badge: "⚪",
    tag: "new",
    year: "2025/26",
  },
  {
    id: "manu-home-25",
    name: "Home Kit 2025/26",
    team: "Manchester United",
    league: "Premier League",
    price: 1599,
    originalPrice: 2299,
    colors: ["#DA291C", "#FBE122"],
    badge: "🔴",
    tag: "sale",
    year: "2025/26",
  },
  {
    id: "mancity-away-25",
    name: "Away Kit 2025/26",
    team: "Manchester City",
    league: "Premier League",
    price: 1599,
    colors: ["#6CABDD", "#1C2C5B"],
    badge: "🩵",
    tag: "new",
    year: "2025/26",
  },
  {
    id: "bayern-home-25",
    name: "Home Kit 2025/26",
    team: "Bayern Munich",
    league: "Bundesliga",
    price: 1399,
    colors: ["#DC052D", "#0066B2"],
    badge: "🔴⚪",
    year: "2025/26",
  },
  {
    id: "psg-home-25",
    name: "Home Kit 2025/26",
    team: "Paris Saint-Germain",
    league: "Ligue 1",
    price: 1499,
    originalPrice: 1999,
    colors: ["#004170", "#DA291C"],
    badge: "🔵🔴",
    tag: "hot",
    year: "2025/26",
  },
  {
    id: "juve-home-25",
    name: "Home Kit 2025/26",
    team: "Juventus",
    league: "Serie A",
    price: 1399,
    colors: ["#000000", "#FFFFFF"],
    badge: "⚫⚪",
    year: "2025/26",
  },
  {
    id: "arsenal-home-25",
    name: "Home Kit 2025/26",
    team: "Arsenal",
    league: "Premier League",
    price: 1599,
    colors: ["#EF0107", "#FFFFFF"],
    badge: "🔴⚪",
    tag: "limited",
    year: "2025/26",
  },
  {
    id: "liverpool-home-25",
    name: "Home Kit 2025/26",
    team: "Liverpool FC",
    league: "Premier League",
    price: 1499,
    originalPrice: 2199,
    colors: ["#C8102E", "#00B2A9"],
    badge: "🔴",
    tag: "sale",
    year: "2025/26",
  },
  {
    id: "inter-home-25",
    name: "Home Kit 2025/26",
    team: "Inter Milan",
    league: "Serie A",
    price: 1399,
    colors: ["#010E80", "#000000"],
    badge: "🔵⚫",
    tag: "new",
    year: "2025/26",
  },
  {
    id: "chelsea-away-25",
    name: "Away Kit 2025/26",
    team: "Chelsea FC",
    league: "Premier League",
    price: 1499,
    colors: ["#034694", "#DBA111"],
    badge: "🔵",
    year: "2025/26",
  },
  {
    id: "dortmund-home-25",
    name: "Home Kit 2025/26",
    team: "Borussia Dortmund",
    league: "Bundesliga",
    price: 1299,
    colors: ["#FDE100", "#000000"],
    badge: "🟡⚫",
    tag: "hot",
    year: "2025/26",
  },
];

export const jerseys: Jersey[] = rawJerseys.map(j => ({
  ...j,
  stock: { ...defaultStock }
}));

export const featuredJerseys = jerseys.slice(0, 6);

export interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const features: Feature[] = [
  {
    icon: "🏆",
    title: "100% Authentic",
    description:
      "Every jersey is sourced with care to guarantee authenticity. What you see is what you get — real kits for real fans.",
    color: "var(--neo-lime)",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description:
      "Premium quality doesn't have to break the bank. We offer the most competitive prices without cutting corners on quality.",
    color: "var(--neo-yellow)",
  },
  {
    icon: "🌍",
    title: "Global Collection",
    description:
      "From La Liga to the Premier League, Serie A to Bundesliga — we stock jerseys from clubs across the globe.",
    color: "var(--neo-blue)",
  },
  {
    icon: "📦",
    title: "Fast Delivery",
    description:
      "Quick and reliable shipping across India. Track your order every step of the way until it reaches your doorstep.",
    color: "var(--neo-pink)",
  },
];

export interface Founder {
  name: string;
  role: string;
  bio: string;
  emoji: string;
  color: string;
}

export const founders: Founder[] = [
  {
    name: "Arnesh Jana",
    role: "Co-Founder",
    bio: "A die-hard football enthusiast with an eye for quality and a vision to make authentic jerseys accessible to every fan. Arnesh leads the sourcing and quality assurance at EVOKITS.",
    emoji: "⚡",
    color: "var(--neo-lime)",
  },
  {
    name: "Samanway Roy",
    role: "Co-Founder",
    bio: "Driven by passion for football and entrepreneurship, Samanway handles operations and customer experience, ensuring every EVOKITS customer feels like part of the team.",
    emoji: "🎯",
    color: "var(--neo-pink)",
  },
];

export const marqueeTeams = [
  "Barcelona",
  "Real Madrid",
  "Man United",
  "Man City",
  "Bayern Munich",
  "PSG",
  "Juventus",
  "Arsenal",
  "Liverpool",
  "Chelsea",
  "Dortmund",
  "Inter Milan",
  "AC Milan",
  "Atletico Madrid",
  "Tottenham",
  "Napoli",
];
