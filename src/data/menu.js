// Central catalogue for The Fork & Flame — menu items, testimonials, gallery.
// Images are served by Unsplash's public CDN with crop parameters so each
// photo loads at a sensibly-sized, fast WebP rendition.

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MENU_CATEGORIES = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

export const MENU_ITEMS = [
  {
    id: 'smoked-salmon-tartare',
    name: 'Smoked Salmon Tartare',
    description: 'Hand-cut salmon, avocado mousse, dill oil & crispbread.',
    price: 18,
    category: 'Starters',
    image: img('1467003909585-2f8a72700288'),
    badge: "Chef's pick",
  },
  {
    id: 'burrata-heirloom',
    name: 'Burrata & Heirloom Tomato',
    description: 'Creamy burrata, basil oil, aged balsamic & grilled sourdough.',
    price: 16,
    category: 'Starters',
    image: img('1546069901-ba9599a7e63c'),
  },
  {
    id: 'seared-scallops',
    name: 'Seared Hokkaido Scallops',
    description: 'Cauliflower velouté, caviar, brown butter & chive.',
    price: 24,
    category: 'Starters',
    image: img('1535140728325-a4d3707eee61'),
    badge: 'Signature',
  },
  {
    id: 'wild-mushroom-soup',
    name: 'Wild Mushroom Velouté',
    description: 'Foraged mushrooms, truffle cream & toasted seeds.',
    price: 14,
    category: 'Starters',
    image: img('1547592166-23ac45744acd'),
  },
  {
    id: 'flame-grilled-steak',
    name: 'Flame-Grilled Ribeye',
    description: 'Dry-aged 45 days, bone-marrow butter, smoked jus.',
    price: 46,
    category: 'Main Course',
    image: img('1546964124-0cce460f38ef'),
    badge: 'Signature',
  },
  {
    id: 'pan-seared-duck',
    name: 'Pan-Seared Duck Breast',
    description: 'Cherry gastrique, parsnip purée & glazed endive.',
    price: 38,
    category: 'Main Course',
    image: img('1432139555190-58524dae6a55'),
  },
  {
    id: 'lobster-risotto',
    name: 'Lobster & Saffron Risotto',
    description: 'Slow-cooked arborio, Maine lobster, bisque cream.',
    price: 42,
    category: 'Main Course',
    image: img('1476124369491-e7addf5db371'),
    badge: "Chef's pick",
  },
  {
    id: 'wild-mushroom-risotto',
    name: 'Wild Mushroom Ragu — Tagliolini',
    description: 'Hand-cut pasta, porcini, truffle oil & pecorino.',
    price: 32,
    category: 'Main Course',
    image: img('1473093295043-cdd812d0e601'),
  },
  {
    id: 'chocolate-fondant',
    name: '70% Chocolate Fondant',
    description: 'Molten heart, salted caramel, cocoa-nib tuile.',
    price: 15,
    category: 'Desserts',
    image: img('1551024506-0bccd828d307'),
    badge: 'Loved by all',
  },
  {
    id: 'lemon-tart',
    name: 'Burnt Lemon Tart',
    description: 'Torched meringue, Amalfi lemon & almond sable.',
    price: 14,
    category: 'Desserts',
    image: img('1519915028121-7d3463d20b13'),
  },
  {
    id: 'rosemary-panna-cotta',
    name: 'Rosemary Panna Cotta',
    description: 'Honeycomb, poached figs & vanilla bean cream.',
    price: 13,
    category: 'Desserts',
    image: img('1488477181946-6428a0291777'),
  },
  {
    id: 'smoked-old-fashioned',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, demerara, applewood smoke — tableside.',
    price: 19,
    category: 'Drinks',
    image: img('1470337458703-46ad1756a187'),
    badge: 'Signature',
  },
  {
    id: 'barolo-glass',
    name: 'Barolo DOCG 2018',
    description: 'Piedmont, Italy — rose, tar & dried herbs. By the glass.',
    price: 22,
    category: 'Drinks',
    image: img('1510812431401-41d2bd2722f3'),
  },
  {
    id: 'negroni',
    name: 'Flame Negroni',
    description: 'Gin, campari & sweet vermouth over a single ice cube.',
    price: 17,
    category: 'Drinks',
    image: img('1551538827-9c037cb4f32a'),
  },
  {
    id: 'garden-spritz',
    name: 'Garden Spritz (0%)',
    description: 'Elderflower, cucumber & mint — shimmering zero-proof.',
    price: 11,
    category: 'Drinks',
    image: img('1544145945-f90425340c7e'),
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Isabella Moreau',
    role: 'Food critic, The Daily Plate',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'The ribeye alone deserves a standing ovation. Every plate arrived like a work of art — yet the warmth of the service made us feel like old friends.',
  },
  {
    id: 2,
    name: 'James Whitfield',
    role: 'Regular guest',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'Booked for our anniversary and it was flawless — the smoked old fashioned at the table, the duck, the candlelight. We will be back every month.',
  },
  {
    id: 3,
    name: 'Amara Okafor',
    role: 'Travel blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review:
      'I eat in restaurants in 40 countries a year. The Fork & Flame is the first place in a decade where I asked for the chef. The lobster risotto is life-changing.',
  },
  {
    id: 4,
    name: 'Daniel Reyes',
    role: 'Wine merchant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    review:
      'A cellar of rare depth and a sommelier who genuinely listens. The Barolo pairing with the mushroom tagliolini was a masterclass in balance.',
  },
];

export const GALLERY = [
  { id: 1, src: img('1414235077428-338989a2e8c0', 1200), alt: 'Elegant dining room at candlelight', tag: 'Interior' },
  { id: 2, src: img('1504674900247-0877df9cc836', 1200), alt: 'Gourmet plated dish with fresh herbs', tag: 'Dishes' },
  { id: 3, src: img('1556910103-1c02745aae4d', 1200), alt: 'Chef plating a dish in the kitchen', tag: 'Kitchen' },
  { id: 4, src: img('1517248135467-4c7edcad34c4', 1200), alt: 'Restaurant interior with warm lighting', tag: 'Interior' },
  { id: 5, src: img('1466978913421-501180b1ec31', 1200), alt: 'Guests enjoying a shared dining experience', tag: 'Experience' },
  { id: 6, src: img('1551218808-94e220e084d2', 1200), alt: 'Fine-dining culinary artistry', tag: 'Dishes' },
  { id: 7, src: img('1559339352-11d035aa65de', 1200), alt: 'Elegant tablescape set for dinner service', tag: 'Experience' },
  { id: 8, src: img('1544025162-d76694265947', 1200), alt: 'Flame-grilled steak fresh from the grill', tag: 'Dishes' },
  { id: 9, src: img('1577219491135-ce391730fb2c', 1200), alt: 'Chef carefully finishing a plate', tag: 'Kitchen' },
];

export const HERO_IMAGE = img('1414235077428-338989a2e8c0', 1920);

export const DEMO_CONTACT = {
  phone: '+1 (555) 014-2200',
  email: 'reservations@forkandflame.demo',
  address: '128 Ember Lane, Old Market District, Portland, OR 97209',
  mapEmbed:
    'https://www.google.com/maps?q=Portland%2C+OR&output=embed',
  hours: [
    { days: 'Monday – Thursday', time: '5:00 PM – 10:00 PM' },
    { days: 'Friday – Saturday', time: '5:00 PM – 11:30 PM' },
    { days: 'Sunday', time: '4:00 PM – 9:00 PM' },
  ],
};

export const DELIVERY_FEE = 5.99;
export const FREE_DELIVERY_FROM = 60;
