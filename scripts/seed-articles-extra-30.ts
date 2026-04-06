import type { ArticleSeed } from "./seed-articles-types";
import type { LineSpec } from "./seed-articles-types";

const SECTION_H2 = [
  "Where this story actually begins",
  "What shifted while nobody was looking",
  "The fight in the margins",
  "What we owe ourselves now",
] as const;

/** ~90–140 words per block — varied templates so 28 blocks ≠ duplicate feel. */
function longParagraph(kw: string, slugWords: string, s: number, p: number): string {
  const i = (s * 7 + p) % 14;
  const templates = [
    () =>
      `When editors ask for takes on ${kw}, they usually want a headline. What readers actually carry home is slower: a habit, a fear, a small relief. This stretch of the piece—anchored in ${slugWords}—refuses the single-sentence verdict. Instead it tracks how ${kw} shows up in kitchens, commutes, and the half-read tabs we leave open at midnight.`,
    () =>
      `The second thing to know about ${kw} is that institutions love to measure it and people love to narrate it. The gap between those two impulses is where culture actually happens. Someone forwards an article without reading it; someone else saves it like evidence. Neither person is wrong—they're just answering different questions about ${kw}.`,
    () =>
      `If you've ever argued about ${kw} at a dinner table, you already understand that "facts" are often loyalty tests in disguise. This section isn't trying to win that argument. It's trying to widen the room: enough oxygen for curiosity, enough friction for honesty, and enough humility to admit that ${kw} will look different in five years anyway.`,
    () =>
      `Money talks, but ${kw} talks back. Subscriptions, rent, childcare, travel—every line item is a moral claim about what deserves protection. Readers who feel seen by that sentence aren't imagining things. Policy is personal when your calendar is full of tradeoffs and your group chat is full of jokes that aren't really jokes.`,
    () =>
      `There is also the version of ${kw} that thrives in anonymity: comment sections, reviews, ratings, the soft violence of averages. We pretend those formats are neutral. They're not. They train us to think in scores, which is a brutal way to treat anything that matters. This article keeps returning to ${slugWords} because specificity is an antidote to numbness.`,
    () =>
      `And then there is time—how ${kw} changes as you age, as your body changes, as your patience changes. What felt urgent at twenty-two can feel theatrical at forty, not because you became cynical, but because you learned which alarms were real. That's not wisdom; it's scar tissue with better branding.`,
    () =>
      `We should also name the role of luck: being in the right city, knowing the right person, not getting sick the week everything mattered. ${kw} doesn't erase luck; it collides with it. If this piece has a bias, it's toward readers who did everything "right" and still got squeezed—because their stories are the ones policy forgets and novels remember.`,
    () =>
      `Culture moves faster than law, which moves faster than infrastructure. ${kw} sits in that lag: new rituals before new rules, new shame before new support. You can feel the whiplash in industries that still talk like it's 2014 while their customers live in 2026. The question isn't whether change is coming; it's who gets paid to pretend it isn't.`,
    () =>
      `Some people will read about ${kw} and want tactics—scripts, frameworks, five bullet points. Others want permission to feel tired without being told they're broken. This section tries to hold both without pretending they're the same hunger. If you want tactics, steal them from the margins here; if you want permission, consider it granted, quietly.`,
    () =>
      `There is also the public story and the private one. ${kw} is covered like weather in the culture pages—sunny, stormy, unprecedented—while individuals navigate it like weather in real life: inconvenient, sometimes dangerous, rarely symbolic. ${slugWords} is a reminder that the private story doesn't need to be pretty to be true.`,
    () =>
      `Technology keeps promising to "solve" ${kw}, which is how you know it's complicated. Solutions love scale; humans love specificity. The best interventions often look boring: a better shift schedule, a shorter form, a friend who shows up with food. Grand narratives are fun to read; small repairs are fun to live—if we let them count.`,
    () =>
      `We can't talk about ${kw} without talking about shame—who gets mocked for caring too much, who gets mocked for not caring enough. Shame is a crowd-control tool. This piece tries to refuse it, not because everyone is innocent, but because shame rarely teaches— it mostly trains silence. Silence makes markets easier and communities thinner.`,
    () =>
      `Finally, remember that ${kw} intersects with geography. What's normal in one neighborhood is exotic in another; what's "common sense" is often just local weather dressed up as universal truth. ${slugWords} travels differently depending on transit, rent, and whether your institutions see you as a constituency or a customer.`,
    () =>
      `If you're still reading, you might be looking for a clean ending. ${kw} doesn't offer many. What it offers is steadier attention: noticing who benefits from confusion, who pays for convenience, and what you want your days to feel like when nobody is applauding. That's not inspiration—it's maintenance. Sometimes maintenance is the most radical thing.`,
  ];
  return templates[i]();
}

