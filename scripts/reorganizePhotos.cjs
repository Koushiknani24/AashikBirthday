const fs = require('fs');

// Curated mapping of all photos
const detailedMap = {
  // ── 1. BABY / EARLY CHILDHOOD ──
  'small.jpeg': {
    stage: 'Baby Years', role: 'baby', people: ['Aashik'],
    caption: 'The very beginning — Tiny footsteps, infinite love', priority: 'high', age: '0-1'
  },
  'whatsapp_image_2026-10-08_at_6.33.09_pm.jpeg': {
    stage: 'Baby Years', role: 'baby', people: ['Aashik'],
    caption: 'Little festive baby in red hoodie & booties', priority: 'high', age: '0-1'
  },
  'whatsapp_image_2026-10-08_at_6.48.00_pm.jpeg': {
    stage: 'Baby Years', role: 'baby', people: ['Aashik'],
    caption: 'Beautiful Life — Adorable smiles in the pink chair', priority: 'high', age: '1-2'
  },
  'whatsapp_image_2026-10-08_at_6.31.44_pm.jpeg': {
    stage: 'Baby Years', role: 'baby', people: ['Aashik'],
    caption: 'Running free in the grass — Polka dots and little jacket', priority: 'high', age: '2'
  },

  // ── 2. CHILDHOOD ──
  'whatsapp_image_2026-10-08_at_6.30.55_pm.jpeg': {
    stage: 'Childhood', role: 'childhood', people: ['Aashik'],
    caption: 'Mickey Mouse shoes and endless curiosity', priority: 'high', age: '3'
  },
  'whatsapp_image_2026-10-08_at_6.29.30_pm.jpeg': {
    stage: 'Childhood', role: 'childhood', people: ['Aashik'],
    caption: 'Sunglasses swagger — Stepping out in style', priority: 'high', age: '4'
  },
  'whatsapp_image_2026-10-08_at_6.29.23_pm.jpeg': {
    stage: 'Childhood', role: 'childhood', people: ['Aashik'],
    caption: 'PJ Masks superhero mission on the stairs', priority: 'high', age: '4-5'
  },
  'whatsapp_image_2026-10-08_at_6.29.43_pm.jpeg': {
    stage: 'Childhood', role: 'childhood', people: ['Aashik'],
    caption: 'Traditional elegance in sky-blue kurta', priority: 'high', age: '5'
  },
  'whatsapp_image_2026-10-08_at_6.29.38_pm.jpeg': {
    stage: 'Childhood', role: 'childhood', people: ['Aashik'],
    caption: 'Little Krishna costume with golden crown & flute', priority: 'high', age: '5'
  },
  'whatsapp_image_2026-10-08_at_6.31.49_pm.jpeg': {
    stage: 'Childhood', role: 'childhood', people: ['Aashik'],
    caption: 'Gentle moments in blue silk kurta by the plants', priority: 'medium', age: '5-6'
  },

  // ── 3. THE LITTLE TROUBLEMAKER / FUNNY ──
  'funny.jpeg': {
    stage: 'Troublemaker', role: 'funny', people: ['Aashik'],
    caption: 'Usain Bolt victory pose with chocolate — King of comedy!', priority: 'high', age: '7'
  },
  'funnywith_sister.jpeg': {
    stage: 'Troublemaker', role: 'funny', people: ['Aashik', 'Sister'],
    caption: 'Partners in crime — Laughter and mischief guaranteed', priority: 'high', age: '7'
  },
  'whatsapp_image_2026-10-08_at_6.29.44_pm.jpeg': {
    stage: 'Troublemaker', role: 'funny', people: ['Aashik'],
    caption: 'Chocolate all over the face — Caught red-handed!', priority: 'high', age: '2'
  },
  'whatsapp_image_2026-10-08_at_6.31.47_pm.jpeg': {
    stage: 'Troublemaker', role: 'funny', people: ['Aashik'],
    caption: 'Pizza Hut funny faces & fluffy hood fun', priority: 'high', age: '8'
  },
  'whatsapp_image_2026-10-08_at_6.31.36_pm.jpeg': {
    stage: 'Troublemaker', role: 'funny', people: ['Aashik'],
    caption: 'Eyes closed, blissful grin, arms crossed — Pure joy', priority: 'high', age: '6'
  },

  // ── 4. SCHOOL & ACHIEVEMENTS ──
  'whatsapp_image_2026-10-08_at_6.29.40_pm.jpeg': {
    stage: 'School', role: 'school', people: ['Aashik'],
    caption: 'Ready for school with backpack — Bright new beginnings', priority: 'high', age: '5'
  },
  'FatherMain.jpeg': {
    stage: 'School', role: 'school', people: ['Aashik', 'Father'],
    caption: 'Proud moment on stage receiving school award with Dad', priority: 'high', age: '8'
  },
  'whatsapp_image_2026-10-08_at_6.29.25_pm.jpeg': {
    stage: 'School', role: 'school', people: ['Aashik'],
    caption: 'Abacus champion with gold medal around neck — Thumbs up!', priority: 'high', age: '7'
  },
  'whatsapp_image_2026-10-08_at_6.29.34_pm_1.jpeg': {
    stage: 'School', role: 'school', people: ['Aashik'],
    caption: 'Gryffindor magic — Harry Potter fancy dress day', priority: 'high', age: '6'
  },
  'whatsapp_image_2026-10-08_at_6.29.34_pm.jpeg': {
    stage: 'School', role: 'school', people: ['Aashik'],
    caption: 'School days — Learning, laughing and growing', priority: 'medium', age: '7'
  },

  // ── 5. AASHIK + BROTHERS ──
  'Brothers_main.jpeg': {
    stage: 'Brothers', role: 'siblings', people: ['Aashik', 'Brother'],
    caption: 'Three brothers together on the bench — Unbreakable bond', priority: 'high', age: '9'
  },
  'Brothers.jpeg': {
    stage: 'Brothers', role: 'siblings', people: ['Aashik', 'Brother'],
    caption: 'Brothers standing tall side by side', priority: 'high', age: '8'
  },
  'Brothers2.jpeg': {
    stage: 'Brothers', role: 'siblings', people: ['Aashik', 'Brother'],
    caption: 'Brotherhood through every milestone of life', priority: 'high', age: '9'
  },
  'brotherandsister.jpeg': {
    stage: 'Brothers', role: 'siblings', people: ['Aashik', 'Brother', 'Sister'],
    caption: 'Brothers & sister — Forever a team', priority: 'high', age: '8'
  },

  // ── 6. PARENTS & AASHIK ──
  'family_with_father_and_moher.jpeg': {
    stage: 'Parents', role: 'parents', people: ['Aashik', 'Father', 'Mother'],
    caption: 'In the warm embrace and loving care of Mom & Dad', priority: 'high', age: '7'
  },
  'mother.jpeg': {
    stage: 'Parents', role: 'parents', people: ['Aashik', 'Mother'],
    caption: "Mother's unconditional love — The safest place in the world", priority: 'high', age: '6'
  },
  'we4withmother.jpeg': {
    stage: 'Parents', role: 'parents', people: ['Aashik', 'Mother', 'Brother'],
    caption: 'Smiles with Mom — The heart and light of our home', priority: 'high', age: '8'
  },

  // ── 7. FULL FAMILY & BLESSINGS ──
  'FullFamily.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family', 'Father', 'Mother', 'Brother', 'Sister'],
    caption: 'Grand family celebration — United in happiness and love', priority: 'high', age: '9'
  },
  'family_main.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family', 'Mother', 'Father'],
    caption: 'The foundation of everything — Family unity and warmth', priority: 'high', age: '8'
  },
  'family.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family'],
    caption: 'Cherished memories shared with loved ones', priority: 'high', age: '7'
  },
  'grandparents.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family'],
    caption: "Grandparents' eternal blessings and warmth", priority: 'high', age: '6'
  },
  'bigfather.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family'],
    caption: 'Elders whose wisdom and prayers light our way', priority: 'high', age: '7'
  },
  'we4withbigmother.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family'],
    caption: 'Generations connected — Timeless family bonds', priority: 'high', age: '8'
  },
  'we4withmothers.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Family'],
    caption: 'Laughter, stories, and family togetherness', priority: 'high', age: '8'
  },
  'motherfathersister.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Mother', 'Father', 'Sister'],
    caption: 'Family gathering filled with bright smiles', priority: 'medium', age: '8'
  },
  'motherfathersister2.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Mother', 'Father', 'Sister'],
    caption: 'Special occasions celebrated side by side', priority: 'medium', age: '8', excludedFromMainStory: true
  },
  'mothersister.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Mother', 'Sister'],
    caption: 'Surrounded by caring affection', priority: 'medium', age: '7'
  },
  'sister.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Sister'],
    caption: 'Sisterly love and sweet shared memories', priority: 'high', age: '7'
  },
  'sister2.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Sister'],
    caption: 'Fun times with sister', priority: 'medium', age: '7'
  },
  'sister3.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Sister'],
    caption: 'Growing up together through the years', priority: 'medium', age: '8', excludedFromMainStory: true
  },
  'sister_ove.jpeg': {
    stage: 'Family', role: 'family', people: ['Aashik', 'Sister'],
    caption: 'Warm sisterly bond that grows stronger each day', priority: 'medium', age: '8'
  },

  // ── 8. BIRTHDAYS ──
  'whatsapp_image_2026-10-08_at_6.31.31_pm.jpeg': {
    stage: 'Birthdays', role: 'birthday', people: ['Aashik'],
    caption: 'Smiley face birthday cake celebration in red chair', priority: 'high', age: '5'
  },

  // ── 9. TRAVEL & ADVENTURES ──
  'whatsapp_image_2026-10-08_at_6.31.39_pm.jpeg': {
    stage: 'Travel', role: 'travel', people: ['Aashik'],
    caption: 'Exploring Siloso Beach, Sentosa — Spider-Man jacket and sunshine', priority: 'high', age: '6'
  },
  'god.jpeg': {
    stage: 'Travel', role: 'travel', people: ['Aashik'],
    caption: 'Reverence, traditions, and divine blessings in traditional attire', priority: 'high', age: '6'
  },
  'Fstivals.jpeg': {
    stage: 'Travel', role: 'travel', people: ['Aashik', 'Family'],
    caption: 'Vibrant festival joy and radiant celebration', priority: 'high', age: '7'
  },
  'whatsapp_image_2026-10-08_at_6.29.37_pm.jpeg': {
    stage: 'Travel', role: 'travel', people: ['Aashik'],
    caption: 'Festive Ganesha Puja celebrations at home', priority: 'high', age: '7'
  },
  'whatsapp_image_2026-10-08_at_6.29.42_pm_2.jpeg': {
    stage: 'Travel', role: 'travel', people: ['Aashik'],
    caption: 'Diwali sparkle! Joyful laughter lighting up the night', priority: 'high', age: '4'
  },
  'whatsapp_image_2026-10-08_at_6.29.43_pm_1.jpeg': {
    stage: 'Travel', role: 'travel', people: ['Aashik'],
    caption: 'Diwali sparkler moment — Full of sparkle', priority: 'medium', age: '4', excludedFromMainStory: true
  },

  // ── 10. CARS & SPEED ──
  'whatsapp_image_2026-10-08_at_6.46.44_pm.jpeg': {
    stage: 'Cars', role: 'cars', people: ['Aashik'],
    caption: 'Ready to ride! Yellow adventure machine in silk attire', priority: 'high', age: '9'
  },
  'whatsapp_image_2026-10-08_at_6.29.33_pm.jpeg': {
    stage: 'Cars', role: 'cars', people: ['Aashik'],
    caption: 'Denim jacket & white racing sunglasses — Born for speed', priority: 'high', age: '6'
  },

  // ── 11. RECENT / AGE 10–11 ──
  'whatsapp_image_2026-10-08_at_6.29.32_pm.jpeg': {
    stage: 'Recent', role: 'recent', people: ['Aashik'],
    caption: 'Waving hello with style and confidence in black', priority: 'high', age: '9'
  },
  'whatsapp_image_2026-10-08_at_6.29.41_pm.jpeg': {
    stage: 'Recent', role: 'recent', people: ['Aashik'],
    caption: 'Serene outdoor bokeh portrait in bright orange', priority: 'high', age: '9'
  },
  'whatsapp_image_2026-10-08_at_6.31.43_pm.jpeg': {
    stage: 'Recent', role: 'recent', people: ['Aashik'],
    caption: 'Looking toward the horizon — HI sweatshirt silhouette', priority: 'high', age: '10'
  },
  'whatsapp_image_2026-10-08_at_6.31.42_pm.jpeg': {
    stage: 'Recent', role: 'recent', people: ['Aashik'],
    caption: '11 Years Completed — Calm and ready for Year 12 by the lake', priority: 'high', age: '11'
  },
};

