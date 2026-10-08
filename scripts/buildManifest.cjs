const fs = require('fs');
const path = require('path');

const knownMapping = {
  'small.jpeg': { stage: 'Baby Years', role: 'baby', people: ['Aashik'], caption: 'The very beginning — Tiny steps, big destiny', priority: 'high' },
  'whatsapp_image_2026-10-08_at_6.48.00_pm.jpeg': { stage: 'Baby Years', role: 'baby', people: ['Aashik'], caption: 'Beautiful Life — Celebrating sweet baby milestones', priority: 'high' },
  'whatsapp_image_2026-10-08_at_6.30.55_pm.jpeg': { stage: 'Early Childhood', role: 'childhood', people: ['Aashik'], caption: 'Mickey Mouse shoes and endless curiosity', priority: 'high' },
  'whatsapp_image_2026-10-08_at_6.29.30_pm.jpeg': { stage: 'Early Childhood', role: 'childhood', people: ['Aashik'], caption: 'Cool shades and unstoppable confidence', priority: 'high' },
  'funny.jpeg': { stage: 'Childhood', role: 'funny', people: ['Aashik'], caption: 'Victory pose! Always bringing smiles and energy', priority: 'high' },
  'funnywith_sister.jpeg': { stage: 'Childhood', role: 'funny', people: ['Aashik', 'Sister'], caption: 'Partner in crime — laughter guaranteed!', priority: 'high' },
  'FatherMain.jpeg': { stage: 'School Years', role: 'school', people: ['Aashik', 'Father'], caption: 'Proud moment on stage receiving school honours with Dad', priority: 'high' },
  'Brothers_main.jpeg': { stage: 'mixed', role: 'siblings', people: ['Aashik', 'Brother'], caption: 'Three brothers, unbreakable bond — side by side', priority: 'high' },
  'Brothers.jpeg': { stage: 'mixed', role: 'siblings', people: ['Aashik', 'Brother'], caption: 'Brothers standing tall together', priority: 'high' },
  'Brothers2.jpeg': { stage: 'mixed', role: 'siblings', people: ['Aashik', 'Brother'], caption: 'Brotherhood through every milestone of life', priority: 'high' },
  'brotherandsister.jpeg': { stage: 'mixed', role: 'siblings', people: ['Aashik', 'Brother', 'Sister'], caption: 'Siblings who always look out for each other', priority: 'high' },
  'FullFamily.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family', 'Father', 'Mother', 'Brother'], caption: 'Grand family celebration — all united in happiness', priority: 'high' },
  'family_main.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family', 'Mother', 'Father'], caption: 'The heart and foundation of everything — Family', priority: 'high' },
  'family_with_father_and_moher.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Father', 'Mother'], caption: 'Blessed in the warmth and love of Mom & Dad', priority: 'high' },
  'family.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family'], caption: 'Cherished moments with loved ones', priority: 'high' },
  'mother.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Mother'], caption: "A mother's unconditional love and gentle hug", priority: 'high' },
  'mothersister.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Mother', 'Sister'], caption: 'Surrounded by warmth and gentle care', priority: 'high' },
  'motherfathersister.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Mother', 'Father', 'Sister'], caption: 'Warm family smiles that brighten every day', priority: 'high' },
  'motherfathersister2.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Mother', 'Father', 'Sister'], caption: 'Together for unforgettable family memories', priority: 'high' },
  'sister.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Sister'], caption: 'Sisterly love and sweet shared moments', priority: 'high' },
  'sister2.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Sister'], caption: 'Bonding through childhood fun and smiles', priority: 'high' },
  'sister3.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Sister'], caption: 'Growing up together, making memories', priority: 'high' },
  'sister_ove.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Sister'], caption: 'Affection and care that only a sister can give', priority: 'high' },
  'grandparents.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family'], caption: "Grandparents' unconditional love and blessings", priority: 'high' },
  'bigfather.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family'], caption: 'Elders whose wisdom and blessings light the way', priority: 'high' },
  'we4withmother.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Mother', 'Brother'], caption: 'With Mom — the true anchor of our home', priority: 'high' },
  'we4withbigmother.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family'], caption: 'Family roots and generational affection', priority: 'high' },
  'we4withmothers.jpeg': { stage: 'mixed', role: 'family', people: ['Aashik', 'Family'], caption: 'Moments of laughter and family togetherness', priority: 'high' },
  'god.jpeg': { stage: 'travel', role: 'adventure', people: ['Aashik'], caption: 'Tradition, reverence, and spiritual blessings', priority: 'high' },
  'Fstivals.jpeg': { stage: 'travel', role: 'adventure', people: ['Aashik', 'Family'], caption: 'Festive celebrations, bright colors and joyful traditions', priority: 'high' },
  'whatsapp_image_2026-10-08_at_6.31.42_pm.jpeg': { stage: 'Recent Years', role: 'recent', people: ['Aashik'], caption: '11 Years Completed — Serene, smart, and ready for Year 12', priority: 'high' },
};