function buildFourPageBody(kw: string, slug: string): LineSpec[] {
  const slugWords = slug.replace(/-/g, " ");
  const parts: LineSpec[] = [];
  for (let s = 0; s < 4; s++) {
    parts.push({ t: "h2", text: SECTION_H2[s] });
    for (let p = 0; p < 7; p++) {
      parts.push({ t: "p", text: longParagraph(kw, slugWords, s, p) });
    }
    if (s === 1) {
      parts.push({
        t: "quote",
        lines: [
          `${kw} isn't a trend line—it's a pile of private decisions that statisticians later call "behavior."`,
        ],
      });
    }
    if (s === 2) {
      parts.push({
        t: "ul",
        items: [
          `The version of ${kw} you perform for strangers`,
          `The version you negotiate with family`,
          `The version you secretly hope isn't heritable`,
        ],
      });
      parts.push({
        t: "p",
        text: `Lists lie by pretending to be complete. Still, naming three faces of ${kw} can loosen the knot—especially when your brain wants a villain and reality only offers systems.`,
      });
    }
    if (s < 3) {
      parts.push({ t: "hr" });
    }
  }
  return parts;
}

/** Thirty long-form pieces (4 pages each: 3 HR page breaks → three “Next” pages after the first). */
export const ARTICLE_SEEDS_EXTRA_30: ArticleSeed[] = [
  {
    title: "The Quiet Math of Working From the Kitchen Table",
    slug: "quiet-math-working-from-kitchen-table",
    excerpt:
      "Remote work didn’t erase offices—it relocated theater. Four movements on boundaries, shame, and what ‘flexibility’ costs when your living room is also your paycheck.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("remote work and blurred boundaries", "quiet-math-working-from-kitchen-table"),
  },
  {
    title: "Why the Neighborhood Café Became Everyone’s Second Office",
    slug: "neighborhood-cafe-second-office",
    excerpt:
      "A four-part look at laptops, lattes, and the unspoken rent we pay in guilt—plus who actually profits when ‘third place’ becomes a branding slogan.",
    categoryKey: "lifestyle",
    authorName: "Riley Park",
    lines: buildFourPageBody("cafés and third places", "neighborhood-cafe-second-office"),
  },
  {
    title: "Running Clubs, Strava, and the Performance of Being Okay",
    slug: "running-clubs-strava-performance-okay",
    excerpt:
      "From mile splits to mental health—how fitness culture became a public language, and what gets edited out of the feed.",
    categoryKey: "lifestyle",
    authorName: "Mara Chen",
    lines: buildFourPageBody("running culture and public fitness", "running-clubs-strava-performance-okay"),
  },
  {
    title: "The Podcast Industrial Complex Runs on Your Attention Debt",
    slug: "podcast-industrial-complex-attention-debt",
    excerpt:
      "Ads, intimacy, and the illusion of friendship—four movements on why the format rewards length even when your life rewards brevity.",
    categoryKey: "culture",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("podcasts and monetized intimacy", "podcast-industrial-complex-attention-debt"),
  },
  {
    title: "Thrifting Isn’t Cheap Anymore—It’s Complicated",
    slug: "thrifting-isnt-cheap-anymore",
    excerpt:
      "Resellers, rents, and ethics: secondhand fashion stopped being a secret and became an economy. Here’s the long version.",
    categoryKey: "culture",
    authorName: "Riley Park",
    lines: buildFourPageBody("thrifting and resale fashion", "thrifting-isnt-cheap-anymore"),
  },
  {
    title: "Board Games Stopped Being Nerdy—Then Got Expensive",
    slug: "board-games-stopped-being-nerdy",
    excerpt:
      "Tabletop nights, Kickstarter fatigue, and the social hunger that cardboard somehow satisfies better than feeds.",
    categoryKey: "lifestyle",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("board games and tabletop culture", "board-games-stopped-being-nerdy"),
  },
  {
    title: "Plant Parenthood Is a Joke Until You’ve Killed the Same Fern Twice",
    slug: "plant-parenthood-killed-same-fern-twice",
    excerpt:
      "Care, control, and the strange pride of keeping something alive while everything else feels unstable.",
    categoryKey: "lifestyle",
    authorName: "Mara Chen",
    lines: buildFourPageBody("houseplants and domestic care", "plant-parenthood-killed-same-fern-twice"),
  },
  {
    title: "Urban Noise Isn’t Background—It’s Policy",
    slug: "urban-noise-isnt-background-its-policy",
    excerpt:
      "Sirens, construction, and who gets to call silence a luxury. Four movements on ears, sleep, and city power.",
    categoryKey: "opinion",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("urban noise and regulation", "urban-noise-isnt-background-its-policy"),
  },
  {
    title: "Used Bookstores Survived the Internet—Barely",
    slug: "used-bookstores-survived-internet-barely",
    excerpt:
      "Dust, discovery, and the stubborn romance of paper in a world trained to scroll.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("used bookstores and reading culture", "used-bookstores-survived-internet-barely"),
  },
  {
    title: "Museum Fatigue Is Real—and Designers Know It",
    slug: "museum-fatigue-is-real",
    excerpt:
      "Crowds, captions, and the paradox of ‘experience’ when culture competes with naps.",
    categoryKey: "culture",
    authorName: "Riley Park",
    lines: buildFourPageBody("museums and visitor experience", "museum-fatigue-is-real"),
  },
  {
    title: "Stand-Up’s New Problem Isn’t Cancel Culture—It’s Scale",
    slug: "stand-up-new-problem-isnt-cancel-culture-its-scale",
    excerpt:
      "Clips, context collapse, and the difference between a joke in a room and a joke as ammunition online.",
    categoryKey: "opinion",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("stand-up comedy and social media", "stand-up-new-problem-isnt-cancel-culture-its-scale"),
  },
  {
    title: "Spatial Audio Promised Heaven—Vinyl Still Promises Ritual",
    slug: "spatial-audio-heaven-vinyl-ritual",
    excerpt:
      "Listening formats aren’t neutral. Four movements on friction, warmth, and what we call ‘real.’",
    categoryKey: "culture",
    authorName: "Mara Chen",
    lines: buildFourPageBody("spatial audio versus vinyl listening", "spatial-audio-heaven-vinyl-ritual"),
  },
  {
    title: "Newsletter Writers Burn Out Like Everyone Else—Just Publicly",
    slug: "newsletter-writers-burn-out-publicly",
    excerpt:
      "Subscribers, streaks, and the intimacy economy of inbox culture.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("newsletters and creator burnout", "newsletter-writers-burn-out-publicly"),
  },
  {
    title: "Airport Design Is Security Theater With Better Lighting",
    slug: "airport-design-security-theater-lighting",
    excerpt:
      "Queues, carpets, and the emotional tax of moving through spaces built for crowds, not humans.",
    categoryKey: "travel",
    authorName: "Riley Park",
    lines: buildFourPageBody("airport design and passenger stress", "airport-design-security-theater-lighting"),
  },
  {
    title: "Why Your Weather App Knows Your Mood Better Than Your Boss",
    slug: "weather-app-knows-your-mood",
    excerpt:
      "Forecasts, notifications, and the tiny superstitions we outsource to icons and percentages.",
    categoryKey: "tech",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("weather apps and daily ritual", "weather-app-knows-your-mood"),
  },
  {
    title: "Public Pools Closed—Summer Didn’t Get Cheaper",
    slug: "public-pools-closed-summer-not-cheaper",
    excerpt:
      "Heat, access, and the politics of who gets to cool off in public.",
    categoryKey: "opinion",
    authorName: "Mara Chen",
    lines: buildFourPageBody("public pools and municipal cuts", "public-pools-closed-summer-not-cheaper"),
  },
  {
    title: "Zoos in 2026: Conservation, Controversy, and Crowds",
    slug: "zoos-2026-conservation-controversy-crowds",
    excerpt:
      "Ethics, education, and the uncomfortable bargain of wonder behind glass.",
    categoryKey: "science",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("zoos and conservation ethics", "zoos-2026-conservation-controversy-crowds"),
  },
  {
    title: "College Sports TV Money Changed Who the ‘Student’ Is",
    slug: "college-sports-tv-money-student",
    excerpt:
      "Conferences, contracts, and the long shadow of Saturday ratings on Monday classrooms.",
    categoryKey: "opinion",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("college sports media money", "college-sports-tv-money-student"),
  },
  {
    title: "Craft Beer’s Hangover: Saturation and the Search for a Third Place",
    slug: "craft-beer-hangover-saturation-third-place",
    excerpt:
      "Taprooms, trends, and what happens when a culture matures into an industry.",
    categoryKey: "culture",
    authorName: "Riley Park",
    lines: buildFourPageBody("craft beer and taproom culture", "craft-beer-hangover-saturation-third-place"),
  },
  {
    title: "Farmers Markets: Real Farms, Real Lines, Real Class",
    slug: "farmers-markets-real-farms-lines-class",
    excerpt:
      "Access, aesthetics, and the awkward overlap between virtue and price tags.",
    categoryKey: "culture",
    authorName: "Mara Chen",
    lines: buildFourPageBody("farmers markets and food access", "farmers-markets-real-farms-lines-class"),
  },
  {
    title: "Ski Towns Got Instagrammable—and Unlivable for Workers",
    slug: "ski-towns-instagrammable-unlivable-workers",
    excerpt:
      "Seasons, rent, and the hidden labor that keeps powder days possible.",
    categoryKey: "travel",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("ski towns and housing for workers", "ski-towns-instagrammable-unlivable-workers"),
  },
  {
    title: "Beach Towns Sell Paradise—Erosion Sells the Bill",
    slug: "beach-towns-paradise-erosion-bill",
    excerpt:
      "Tourism, climate, and the slow argument between property lines and rising water.",
    categoryKey: "science",
    authorName: "Riley Park",
    lines: buildFourPageBody("coastal tourism and erosion", "beach-towns-paradise-erosion-bill"),
  },
  {
    title: "The Wedding Industry Runs on Hope—and APR",
    slug: "wedding-industry-hope-apr",
    excerpt:
      "Four movements on expectation, family finance, and the performance of forever.",
    categoryKey: "culture",
    authorName: "Mara Chen",
    lines: buildFourPageBody("wedding costs and expectations", "wedding-industry-hope-apr"),
  },
  {
    title: "Therapy Speak Won the Internet—and Lost the Living Room",
    slug: "therapy-speak-internet-lost-living-room",
    excerpt:
      "Boundaries, buzzwords, and what happens when clinical language becomes a social weapon.",
    categoryKey: "opinion",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("therapy language online", "therapy-speak-internet-lost-living-room"),
  },
  {
    title: "Language Apps Teach You Phrases—Not Courage",
    slug: "language-apps-phrases-not-courage",
    excerpt:
      "Streaks, shame, and the gap between recognizing a word and risking a mouth.",
    categoryKey: "guides",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("language learning apps", "language-apps-phrases-not-courage"),
  },
  {
    title: "Credit Card Points Are a Game—The House Still Wins",
    slug: "credit-card-points-game-house-wins",
    excerpt:
      "Rewards, rules, and the fine print that turns ‘free’ travel into a part-time job.",
    categoryKey: "guides",
    authorName: "Riley Park",
    lines: buildFourPageBody("credit card rewards games", "credit-card-points-game-house-wins"),
  },
  {
    title: "Thrift Flippers Aren’t Villains—They’re Symptoms",
    slug: "thrift-flippers-arent-villains-symptoms",
    excerpt:
      "Resale platforms, rent, and who gets blamed when scarcity becomes a side hustle.",
    categoryKey: "opinion",
    authorName: "Mara Chen",
    lines: buildFourPageBody("reselling and thrift flipping", "thrift-flippers-arent-villains-symptoms"),
  },
  {
    title: "Local News Died Quietly—Your Feed Didn’t Notice",
    slug: "local-news-died-quietly-feed-didnt-notice",
    excerpt:
      "Civic holes, national noise, and what democracy loses when nobody covers the school board.",
    categoryKey: "opinion",
    authorName: "Sam Okonkwo",
    lines: buildFourPageBody("local news decline", "local-news-died-quietly-feed-didnt-notice"),
  },
  {
    title: "Phone Bans at Concerts: Finally, or Finally Annoying?",
    slug: "phone-bans-concerts-finally-or-annoying",
    excerpt:
      "Yondr pouches, memories, and the politics of being present when presence is monetized.",
    categoryKey: "culture",
    authorName: "Jordan Ellis",
    lines: buildFourPageBody("concert phone bans", "phone-bans-concerts-finally-or-annoying"),
  },
  {
    title: "Libraries Dropped Fines—and Learned What ‘Free’ Really Means",
    slug: "libraries-dropped-fines-free-means",
    excerpt:
      "Access, accountability, and the quiet revolution of removing punishment from curiosity.",
    categoryKey: "culture",
    authorName: "Riley Park",
    lines: buildFourPageBody("libraries eliminating late fines", "libraries-dropped-fines-free-means"),
  },
];