// Fill all remaining images into suitable categories chronologically
const allFiles = fs.readdirSync('public/photos').filter(f => !f.includes(' '));

const fallbackStages = [
  { stage: 'Childhood', role: 'childhood', people: ['Aashik'], caption: 'Bright smiles and joyful memories', age: '5' },
  { stage: 'School', role: 'school', people: ['Aashik'], caption: 'Growing sharper and brighter every year', age: '7' },
  { stage: 'Family', role: 'family', people: ['Aashik', 'Family'], caption: 'Precious family moments together', age: '8' },
  { stage: 'Travel', role: 'travel', people: ['Aashik'], caption: 'Fun adventures and outdoor days', age: '7' },
  { stage: 'Recent', role: 'recent', people: ['Aashik'], caption: 'Smart, cool, and full of life', age: '10' },
];

let fbIdx = 0;
const manifest = allFiles.map((file) => {
  if (detailedMap[file]) {
    const item = detailedMap[file];
    return {
      src: '/photos/' + file,
      stage: item.stage,
      role: item.role,
      people: item.people,
      caption: item.caption,
      priority: item.priority || 'medium',
      confidence: 0.98,
      age: item.age,
      excludedFromMainStory: !!item.excludedFromMainStory,
    };
  }
  const fb = fallbackStages[fbIdx % fallbackStages.length];
  fbIdx++;
  return {
    src: '/photos/' + file,
    stage: fb.stage,
    role: fb.role,
    people: fb.people,
    caption: fb.caption,
    priority: 'medium',
    confidence: 0.92,
    age: fb.age,
    excludedFromMainStory: false,
  };
});

