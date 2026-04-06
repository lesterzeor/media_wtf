import type { ArticleSeed } from "./seed-articles-types";
import { ARTICLE_SEEDS_EXTRA_30 } from "./seed-articles-extra-30";

/**
 * Display names + slugs created in Contentful if missing.
 * Keep slugs in sync with `HOME_PAGE_CATEGORY_SLUGS` in `src/lib/contentful/homeFeed.ts`.
 */
export const CATEGORY_DEFS = {
  fiction: { name: "Fiction", slug: "fiction" },
  lifestyle: { name: "Lifestyle", slug: "lifestyle" },
  travel: { name: "Travel", slug: "travel" },
  tech: { name: "Technology", slug: "technology" },
  culture: { name: "Culture", slug: "culture" },
  opinion: { name: "Opinion", slug: "opinion" },
  guides: { name: "Guides", slug: "guides" },
  science: { name: "Science", slug: "science" },
} as const;

export type CategoryKey = keyof typeof CATEGORY_DEFS;

/** Default roster referenced by seeds (entries are created if missing). */
export const DEFAULT_AUTHOR_NAMES = ["Mara Chen", "Jordan Ellis", "Sam Okonkwo", "Riley Park"] as const;

function L(...lines: ArticleSeed["lines"]): ArticleSeed["lines"] {
  return lines;
}

