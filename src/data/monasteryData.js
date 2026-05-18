export const monasteries = [
  {
    id: 1,
    slug: 'rumtek',
    name: 'Rumtek Monastery',
    localName: 'Rumtek Dharma Chakra Centre',
    location: 'Gangtok District',
    region: 'East',
    lat: 27.3019,
    lng: 88.5606,
    founded: '1966',
    sect: 'Karma Kagyu',
    description:
      'Sikkim’s largest monastery and one of the most important seats of the Karma Kagyu lineage. The complex includes the main prayer hall, golden stupa, monastic quarters, and the Nalanda Institute.',
    significance: 'Major Karma Kagyu centre and a flagship destination for Buddhist heritage tourism.',
    features: ['Golden stupa', 'Prayer wheels', 'Main assembly hall', 'Nalanda Institute', 'Monastic courtyard'],
    image: '/rumtek-monastery-golden-roof-traditional-architect.jpg',
    visitors: 2100,
    rating: 4.9,
    bestTime: 'March to June, September to November',
    hours: '6:00 AM to 6:00 PM',
    entry: 'Free',
    accessibility: 'Road access from Gangtok with final approach by local taxi.',
    tourLength: '60 to 90 minutes',
  },
  {
    id: 2,
    slug: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    localName: 'Perfect Sublime Lotus Monastery',
    location: 'Pelling, Gyalshing District',
    region: 'West',
    lat: 27.3167,
    lng: 88.2500,
    founded: '1705',
    sect: 'Nyingma',
    description:
      'One of Sikkim’s oldest and most respected monasteries, known for its murals, ritual objects, and the extraordinary wooden Zangdog Palri sculpture representing Guru Rinpoche’s celestial abode.',
    significance: 'Premier Nyingma monastery and an anchor for West Sikkim heritage circuits.',
    features: ['Ancient murals', 'Zangdog Palri sculpture', 'Prayer hall', 'Kanchenjunga viewpoints'],
    image: '/pemayangtse-monastery-white-walls-mountain-view.jpg',
    visitors: 1800,
    rating: 4.8,
    bestTime: 'March to May, October to December',
    hours: '7:00 AM to 5:00 PM',
    entry: 'INR 20',
    accessibility: 'Road access from Pelling with short walk inside the complex.',
    tourLength: '45 to 75 minutes',
  },
  {
    id: 3,
    slug: 'tashiding',
    name: 'Tashiding Monastery',
    localName: 'Tashiding Gompa',
    location: 'Yuksom Road, Gyalshing District',
    region: 'West',
    lat: 27.3145,
    lng: 88.3131,
    founded: '1641',
    sect: 'Nyingma',
    description:
      'A sacred hilltop monastery between the Rathong Chu and Rangit rivers. Tashiding is closely associated with the Bumchu festival, when a holy vase is opened as an omen for the year ahead.',
    significance: 'Regarded as one of Sikkim’s holiest pilgrimage sites.',
    features: ['Sacred chortens', 'Bumchu vase tradition', 'Valley views', 'Prayer flags'],
    image: '/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg',
    visitors: 1500,
    rating: 4.7,
    bestTime: 'February to May, October to December',
    hours: '6:00 AM to 5:00 PM',
    entry: 'Free',
    accessibility: 'Road access followed by a steep uphill walk.',
    tourLength: '75 to 120 minutes',
  },
  {
    id: 4,
    slug: 'enchey',
    name: 'Enchey Monastery',
    localName: 'Solitary Temple',
    location: 'Gangtok District',
    region: 'East',
    lat: 27.3500,
    lng: 88.6166,
    founded: '1909',
    sect: 'Nyingma',
    description:
      'A peaceful hilltop monastery above Gangtok, known for its masked Cham dances and views toward the Kanchenjunga range on clear days.',
    significance: 'A highly accessible cultural stop within Gangtok’s city heritage circuit.',
    features: ['Cham dance tradition', 'Kanchenjunga views', 'Prayer hall', 'Courtyard gardens'],
    image: '/majestic-himalayan-monastery-with-prayer-flags-and.jpg',
    visitors: 1200,
    rating: 4.6,
    bestTime: 'October to March',
    hours: '7:00 AM to 4:00 PM',
    entry: 'Free',
    accessibility: 'Short drive from central Gangtok.',
    tourLength: '30 to 60 minutes',
  },
]