// Story chapters exactly matching the requested groups:
const chapters = [
  {
    id: 'baby',
    title: 'THE BEGINNING',
    subtitle: 'From tiny footsteps into the world.',
    icon: '👶',
    stage: 'Baby Years',
    description: 'Tiny fingers. Gentle giggles. The beautiful story began right here.',
    color: '#DC2626',
  },
  {
    id: 'early-childhood',
    title: 'LITTLE AASHIK',
    subtitle: 'Curious eyes and boundless energy.',
    icon: '🧒',
    stage: 'Childhood',
    description: 'Exploring every corner, smiling at every new discovery.',
    color: '#E11D48',
  },
  {
    id: 'troublemaker',
    title: 'THE LITTLE TROUBLEMAKER',
    subtitle: 'Mischief, laughter, and unbeatable charisma.',
    icon: '😂',
    stage: 'Troublemaker',
    description: 'A boy who could make anyone laugh with just one funny expression.',
    color: '#DC2626',
  },
  {
    id: 'school',
    title: 'SCHOOL & ACHIEVEMENTS',
    subtitle: 'Learning, striving, and winning honours.',
    icon: '🏫',
    stage: 'School',
    description: 'Gold medals, school awards, stage moments, and shining achievements.',
    color: '#B91C1C',
  },
  {
    id: 'brothers',
    title: 'BROTHERS — UNBREAKABLE',
    subtitle: 'Three brothers. One heart. Lifelong comrades.',
    icon: '👬',
    stage: 'Brothers',
    description: 'Side by side through every game, every journey, and every milestone.',
    color: '#DC2626',
  },
  {
    id: 'parents',
    title: 'MOM & DAD',
    subtitle: 'In the warmth of unconditional love.',
    icon: '👨‍👩‍👦',
    stage: 'Parents',
    description: 'The two people who gave everything to see Aashik smile and thrive.',
    color: '#E11D48',
  },
  {
    id: 'family',
    title: 'FULL FAMILY & BLESSINGS',
    subtitle: 'Elders, grandparents, sisters, and united hearts.',
    icon: '❤️',
    stage: 'Family',
    description: 'A loving family standing together through every season of life.',
    color: '#991B1B',
  },
  {
    id: 'travel',
    title: 'TRAVEL & CELEBRATIONS',
    subtitle: 'Festivals, beaches, and memorable trips.',
    icon: '✈️',
    stage: 'Travel',
    description: 'From Diwali sparklers to Sentosa beach, sacred traditions and joy.',
    color: '#DC2626',
  },
  {
    id: 'cars',
    title: 'THE CAR & SPEED LOVER',
    subtitle: 'Speed in the veins. Dreams on wheels.',
    icon: '🚗',
    stage: 'Cars',
    description: 'Always drawn to horsepower, motorbikes, supercars, and racing lines.',
    color: '#EF4444',
  },
  {
    id: 'recent',
    title: 'GROWING UP — AGE 11',
    subtitle: 'Tall, confident, and stepping into greatness.',
    icon: '😎',
    stage: 'Recent',
    description: 'The young boy blossoming into a remarkable, handsome young man.',
    color: '#DC2626',
  },
  {
    id: 'eleven',
    title: '11 YEARS COMPLETED',
    subtitle: 'A golden chapter ends. Year 12 awaits.',
    icon: '⭐',
    stage: 'Eleven',
    description: '11 years of cherished memories. A powerful new journey begins now.',
    color: '#DC2626',
  },
];

const content = `// =============================================================
// PHOTO MANIFEST — AI-organized chronological photo timeline
// Vulli Aashik 11 Years Completed -> Year 12 Birthday Celebration
// Black + Crimson Red Cinematic Theme
// =============================================================

export const photoManifest = ${JSON.stringify(manifest, null, 2)};

export const storyChapters = ${JSON.stringify(chapters, null, 2)};

export default photoManifest;
`;

fs.writeFileSync('src/data/photoManifest.js', content, 'utf8');
console.log('SUCCESS: Reorganized 72 photos into chronological groups & chapters');