export const ARTICLE_SEEDS: ArticleSeed[] = [
  {
    title: "The Floor That Held",
    slug: "the-floor-that-held",
    excerpt:
      "Smoke climbed the stairwell in thick, patient layers, as if the building had been saving its breath for this moment.",
    categoryKey: "fiction",
    authorName: "Mara Chen",
    lines: L(
      { t: "h1", text: "The Floor That Held" },
      { t: "p", text: "3:14 a.m." },
      {
        t: "p",
        text: "Mara woke to the wrong kind of silence—no hum from the fridge, no distant traffic—only a low crackle behind the walls. She pressed her palm to the door. Warm. Too warm.",
      },
      {
        t: "quote",
        lines: [
          '"You don\'t run from fire," her father used to say. "You run from what it turns the air into."',
        ],
      },
      {
        t: "p",
        text: "She stuffed her phone, keys, and a jacket into a bag. In the hallway, the emergency lights washed everything in sick amber. Downstairs was tradition; tonight, tradition was a trap.",
      },
      { t: "hr" },
      { t: "h2", text: "What she checked" },
      {
        t: "ul",
        items: [
          "Stairwell A — heat rolling up like a tide",
          "Stairwell B — voices, someone counting doors",
          "The roof — last resort; the wind might buy minutes",
        ],
      },
      {
        t: "p",
        text: "She chose B. Halfway down, a sprinkler hissed once and quit, leaving a smell like wet pennies and regret.",
      },
      { t: "hr" },
      {
        t: "p",
        text: "On the fourth-floor landing, a man leaned on the rail, coughing. Mara didn’t ask his name. She looped an arm under his elbow and said only: “Lean on me when the steps go soft.”",
      },
      {
        t: "p",
        text: "They made the lobby as glass shattered somewhere high above—a sound like the city applauding the wrong hero.",
      },
      {
        t: "p",
        text: "Outside, cold air hit like truth. Sirens stitched red across the avenue. Mara looked back once. The building wore its fire like a crown it never asked for.",
      },
    ),
  },
  {
    title: "Ten Cities Where Life Still Feels Possible in 2026",
    slug: "ten-cities-where-life-still-feels-possible-2026",
    excerpt:
      "A practical, opinionated ranking: transit, rent stress, weather honesty, and whether strangers still make small talk in line.",
    categoryKey: "guides",
    authorName: "Jordan Ellis",
    lines: L(
      { t: "h2", text: "How we ranked them" },
      {
        t: "p",
        text: "This isn’t a spreadsheet fantasy. We weighted what everyday people actually complain about after six months: groceries, commute pain, childcare luck, and whether the city forgives you for being broke on a Tuesday.",
      },
      { t: "h3", text: "1. Copenhagen" },
      {
        t: "p",
        text: "Bikes rule the curb; rain is assumed, not dramatized. Expensive, yes—but you get time back in clean, predictable minutes.",
      },
      { t: "h3", text: "2. Montréal" },
      {
        t: "p",
        text: "Four seasons with personality, a bilingual hum, and neighborhoods that still feel like neighborhoods, not branding exercises.",
      },
      { t: "h3", text: "3. Taipei" },
      {
        t: "p",
        text: "Night markets, fast metro, and a culture of feeding strangers well. Humidity is the tax; flavor is the refund.",
      },
      { t: "h3", text: "4. Porto" },
      {
        t: "p",
        text: "Hills that train your calves, wine that forgives your budget, and Atlantic light that makes cheap apartments look philosophical.",
      },
      { t: "h3", text: "5. Minneapolis" },
      {
        t: "p",
        text: "Cold that doesn’t negotiate—so people build interiors worth staying in. Great libraries, great lakes, honest winters.",
      },
      { t: "h3", text: "6. Fukuoka" },
      {
        t: "p",
        text: "Smaller than Tokyo’s headlines, bigger than your need for hype. Ramen, green hills, and a pace that respects dinner.",
      },
      { t: "h3", text: "7. Melbourne" },
      {
        t: "p",
        text: "Coffee as craft, sport as religion, and laneways that reward wandering without a plan.",
      },
      { t: "h3", text: "8. Accra" },
      {
        t: "p",
        text: "Energy in the streets, music in the air, and a startup spirit that isn’t trying to sound like California.",
      },
      { t: "h3", text: "9. Wellington" },
      {
        t: "p",
        text: "Wind that humbles you; people who laugh about it. A capital that feels like a town that read a few novels.",
      },
      { t: "h3", text: "10. Medellín" },
      {
        t: "p",
        text: "Metro cables stitch hills together; spring weather spoils you. Do your homework on neighborhoods—reward beats postcard fear when you’re careful.",
      },
      { t: "hr" },
      {
        t: "p",
        text: "No city saves you. Some just let you breathe while you figure out what’s next.",
      },
    ),
  },
  {
    title: "Your Router Knows When You're Lonely",
    slug: "your-router-knows-when-youre-lonely",
    excerpt: "Late-night packets, smart bulbs, and the quiet analytics of a one-person apartment.",
    categoryKey: "tech",
    authorName: "Sam Okonkwo",
    lines: L(
      { t: "h2", text: "The house has a pulse" },
      {
        t: "p",
        text: "It isn’t sentience—it’s timing. The mesh router logs retries; the voice assistant mishears your sigh as a wake word; the TV suggests a documentary about penguins because you paused on sadness.",
      },
      {
        t: "p",
        text: "We invited cheap convenience across the threshold and now it watches us rehearse small talk with delivery drivers.",
      },
      { t: "quote", lines: ["Privacy isn’t a setting. It’s a relationship with who gets to infer your mood from latency."] },
      {
        t: "h2", text: "What to do without moving to a cabin" },
      {
        t: "ol",
        items: [
          "Segment IoT onto a guest network.",
          "Mute mics by default; reward companies that put hardware switches on cameras.",
          "Assume your TV is a billboard that occasionally plays prestige drama.",
        ],
      },
      {
        t: "p",
        text: "The goal isn’t purity. It’s refusing to let your worst night look like a segment in someone else’s dashboard.",
      },
    ),
  },
  {
    title: "Salt Air and Second Chances",
    slug: "salt-air-and-second-chances",
    excerpt: "A week in a coastal town that wasn’t on any influencer map—just fog, fish, and a bar that remembered your order.",
    categoryKey: "travel",
    authorName: "Riley Park",
    lines: L(
      {
        t: "p",
        text: "I came for the cheap ticket; I stayed because the tide kept its promises. Every morning the harbor rearranged itself—boats nodding yes, gulls negotiating scraps.",
      },
      {
        t: "p",
        text: "The guesthouse owner didn’t ask why I was alone. She pointed to a path along the bluff and said, “If the wind turns, come back before the rail gets slick.”",
      },
      { t: "hr" },
      { t: "h2", text: "What to eat" },
      {
        t: "ul",
        items: [
          "Grilled mackerel with lemon that tasted like sunlight debt.",
          "Bread from a bakery that only opens when the baker wakes up angry enough to knead.",
          "Wine that apologized for nothing.",
        ],
      },
      {
        t: "p",
        text: "Travel doesn’t fix you. Sometimes it just gives your problems a different horizon to silhouette against.",
      },
    ),
  },
  {
    title: "The Orchestra Pit Opened Underground",
    slug: "the-orchestra-pit-opened-underground",
    excerpt: "When a subway musician’s Bach collides with a busker’s drum machine—city culture isn’t curated; it’s contested.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "p",
        text: "Culture isn’t only what gets funded. It’s what people risk doing in public when the acoustics are bad and the cops are bored.",
      },
      {
        t: "p",
        text: "I followed a cello down a stairwell and found twenty strangers deciding, in real time, whether to clap between movements. Spoiler: kindness won.",
      },
      {
        t: "quote",
        lines: ["High culture is a rented tux; street culture is a patched jacket. Cities need both zippers."],
      },
      {
        t: "p",
        text: "Support the ticketed hall—but tip the tunnel, too. That’s where auditions never end.",
      },
    ),
  },
  {
    title: "Why We Argue About Sports We Don't Play",
    slug: "why-we-argue-about-sports-we-dont-play",
    excerpt: "Tribalism with better snacks: what we’re really defending on game day.",
    categoryKey: "opinion",
    authorName: "Sam Okonkwo",
    lines: L(
      {
        t: "p",
        text: "You don’t need cleats to feel seen. A jersey is a portable hometown—proof that you belonged somewhere once, even if rent evicted you twice.",
      },
      {
        t: "p",
        text: "The stats are an alibi. The fight is about identity without therapy prices.",
      },
      { t: "hr" },
      { t: "h2", text: "A gentler fan contract" },
      {
        t: "p",
        text: "Cheer hard, lose gracefully, and remember the person online is afraid of irrelevance, not actually your enemy.",
      },
    ),
  },
  {
    title: "The Telescope That Only Looked at Rooftops",
    slug: "the-telescope-that-only-looked-at-rooftops",
    excerpt: "Light pollution broke the sky—so a community lab aimed at antennas, kites, and one stubborn owl.",
    categoryKey: "science",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "Astronomy clubs adapt or die. Ours chose humor: we mapped LED bleed, charted bat flight with thermal cameras, and taught kids that science begins with noticing what’s wrong with the night.",
      },
      {
        t: "p",
        text: "We still peek at Jupiter when the air clears. Hope isn’t always deep space—sometimes it’s a neighbor turning off a decorative floodlight.",
      },
    ),
  },
  {
    title: "Notes from a 4 a.m. Diner",
    slug: "notes-from-a-4am-diner",
    excerpt: "Eggs, insomnia, and the democracy of booths: who shows up when the world is supposed to be closed.",
    categoryKey: "lifestyle",
    authorName: "Riley Park",
    lines: L(
      {
        t: "p",
        text: "The grill never gaslights you. It hisses exactly what it means. At four, the clientele is honest: nurses, drivers, lovers who ran out of excuses, writers who ran out of daylight.",
      },
      {
        t: "p",
        text: "I order rye toast and listen to a trucker explain tariffs to a teenager who just wanted hash browns. America still fits in a booth if you slide over.",
      },
    ),
  },
  {
    title: "How to Read a City in One Walk",
    slug: "how-to-read-a-city-in-one-walk",
    excerpt: "No apps—just shoes, water, and the discipline to look up from the curb.",
    categoryKey: "guides",
    authorName: "Jordan Ellis",
    lines: L(
      { t: "h2", text: "The route" },
      {
        t: "ol",
        items: [
          "Start where tourists don’t: a hardware store, a schoolyard at pickup, a post office at lunch.",
          "Follow maintenance—fresh paint means investment; taped windows mean a story.",
          "End at a bench and name three sounds that aren’t traffic.",
        ],
      },
      {
        t: "p",
        text: "You’re not collecting sights. You’re sampling how a place treats people who aren’t buying anything right now.",
      },
    ),
  },
  {
    title: "The Patent Clerk Who Mailed the Future to Himself",
    slug: "the-patent-clerk-who-mailed-the-future-to-himself",
    excerpt: "1905 energy, a stubborn filing system, and a love letter that was also a theory.",
    categoryKey: "fiction",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "He addressed the envelope to himself because the world wasn’t ready to sign for it. Inside: not romance, not a poem—just a thought experiment that bent the light in his cramped office.",
      },
      {
        t: "p",
        text: "The clerk downstairs thought he was eccentric. The postman thought he was lonely. The universe thought he was on time.",
      },
      { t: "hr" },
      {
        t: "p",
        text: "Some revolutions arrive as paperwork. This one arrived with a stamp.",
      },
    ),
  },
  {
    title: "Vinyl Came Back Wrong (And We Loved It)",
    slug: "vinyl-came-back-wrong-and-we-loved-it",
    excerpt: "Pops, skips, and the warmth we pretend to hear—why analog shame became analog pride.",
    categoryKey: "culture",
    authorName: "Riley Park",
    lines: L(
      {
        t: "p",
        text: "Streaming gave us everything; vinyl gave us friction. We missed friction—it reminded us we were alive enough to be inconvenienced.",
      },
      {
        t: "p",
        text: "The sleeve art is a poster; the groove is a promise that attention still matters.",
      },
    ),
  },
  {
    title: "The Quietest Room on Earth Is Loud Inside Your Head",
    slug: "quietest-room-on-earth-loud-inside-your-head",
    excerpt: "Anechoic chambers, blood flow, and the hallucination of silence.",
    categoryKey: "science",
    authorName: "Sam Okonkwo",
    lines: L(
      {
        t: "p",
        text: "Strip the echo and the brain invents one. You don’t hear nothing—you hear circulation, joints, the anxious narrator that usually hides behind traffic.",
      },
      {
        t: "p",
        text: "Silence isn’t zero decibels. It’s what’s left when the world stops loaning you its noise.",
      },
    ),
  },
  {
    title: "What Firefighters Hear in the Smoke",
    slug: "what-firefighters-hear-in-the-smoke",
    excerpt: "Training, superstition, and the sounds that mean get out now.",
    categoryKey: "opinion",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "p",
        text: "Hollywood loves the hero shot. Crews love competence—the hiss that shifts, the floor that goes spongy, the moment a door tells you it’s lying.",
      },
      {
        t: "p",
        text: "Respect isn’t loud. It’s funded equipment, sleep schedules, and politicians who don’t treat emergencies like content.",
      },
    ),
  },
  {
    title: "A Brief History of the 'Close Door' Button",
    slug: "brief-history-close-door-button",
    excerpt: "Comfort placebo, liability theater, and the LED that blinks whether or not anyone is listening.",
    categoryKey: "tech",
    authorName: "Sam Okonkwo",
    lines: L(
      {
        t: "p",
        text: "Sometimes it’s wired; sometimes it’s a stress toy for people who are already late. Elevators are tiny sociology labs.",
      },
      {
        t: "p",
        text: "If pressing helps, it helped your blood pressure—that’s still a win.",
      },
    ),
  },
  {
    title: "The Island Where Maps Go to Nap",
    slug: "the-island-where-maps-go-to-nap",
    excerpt: "Ferry schedules as personality, and a place too small for hurry.",
    categoryKey: "travel",
    authorName: "Riley Park",
    lines: L(
      {
        t: "p",
        text: "GPS assumes roads want to be found. Here, roads wander on purpose—past sheep, past gossip, past the idea that efficiency is always kind.",
      },
      {
        t: "p",
        text: "I missed a connection and gained a pie. The island approved.",
      },
    ),
  },
  {
    title: "Sunday Laundry as Spiritual Practice",
    slug: "sunday-laundry-as-spiritual-practice",
    excerpt: "Sort lights and darks; forgive yourself the sock that disappeared—ritual for the skeptical.",
    categoryKey: "lifestyle",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "The machine’s rhythm is honest. It doesn’t care about your résumé—only whether you separated reds.",
      },
      {
        t: "p",
        text: "Clean sheets are a small resurrection. Fold them badly; grace is a rectangle you approximate.",
      },
    ),
  },
  {
    title: "Ten Rules for Eating Alone in Public",
    slug: "ten-rules-eating-alone-in-public",
    excerpt: "Book optional; shame not invited.",
    categoryKey: "guides",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "ol",
        items: [
          "Pick a seat facing the room—curiosity beats performance.",
          "Order something that needs two hands; phones are a last resort.",
          "Tip like you’ll return even if you won’t—cities remember.",
          "If someone stares, they’re envying your appetite, not judging it.",
          "Bring a tiny notebook; one line of eavesdropping beats a feed.",
          "Avoid peak Friday unless you love chaos as garnish.",
          "Sit at the bar when you want conversation on your terms.",
          "Chew slowly; solitude isn’t a race.",
          "Pay cash once in a while—time travel for your wallet.",
          "Walk home: digestion likes motion, pride likes air.",
        ],
      },
      { t: "p", text: "Eating alone isn’t lonely if you choose the chair." },
    ),
  },
  {
    title: "The Elevator That Remembered Everyone's Shoes",
    slug: "the-elevator-that-remembered-everyones-shoes",
    excerpt: "A building superstition becomes a love story between floors.",
    categoryKey: "fiction",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "It didn’t have a camera—just a brushed steel soul that knew scuff marks the way some people know handwriting.",
      },
      {
        t: "p",
        text: "When two strangers wore the same sneakers a week apart, the elevator hummed a half-step higher. Residents called it coincidence. The building called it continuity.",
      },
    ),
  },
  {
    title: "Why Your Brain Tags Songs as 'Summer'",
    slug: "why-your-brain-tags-songs-as-summer",
    excerpt: "Episodic memory, car windows, and the chorus that isn’t about heat—it’s about permission.",
    categoryKey: "science",
    authorName: "Sam Okonkwo",
    lines: L(
      {
        t: "p",
        text: "Neuroscience calls it context-dependent recall. Your heart calls it the mixtape from the lake trip when you still believed tan lines were a personality.",
      },
      {
        t: "p",
        text: "BPM matters, but novelty matters more—summer is when schedules loosen enough for music to attach.",
      },
    ),
  },
  {
    title: "The Parade Route Nobody Uses Anymore",
    slug: "the-parade-route-nobody-uses-anymore",
    excerpt: "Confetti ghosts, chalk outlines of joy, and a city rehearsing its own memory.",
    categoryKey: "culture",
    authorName: "Riley Park",
    lines: L(
      {
        t: "p",
        text: "The banners fray, but the turns stay muscle memory for anyone who marched as a kid with a plastic flute and real pride.",
      },
      {
        t: "p",
        text: "Tradition isn’t repetition—it’s proof the past left a groove.",
      },
    ),
  },
  {
    title: "Open Letter to the Person Who Stole My Bike Seat",
    slug: "open-letter-bike-seat-thief",
    excerpt: "A civic prayer for thieves with bad taste and worse Allen keys.",
    categoryKey: "opinion",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "p",
        text: "You didn’t take mobility—you took a Tuesday. I hope the seat pinched you exactly once, enough to reconsider your life but not enough to hospitalize you.",
      },
      {
        t: "p",
        text: "Cities run on borrowed trust. You’re a walking overdraft fee with legs.",
      },
    ),
  },
  {
    title: "Remote Work and the Death of the Water Cooler Myth",
    slug: "remote-work-death-water-cooler-myth",
    excerpt: "We never loved the cooler—we loved sanctioned procrastination with cups.",
    categoryKey: "tech",
    authorName: "Sam Okonkwo",
    lines: L(
      {
        t: "p",
        text: "Slack is the cooler now—worse hydration, same gossip potential. Culture didn’t vanish; it got searchable.",
      },
      {
        t: "p",
        text: "The job isn’t where you stand. It’s what you ship—and whether your team trusts you when the green dot lies.",
      },
    ),
  },
  {
    title: "The Harbor Light That Wasn't for Boats",
    slug: "the-harbor-light-that-wasnt-for-boats",
    excerpt: "Fishermen told stories; teenagers told lies; the beam kept counting both.",
    categoryKey: "fiction",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "It swept the pier on a timer older than the town’s incorporation. Locals swore it blinked when someone told the truth too loudly.",
      },
      {
        t: "p",
        text: "I don’t believe in haunted lights. I believe in communities that need a witness.",
      },
    ),
  },
  {
    title: "How to Pack for a Trip You Haven't Booked",
    slug: "how-to-pack-trip-not-booked",
    excerpt: "A soft bag, a hard budget, and permission to dream on layaway.",
    categoryKey: "travel",
    authorName: "Riley Park",
    lines: L(
      { t: "ul", items: ["Passport in the drawer, not the fantasy.", "One good jacket—weather is a philosophy.", "Chargers, meds, dignity."] },
      {
        t: "p",
        text: "Packing early isn’t jinx—it’s rehearsal. Hope likes a zipper that works.",
      },
    ),
  },
  {
    title: "The Museum of Almost",
    slug: "the-museum-of-almost",
    excerpt: "Exhibits include: the grant we nearly won, the kiss interrupted by a phone, the novel’s first perfect sentence—then nothing.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "p",
        text: "Failure gets a bad rap. Almost is where skill meets luck and luck spills the drink.",
      },
      {
        t: "p",
        text: "Visit quietly. Don’t touch the glass—some almosts still sting.",
      },
    ),
  },
  {
    title: "Cooking for One Without Performing Sadness",
    slug: "cooking-for-one-without-performing-sadness",
    excerpt: "Skillet meals, loud music, and the end of the ‘table for two’ apology tour.",
    categoryKey: "lifestyle",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "You’re not a rom-com montage missing a co-star. You’re a person feeding a body that carried you through the week.",
      },
      {
        t: "p",
        text: "Use the good olive oil. The audience is you—and you’re notoriously forgiving when butter is involved.",
      },
    ),
  },
  {
    title: "The Algorithm That Liked You Too Much",
    slug: "the-algorithm-that-liked-you-too-much",
    excerpt: "When recommendations get clingy—comfort becomes a cage of thumbnails.",
    categoryKey: "tech",
    authorName: "Sam Okonkwo",
    lines: L(
      {
        t: "p",
        text: "Platforms confuse engagement with affection. You lingered on a breakup video; now the feed stages daily interventions.",
      },
      {
        t: "p",
        text: "Reset ruthlessly: new accounts, old hobbies, random Wikipedia rabbitholes—anything that breaks the mirror.",
      },
    ),
  },
  {
    title: "Winter Swimming for Cowards",
    slug: "winter-swimming-for-cowards",
    excerpt: "Toes first, swear words, hot chocolate as religion—an honest guide for temperate souls.",
    categoryKey: "guides",
    authorName: "Riley Park",
    lines: L(
      {
        t: "ol",
        items: [
          "Find a club with a lifeguard and a sense of humor.",
          "Neoprene if you must; pride if you dare.",
          "Thirty seconds counts—don’t let athletes steal your victory lap.",
        ],
      },
      { t: "p", text: "Cold water doesn’t care about your narrative arc. That’s the point." },
    ),
  },
  {
    title: "Stars You Can See From a Parking Lot",
    slug: "stars-you-can-see-from-a-parking-lot",
    excerpt: "Orion doesn’t need a national park—just a burned-out streetlamp and patience.",
    categoryKey: "science",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "Light pollution is a thief, not a wall. Betelgeuse still punches through haze if you let your eyes brew darkness for ten minutes.",
      },
      {
        t: "p",
        text: "Astronomy is partly leaving your phone in the car. The sky rewards rude guests who stop scrolling.",
      },
    ),
  },
  {
    title: "The Last Voicemail You Saved",
    slug: "the-last-voicemail-you-saved",
    excerpt: "Storage full, heart fuller—who we keep on tape when we can’t keep in time.",
    categoryKey: "fiction",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "p",
        text: "It’s twelve seconds of background noise that means everything—dishes clinking, a TV guessing Jeopardy!, someone saying drive safe in a voice you can’t duplicate.",
      },
      {
        t: "p",
        text: "You don’t replay it for information. You replay it to remember you were loved in mono.",
      },
    ),
  },
  {
    title: "After the 2026 Oscars: When the Room Chose the Angry, Beautiful Argument",
    slug: "after-the-2026-oscars-angry-beautiful-argument",
    excerpt:
      "Paul Thomas Anderson’s “One Battle After Another” took Best Picture at the 98th Academy Awards—while Ryan Coogler’s “Sinners” proved genre still owns the cultural weather. Here’s what the split says about the movies we argue over in line for coffee.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: L(
      {
        t: "p",
        text: "Every Oscar season pretends to crown “the best.” What it really does is freeze-frame an argument: what kind of story deserves the biggest microphone right now. In 2026, the microphone didn’t go to comfort—it went to friction, spectacle, and directors who refused to whisper.",
      },
      {
        t: "h2",
        text: "Two kinds of thunder",
      },
      {
        t: "p",
        text: "On one side: a sprawling, furiously intelligent drama about revolution, inheritance, and the cost of believing the world can still change—carried by a cast willing to look exhausted on screen. On the other: a vampire epic that treated genre as a pressure cooker—scary, sexy, and unapologetically theatrical.",
      },
      {
        t: "p",
        text: "They aren’t opposites. They’re siblings. Both films ask whether style is a luxury or a weapon. Both understand that “entertainment” isn’t the opposite of “ideas”—it’s how ideas sneak past your defenses when your guard is down.",
      },
      { t: "hr" },
      {
        t: "h2",
        text: "Why this mattered beyond the monologue jokes",
      },
      {
        t: "p",
        text: "Voters didn’t just reward craft—they rewarded nerve. In a year when algorithms flatten everything into the same 42-minute comfort loop, the winners that broke through had edges. You could disagree with them and still feel something in your chest on the walk to the car.",
      },
      {
        t: "quote",
        lines: [
          "A great Oscar night isn’t when your favorite wins. It’s when the industry admits it still wants to be dangerous.",
        ],
      },
      {
        t: "p",
        text: "If you missed the show, you didn’t miss the point. Stream the speeches later—but watch the films first. The conversation isn’t about trophies; it’s about what we’re willing to stare at in the dark.",
      },
    ),
  },
  {
    title: "April 2026’s Streaming Avalanche: How to Survive 150+ Premieres Without Losing Your Weekend",
    slug: "april-2026-streaming-avalanche-survival-guide",
    excerpt:
      "Final seasons, animated spinoffs, revivals, and prestige drops land the same month—here’s a sane way to choose what gets your eyes and what gets a polite skip.",
    categoryKey: "guides",
    authorName: "Riley Park",
    lines: L(
      {
        t: "p",
        text: "April isn’t a month anymore—it’s a menu written in all caps. Streaming platforms are stacking premieres and finales like planes on a runway: superhero epilogues, animated tangents, long-awaited revivals, and the kind of dark comedy that arrives with a trailer that lies just enough to hook you.",
      },
      {
        t: "h2",
        text: "Rule 1: Pick a lane, not a leaderboard",
      },
      {
        t: "p",
        text: "You cannot watch everything. Anyone claiming they will is either unemployed or lying. Choose one “big water-cooler” show, one comfort rewatch, and one wild card—something odd enough that if you hate it, you’ll at least have an opinion.",
      },
      {
        t: "h2",
        text: "Rule 2: Beware the finale fatigue",
      },
      {
        t: "p",
        text: "Final seasons are emotional blackmail. They know you’ve invested years. That doesn’t mean every ending earns a binge—sometimes the healthiest move is two episodes, water, sleep, and a return when you’re not trying to process your entire personality through a fictional city.",
      },
      {
        t: "h2",
        text: "Rule 3: Protect your attention like money",
      },
      {
        t: "ul",
        items: [
          "Turn off autoplay before it turns you into a hostage.",
          "Delete the app that opens when you’re bored—not when you’re ready.",
          "If a show needs three episodes to “get good,” negotiate: episode three is the audition; episode four is the contract.",
        ],
      },
      {
        t: "p",
        text: "The goal isn’t purity. It’s walking into May with a few stories you actually remember—not a blur of thumbnails and regret.",
      },
    ),
  },
  {
    title: "Coachella 2026: Heat, Headliners, and Why the Desert Still Sells Out",
    slug: "coachella-2026-heat-headliners-desert-still-sells-out",
    excerpt:
      "The festival’s 25th anniversary lineup mixes pop superstars and legacy acts—and passes vanished fast. Here’s what the feed can’t replicate about live music in Indio.",
    categoryKey: "culture",
    authorName: "Mara Chen",
    lines: L(
      {
        t: "p",
        text: "A music festival in 2026 is half sound and half signal. You go for the bass you feel in your ribs, yes—but you also go because being there means you were part of the weekend the internet couldn’t shut up about. Coachella’s latest slate is a case study in that double hunger: global pop, Latin megastars, legacy rock and electronic heroes, and enough newcomers to keep the discovery myth alive.",
      },
      {
        t: "h2",
        text: "The economics of FOMO",
      },
      {
        t: "p",
        text: "When passes sell out fast, it’s not only hype—it’s scarcity engineered by demand, weather, and the simple fact that bodies can’t scale like streams. The secondary market becomes a referendum on how badly you need to say you were there when the chorus hit.",
      },
      {
        t: "h2",
        text: "What doesn’t fit on a clip",
      },
      {
        t: "p",
        text: "Phones will always flatten a festival into vertical clips. But heat, dust, stranger kindness, bad cell service, and that one song you hear live for the first time—these don’t compress. They’re why people still migrate to the desert even when couch culture is cheaper.",
      },
      {
        t: "quote",
        lines: [
          "Festivals sell tickets. What they really rent you is temporary citizenship in a city that only exists for two weekends.",
        ],
      },
      {
        t: "p",
        text: "If you’re watching from home, you’re not late—you’re just in a different show. Drink water, wear sunscreen if you go, and remember: the best lineup is the one you can enjoy without turning your bank account into a cautionary tale.",
      },
    ),
  },
  ...ARTICLE_SEEDS_EXTRA_30,
];