export const festivals = [
  {
    id: 1,
    name: 'Losar Festival',
    date: '2027-02-08',
    endDate: '2027-02-10',
    description:
      'Tibetan New Year observances with prayers, family gatherings, ritual offerings, and cultural performances across monastic communities.',
    location: 'Multiple monasteries',
    monasteryId: null,
    duration: '3 days',
    type: 'Major Festival',
    significance: 'New year purification, renewal, and community gathering.',
    image: '/rumtek-monastery-golden-roof-traditional-architect.jpg',
  },
  {
    id: 2,
    name: 'Bumchu Festival',
    date: '2027-03-24',
    endDate: '2027-03-24',
    description:
      'A sacred water ceremony at Tashiding where the level of water in a holy vase is interpreted as a sign for the coming year.',
    location: 'Tashiding Monastery',
    monasteryId: 3,
    duration: '1 day',
    type: 'Sacred Ceremony',
    significance: 'Divination, blessing, and pilgrimage.',
    image: '/tashiding-monastery-hilltop-prayer-flags-valley-vi.jpg',
  },
  {
    id: 3,
    name: 'Saga Dawa',
    date: '2027-05-20',
    endDate: '2027-05-20',
    description:
      'A holy Buddhist observance commemorating Buddha’s birth, enlightenment, and parinirvana through prayer, offerings, and merit-making.',
    location: 'Pemayangtse Monastery',
    monasteryId: 2,
    duration: '1 day',
    type: 'Buddhist Holy Day',
    significance: 'Triple commemoration of Buddha’s major life events.',
    image: '/pemayangtse-monastery-white-walls-mountain-view.jpg',
  },
  {
    id: 4,
    name: 'Pang Lhabsol',
    date: '2026-09-15',
    endDate: '2026-09-16',
    description:
      'A festival unique to Sikkim that honours Mount Kanchenjunga as guardian deity through ritual, masked dance, and community celebration.',
    location: 'Enchey Monastery',
    monasteryId: 4,
    duration: '2 days',
    type: 'Unique to Sikkim',
    significance: 'Honouring Sikkim’s guardian deity and shared cultural identity.',
    image: '/majestic-himalayan-monastery-with-prayer-flags-and.jpg',
  },
  {
    id: 5,
    name: 'Guru Rinpoche Tse-Chu',
    date: '2026-07-21',
    endDate: '2026-07-21',
    description:
      'Celebration of Guru Padmasambhava with prayers, offerings, and cultural activities in monasteries connected with Vajrayana Buddhist traditions.',
    location: 'Multiple monasteries',
    monasteryId: null,
    duration: '1 day',
    type: 'Sacred Ceremony',
    significance: 'Honouring Guru Rinpoche’s role in Himalayan Buddhism.',
    image: '/rumtek-monastery-golden-roof-traditional-architect.jpg',
  },
  {
    id: 6,
    name: 'Lhabab Duchen',
    date: '2026-11-15',
    endDate: '2026-11-15',
    description:
      'A Buddhist holy day commemorating Buddha’s descent from the heavenly realm, traditionally marked by merit-making and prayer.',
    location: 'Rumtek Monastery',
    monasteryId: 1,
    duration: '1 day',
    type: 'Buddhist Holy Day',
    significance: 'A day associated with multiplied merit.',
    image: '/rumtek-monastery-golden-roof-traditional-architect.jpg',
  },
]

export const archives = [
  {
    id: 1,
    title: 'Buddhist Thangka Paintings',
    description:
      'Traditional scroll paintings depicting deities, mandalas, and teaching scenes, typically made with mineral pigments and fine linework.',
    category: 'Art',
    period: '17th to 19th century',
    monasteryId: 1,
    location: 'Rumtek Monastery',
    significance: 'Meditation aids and visual teaching tools.',
    image: '/Archives-1.jpg',
  },
  {
    id: 2,
    title: 'Ancient Buddhist Manuscripts',
    description:
      'Handwritten Buddhist texts and commentaries preserved as part of Sikkim’s monastic knowledge tradition.',
    category: 'Literature',
    period: '12th to 18th century',
    monasteryId: 2,
    location: 'Pemayangtse Monastery',
    significance: 'Preservation of Buddhist philosophy and practice instructions.',
    image: '/Archives 2.avif',
  },
  {
    id: 3,
    title: 'Prayer Wheels and Ritual Objects',
    description:
      'Ceremonial objects including prayer wheels, dorjes, offering bowls, and ritual instruments used in Vajrayana practice.',
    category: 'Artifacts',
    period: '15th to 20th century',
    monasteryId: 3,
    location: 'Tashiding Monastery',
    significance: 'Essential implements for monastic ritual practice.',
    image: '/Archive 3.jpg',
  },
  {
    id: 4,
    title: 'Monastery Murals and Frescoes',
    description:
      'Wall paintings showing Buddhist cosmology, protective deities, Jataka tales, and scenes from the life of Buddha.',
    category: 'Art',
    period: '16th to 20th century',
    monasteryId: 2,
    location: 'Various monasteries',
    significance: 'Visual storytelling and public religious education.',
    image: '/archive 4.jpg',
  },
  {
    id: 5,
    title: 'Ceremonial Silk Textiles',
    description:
      'Brocade hangings, ritual robes, and prayer flag sets used during festivals and daily monastic ceremonies.',
    category: 'Artifacts',
    period: '14th to 19th century',
    monasteryId: 1,
    location: 'Rumtek Monastery',
    significance: 'Material record of ceremonial life and patronage.',
    image: '/Archive 5.jpeg',
  },
  {
    id: 6,
    title: 'Historical Photographs',
    description:
      'Rare photographs documenting monastery architecture, ceremonies, pilgrim routes, and daily monastic life.',
    category: 'Photography',
    period: '1880 to 1960',
    monasteryId: null,
    location: 'Sikkim State Archives',
    significance: 'Visual record for research, restoration, and public education.',
    image: '/Archive 6.jpg',
  },
]

export function getMonasteryById(id) {
  return monasteries.find((monastery) => monastery.id === id)
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function searchAll(query) {
  const q = query.trim().toLowerCase()
  if (!q) return { query, monasteries, festivals, archives }

  return {
    query,
    monasteries: monasteries.filter((m) =>
      [m.name, m.localName, m.description, m.location, m.region, m.sect, ...m.features]
        .join(' ')
        .toLowerCase()
        .includes(q),
    ),
    festivals: festivals.filter((f) =>
      [f.name, f.description, f.location, f.type, f.significance].join(' ').toLowerCase().includes(q),
    ),
    archives: archives.filter((a) =>
      [a.title, a.description, a.category, a.period, a.location, a.significance]
        .join(' ')
        .toLowerCase()
        .includes(q),
    ),
  }
}
