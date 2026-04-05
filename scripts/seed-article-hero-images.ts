/**
 * Hero images for seeded articles — remote JPEG URLs Contentful ingests via Asset `upload`.
 * Images are from **Unsplash** (free to use: https://unsplash.com/license). Attribution in `credit`.
 */
export type HeroImageSeed = {
  /** Direct image URL (JPEG). `w=1600&q=80` keeps files reasonable for upload processing. */
  uploadUrl: string;
  fileName: string;
  /** Shown in Contentful asset description + helps editors credit the photographer. */
  credit: string;
};

export const HERO_IMAGE_BY_SLUG: Record<string, HeroImageSeed> = {
  "the-floor-that-held": {
    uploadUrl:
      "https://images.unsplash.com/photo-1582139324036-310a07894c09?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-fire-smoke-building.jpg",
    credit: "Photo by Björn Simon on Unsplash",
  },
  "ten-cities-where-life-still-feels-possible-2026": {
    uploadUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-city-skyline.jpg",
    credit: "Photo by Pedro Lastra on Unsplash",
  },
  "your-router-knows-when-youre-lonely": {
    uploadUrl:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-wifi-router-home.jpg",
    credit: "Photo by Compare Fibre on Unsplash",
  },
  "salt-air-and-second-chances": {
    uploadUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-beach-ocean.jpg",
    credit: "Photo by Sean Oulashin on Unsplash",
  },
  "the-orchestra-pit-opened-underground": {
    uploadUrl:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-orchestra-concert.jpg",
    credit: "Photo by Juhani Kangas on Unsplash",
  },
  "why-we-argue-about-sports-we-dont-play": {
    uploadUrl:
      "https://images.unsplash.com/photo-1461896836934-7f927fc27c6b?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-stadium-crowd.jpg",
    credit: "Photo by Izuddin Helmi Adnan on Unsplash",
  },
  "the-telescope-that-only-looked-at-rooftops": {
    uploadUrl:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-night-sky-telescope.jpg",
    credit: "Photo by Juskteez Vu on Unsplash",
  },
  "notes-from-a-4am-diner": {
    uploadUrl:
      "https://images.unsplash.com/photo-1555992336-f0320c0638c4?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-diner-neon.jpg",
    credit: "Photo by Chad Montano on Unsplash",
  },
  "how-to-read-a-city-in-one-walk": {
    uploadUrl:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-urban-street-walk.jpg",
    credit: "Photo by Florian Wehde on Unsplash",
  },
  "the-patent-clerk-who-mailed-the-future-to-himself": {
    uploadUrl:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-vintage-envelope-mail.jpg",
    credit: "Photo by Joanna Kosinska on Unsplash",
  },
  "vinyl-came-back-wrong-and-we-loved-it": {
    uploadUrl:
      "https://images.unsplash.com/photo-1603048588665-791ca8a617ac?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-vinyl-record.jpg",
    credit: "Photo by Eric Nopanen on Unsplash",
  },
  "quietest-room-on-earth-loud-inside-your-head": {
    uploadUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-headphones-silence.jpg",
    credit: "Photo by C D-X on Unsplash",
  },
  "what-firefighters-hear-in-the-smoke": {
    uploadUrl:
      "https://images.unsplash.com/photo-1595434091143-b375ced5c9ce?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-firefighter.jpg",
    credit: "Photo by Johannes Plenio on Unsplash",
  },
  "brief-history-close-door-button": {
    uploadUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-elevator-buttons.jpg",
    credit: "Photo by Elevate on Unsplash",
  },
  "the-island-where-maps-go-to-nap": {
    uploadUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-tropical-island.jpg",
    credit: "Photo by Sean Oulashin on Unsplash",
  },
  "sunday-laundry-as-spiritual-practice": {
    uploadUrl:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-laundry-basket.jpg",
    credit: "Photo by Dan Gold on Unsplash",
  },
  "ten-rules-eating-alone-in-public": {
    uploadUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-restaurant-interior.jpg",
    credit: "Photo by Jay Wennington on Unsplash",
  },
  "the-elevator-that-remembered-everyones-shoes": {
    uploadUrl:
      "https://images.unsplash.com/photo-1560749003-f4b588e7f387?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-elevator-metal.jpg",
    credit: "Photo by Christian Lue on Unsplash",
  },
  "why-your-brain-tags-songs-as-summer": {
    uploadUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-headphones-summer-vibe.jpg",
    credit: "Photo by Malte Wingen on Unsplash",
  },
  "the-parade-route-nobody-uses-anymore": {
    uploadUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-parade-festival.jpg",
    credit: "Photo by Sven Scheuermeier on Unsplash",
  },
  "open-letter-bike-seat-thief": {
    uploadUrl:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-bicycle-city.jpg",
    credit: "Photo by Mika Baumeister on Unsplash",
  },
  "remote-work-death-water-cooler-myth": {
    uploadUrl:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-home-office-laptop.jpg",
    credit: "Photo by XPS on Unsplash",
  },
  "the-harbor-light-that-wasnt-for-boats": {
    uploadUrl:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-lighthouse-coast.jpg",
    credit: "Photo by Josh Withers on Unsplash",
  },
  "how-to-pack-trip-not-booked": {
    uploadUrl:
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-suitcase-travel.jpg",
    credit: "Photo by Marten Bjork on Unsplash",
  },
  "the-museum-of-almost": {
    uploadUrl:
      "https://images.unsplash.com/photo-1566127444979-b3d2b3352c53?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-museum-gallery.jpg",
    credit: "Photo by Pawel Czerwinski on Unsplash",
  },
  "cooking-for-one-without-performing-sadness": {
    uploadUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-cooking-kitchen-solo.jpg",
    credit: "Photo by Becca Tapert on Unsplash",
  },
  "the-algorithm-that-liked-you-too-much": {
    uploadUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-code-cyber.jpg",
    credit: "Photo by Markus Spiske on Unsplash",
  },
  "winter-swimming-for-cowards": {
    uploadUrl:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-cold-water-swim.jpg",
    credit: "Photo by Greg Rakozy on Unsplash",
  },
  "stars-you-can-see-from-a-parking-lot": {
    uploadUrl:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-night-stars.jpg",
    credit: "Photo by Vincent Guth on Unsplash",
  },
  "the-last-voicemail-you-saved": {
    uploadUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    fileName: "hero-smartphone-hand.jpg",
    credit: "Photo by Yura Fresh on Unsplash",
  },
};