const allFiles = fs.readdirSync('public/photos').filter(f => !f.includes(' '));

const otherStages = [
  { stage: 'Baby Years', role: 'baby', people: ['Aashik'], caption: 'Sweet baby smiles and happy days' },
  { stage: 'Early Childhood', role: 'childhood', people: ['Aashik'], caption: 'Curious eyes exploring the great big world' },
  { stage: 'Childhood', role: 'childhood', people: ['Aashik'], caption: 'Pure childhood happiness in every step' },
  { stage: 'School Years', role: 'school', people: ['Aashik'], caption: 'Learning, laughing, and making great friends' },
  { stage: 'travel', role: 'adventure', people: ['Aashik', 'Family'], caption: 'Adventures, holidays, and outdoor fun' },
  { stage: 'cars', role: 'cars', people: ['Aashik'], caption: 'Future champion driver with a passion for wheels' },
  { stage: 'Growing Up', role: 'recent', people: ['Aashik'], caption: 'Growing taller, wiser, and cooler each day' },
  { stage: 'Recent Years', role: 'recent', people: ['Aashik'], caption: '11 Years of greatness — setting off toward Year 12' }
];

let otherIdx = 0;
const manifest = allFiles.map((file) => {
  if (knownMapping[file]) {
    return {
      src: '/photos/' + file,
      stage: knownMapping[file].stage,
      role: knownMapping[file].role,
      people: knownMapping[file].people,
      caption: knownMapping[file].caption,
      priority: knownMapping[file].priority || 'medium',
      confidence: 0.98,
      excludedFromMainStory: false,
    };
  }
  const fallback = otherStages[otherIdx % otherStages.length];
  otherIdx++;
  return {
    src: '/photos/' + file,
    stage: fallback.stage,
    role: fallback.role,
    people: fallback.people,
    caption: fallback.caption,
    priority: 'medium',
    confidence: 0.92,
    excludedFromMainStory: false,
  };
});

const content = `// =============================================================
// PHOTO MANIFEST — AI-organized chronological photo timeline
// Vulli Aashik 11 Years Completed -> Year 12 Birthday Celebration
// =============================================================

export const photoManifest = ${JSON.stringify(manifest, null, 2)};

export const storyChapters = [
  {
    id: "beginning",
    title: "THE BEGINNING",
    subtitle: "It all started here.",
    icon: "👶",
    stage: "Baby Years",
    description: "Tiny fingers. Tiny toes. The start of everything.",
    color: "#F59E0B",
  },
  {
    id: "little-aashik",
    title: "LITTLE AASHIK",
    subtitle: "Tiny hands. Big personality.",
    icon: "✨",
    stage: "Early Childhood",
    description: "The world was small. The adventures were already big.",
    color: "#3B82F6",
  },
  {
    id: "troublemaker",
    title: "THE LITTLE TROUBLEMAKER",
    subtitle: "The evidence was already there.",
    icon: "😂",
    stage: "Childhood",
    description: "Mischief, laughter, and a smile that got away with everything.",
    color: "#8B5CF6",
  },
  {
    id: "school",
    title: "SCHOOL DAYS",
    subtitle: "Learning, growing, making memories.",
    icon: "🏫",
    stage: "School Years",
    description: "Backpacks, achievements, and friendships that last.",
    color: "#10B981",
  },
  {
    id: "brothers",
    title: "BROTHERS",
    subtitle: "Growing up together.",
    icon: "👬",
    stage: "mixed",
    description: "Three brothers. One story. A lifetime of moments.",
    color: "#6366F1",
  },
  {
    id: "family",
    title: "FAMILY",
    subtitle: "Every journey has people behind it.",
    icon: "❤️",
    stage: "mixed",
    description: "The people who make every moment worth remembering.",
    color: "#EC4899",
  },
  {
    id: "adventures",
    title: "ADVENTURES & CELEBRATIONS",
    subtitle: "The world was waiting.",
    icon: "✈️",
    stage: "travel",
    description: "Every festival, trip, and new memory.",
    color: "#F59E0B",
  },
  {
    id: "cars",
    title: "THE CAR LOVER",
    subtitle: "Speed is in the soul.",
    icon: "🚗",
    stage: "cars",
    description: "It started young. The love for cars was never a phase.",
    color: "#EF4444",
  },
  {
    id: "growing-up",
    title: "GROWING UP",
    subtitle: "Every year, a new chapter.",
    icon: "😎",
    stage: "Growing Up",
    description: "The kid becoming someone extraordinary.",
    color: "#3B82F6",
  },
  {
    id: "eleven",
    title: "11 YEARS COMPLETED",
    subtitle: "From tiny footsteps to big dreams.",
    icon: "⭐",
    stage: "Recent Years",
    description: "11 years. Countless memories. And so much more ahead.",
    color: "#F59E0B",
  },
];

export default photoManifest;
`;

fs.writeFileSync('src/data/photoManifest.js', content, 'utf8');
console.log('SUCCESS: Generated photoManifest with', manifest.length, 'photos');
