"use client";

import { useEffect } from "react";
import { Accordion } from "./accordion";
import { Carousel } from "./carousel";

const RWGPS_EMBED =
  "https://ridewithgps.com/embeds?type=route&id=53945831&privacy_code=I7MD2VPfqaEuqrhEyPue9ZchCgi69Ys7&metricUnits=true&sampleGraph=true";

/* ───────── route stats ───────── */
const STATS = [
  { value: "~550", unit: "km", label: "Total Distance" },
  { value: "~8,500", unit: "m", label: "Elevation Gain" },
  { value: "14", unit: "days", label: "Trip Duration" },
  { value: "3", unit: "", label: "Countries" },
  { value: "6.5", unit: "/10", label: "Difficulty" },
];

/* ───────── highlights ───────── */
const HIGHLIGHTS = [
  {
    title: "Vr\u0161i\u010D Pass & Julian Alps",
    desc: "Slovenia\u2019s highest road pass at 1,611m \u2014 50 hairpin turns of cobbled WWI-era road. The Russian Chapel, limestone spires, and the epic descent into the So\u010Da Valley.",
    color: "from-slate-600 to-blue-800",
    image:
      "https://sloveniacyclingholidays.com/_next/image?url=https%3A%2F%2Fcdn.world-discovery.com%2F23422%2FThe-switchbacks-of-Vrsic-Pass-scaled.webp&w=3840&q=75",
    icon: "\u26F0\uFE0F",
  },
  {
    title: "So\u010Da Valley",
    desc: "Follow the emerald So\u010Da River through gorges, past WWI sites at Kobarid, and alongside turquoise swimming holes. The water colour has to be seen to be believed.",
    color: "from-teal-500 to-cyan-700",
    image:
      "https://exploreslovenia.si/wp-content/uploads/2021/05/Explore_Slovenia_Soca-Valley-MTB-Tour_mainphoto_299.jpg",
    icon: "\uD83C\uDF0A",
  },
  {
    title: "Trieste",
    desc: "A detour into Italy\u2019s coffee capital. Habsburg architecture, world-class seafood, and the Adriatic waterfront. The perfect rest-day city between mountains and coast.",
    color: "from-amber-600 to-red-700",
    image:
      "https://lp-cms-production.imgix.net/2019-06/a3cb50844fe6b51b20a1338218152b61-borgo-teresiano.jpg?sharp=10&vib=20&w=1200&w=600&h=400",
    icon: "\u2615",
  },
  {
    title: "Parenzana Trail",
    desc: "A converted narrow-gauge railway from the Austro-Hungarian era. Car-free gravel through tunnels, over viaducts, and along the Istrian hills \u2014 one of Europe\u2019s best rail trails.",
    color: "from-stone-500 to-stone-700",
    icon: "\uD83D\uDEE4\uFE0F",
    image:
      "https://www.eurotours-villas.com/uploads/imgcache/article-main/articles/1748264871_1629.jpg",
  },
  {
    title: "Slovenian & Croatian Coast",
    desc: "Venetian towns of Piran and Koper, salt pans at Se\u010Dovlje, then the EV8 EuroVelo route along the Adriatic into Croatia. Swim stops guaranteed.",
    color: "from-sky-500 to-blue-700",
    icon: "\uD83C\uDFD6\uFE0F",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4QcLG-OuW_avoiz7hTW5l8gJqMWoKIvW6gQ&s",
  },
  {
    title: "Rijeka",
    desc: "Finish in Croatia\u2019s gritty port city \u2014 2020 European Capital of Culture. Harbour-side bars, the Korzo promenade, and the satisfaction of having pedalled across three countries.",
    color: "from-orange-600 to-rose-700",
    icon: "\uD83C\uDFC1",
    image:
      "https://www.thetimes.com/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F094146a2-224b-11ea-81b4-b78674dd3224.jpg?crop=2667%2C1500%2C0%2C0",
  },
];

/* ───────── itinerary ───────── */
const ITINERARY = [
  {
    day: "Day 1",
    date: "May 25",
    title: "Arrival in Ljubljana",
    desc: "Fly in, assemble bikes, explore the charming capital. Dragon Bridge, riverside caf\u00E9s, Metelkova art district.",
    distance: "Rest day",
    stay: "Ljubljana",
    icon: "\u2708",
  },
  {
    day: "Day 2",
    date: "May 26",
    title: "Ljubljana \u2192 \u0160kofja Loka",
    desc: "Ride out through the Ljubljana Marshes on quiet paths into medieval \u0160kofja Loka \u2014 one of the oldest towns in Slovenia.",
    distance: "~55 km",
    stay: "\u0160kofja Loka",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 3",
    date: "May 27",
    title: "\u0160kofja Loka \u2192 Lake Bled",
    desc: "Forest trails and rolling hills to the iconic Lake Bled. Swim, rent a pletna boat to the island, or hike up to Bled Castle.",
    distance: "~50 km",
    stay: "Bled",
    icon: "\uD83C\uDFD4\uFE0F",
  },
  {
    day: "Day 4",
    date: "May 28",
    title: "Lake Bled \u2192 Kranjska Gora",
    desc: "Through the Radovna Valley with Julian Alps views all around. Arrive in the ski town of Kranjska Gora at the foot of Vr\u0161i\u010D Pass.",
    distance: "~45 km",
    stay: "Kranjska Gora",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 5",
    date: "May 29",
    title: "Vr\u0161i\u010D Pass \u2192 Bovec",
    desc: "The big climbing day! 50 hairpin bends on the historic WWI cobbled road. Russian Chapel stop. Epic descent into the So\u010Da Valley.",
    distance: "~50 km / 1,000m\u2191",
    stay: "Bovec",
    icon: "\u26F0\uFE0F",
  },
  {
    day: "Day 6",
    date: "May 30",
    title: "Rest Day in Bovec",
    desc: "Recover those legs! Bovec is the adventure capital \u2014 rafting on the So\u010Da, canyoning, zip-lining, or just soaking in the emerald pools.",
    distance: "Rest day",
    stay: "Bovec",
    icon: "\uD83C\uDFCA",
  },
  {
    day: "Day 7",
    date: "May 31",
    title: "Bovec \u2192 Kobarid \u2192 Tolmin",
    desc: "Follow the emerald So\u010Da downstream. Kobarid WWI museum, Napoleon Bridge, and a swim in the Tolmin Gorge.",
    distance: "~55 km",
    stay: "Tolmin",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 8",
    date: "Jun 1",
    title: "Tolmin \u2192 Gori\u0161ka Brda",
    desc: "Climb into Slovenia\u2019s Tuscany \u2014 rolling wine hills of Brda with panoramic views. First glimpse of the Adriatic. Wine tasting at a local estate.",
    distance: "~50 km",
    stay: "Gori\u0161ka Brda",
    icon: "\uD83C\uDF77",
  },
  {
    day: "Day 9",
    date: "Jun 2",
    title: "Gori\u0161ka Brda \u2192 Trieste",
    desc: "Cross into Italy via Nova Gorica. Descend to the Adriatic and arrive in Trieste \u2014 espresso, Habsburg grandeur, and seafood on the waterfront.",
    distance: "~55 km",
    stay: "Trieste",
    icon: "\u2615",
  },
  {
    day: "Day 10",
    date: "Jun 3",
    title: "Rest Day in Trieste",
    desc: "Rest day in Italy\u2019s coffee capital. Miramare Castle, Piazza Unit\u00E0, Canal Grande, aperitivo by the sea. Restock and recharge.",
    distance: "Rest day",
    stay: "Trieste",
    icon: "\uD83C\uDFDB\uFE0F",
  },
  {
    day: "Day 11",
    date: "Jun 4",
    title: "Trieste \u2192 Parenzana \u2192 Koper",
    desc: "Pick up the Parenzana rail trail heading south \u2014 car-free gravel through old railway tunnels and over viaducts. Arrive on the Slovenian coast at Koper.",
    distance: "~45 km",
    stay: "Koper",
    icon: "\uD83D\uDEE4\uFE0F",
  },
  {
    day: "Day 12",
    date: "Jun 5",
    title: "Koper \u2192 Piran \u2192 EV8 coast",
    desc: "Ride the Slovenian coast: Izola, Strunjan cliffs, the Venetian gem of Piran. Continue past Se\u010Dovlje salt pans and cross into Croatia at Plovanija.",
    distance: "~50 km",
    stay: "Umag",
    icon: "\uD83C\uDFD6\uFE0F",
  },
  {
    day: "Day 13",
    date: "Jun 6",
    title: "Umag \u2192 EV8 \u2192 Opatija",
    desc: "EuroVelo 8 along the Croatian Adriatic. Through Novigrad and along the Kvarner coast to the elegant seaside town of Opatija. Last big ride.",
    distance: "~75 km",
    stay: "Opatija",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 14",
    date: "Jun 7",
    title: "Opatija \u2192 Rijeka \u2192 Departure",
    desc: "Short final spin along the coast to Rijeka. Coffee on the Korzo, pack the bikes, and fly home from Croatia with legs of steel.",
    distance: "~15 km",
    stay: "Rijeka",
    icon: "\uD83C\uDFC1",
  },
];

const CAROUSEL_IMAGES = [
  {
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/28/2827znoehw4s11h9dhiema1353v9aecob-p175675252-full/17b2ac8c940?width=3360&crop=false&q=70",
  },
  {
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/1l/1l6cpqjv3grzqq24rg52we8kx3v9adfih-p175675232-full/17b2ac82100?width=3360&crop=false&q=70",
  },
  {
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/1p/1pr0jf9czl9vhbowmw3a2zkkd3v9b8dxs-p175685147-full/17b2ade2b0a?width=3360&crop=false&q=70",
  },
  {
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/g8/g8nf8qurzche1v25xxubqoeb43v9a0gb4-p175671324-full/17b2abee3c2?width=1680&crop=false&q=80",
  },
  {
    image:
      "https://cyclingholidayscroatia.com/_next/image?url=https%3A%2F%2Fcdn.world-discovery.com%2F43309%2FParenzana_high-res_vertical-44.jpg&w=3840&q=75",
  },
  {
    image:
      "https://www.thenaturaladventure.com/wp-content/uploads/2022/11/cycling-the-parenzana-trail-2.jpg",
  },
  {
    image: "https://epicroadrides.com/wp-content/uploads/2024/05/EuroVelo-8-cycling-Adriatic-Coast-IMG_9142.jpg",
  },
  {
    image: "https://epicroadrides.com/wp-content/uploads/2024/05/EuroVelo-8-cycling-Adriatic-Coast-IMG_9110.jpg",
  },
];

/* ────────────── component ────────────── */

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* ══════ HERO ══════ */}
      <section
        className="hero-section relative flex items-end min-h-screen"
        style={{
          backgroundImage:
            "url('https://d2exd72xrrp1s7.cloudfront.net/www/1e/1egfo8mnlin0knrtbr51tka53v9aq0pc-p175678407-full/17b2ad11817?width=3360&crop=false&q=70')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 md:pb-24 w-full">
          <p className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Late May &mdash; Early June 2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
            Let&apos;s Ride
            <br />
            <span className="text-emerald-400">Slovenia</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
            A 2-week ride from Ljubljana to Rijeka &mdash; Julian Alps, emerald
            So&#x10D;a Valley, Trieste, the Parenzana rail trail, and the
            Adriatic coast. Three countries, ~550&nbsp;km, one unforgettable
            trip.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#itinerary"
              className="bg-emerald-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-emerald-600 transition-colors"
            >
              See the Itinerary
            </a>
            <a
              href="#route"
              className="border border-white/40 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              View the Route Map &darr;
            </a>
          </div>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className="bg-emerald-900 text-white py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="stat-item"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold">
                {s.value}
                <span className="text-emerald-400 text-lg">{s.unit}</span>
              </div>
              <div className="text-white/60 text-sm mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ WHY SLOVENIA ══════ */}
      <section className="fade-section py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why This Route?
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Three countries, zero backtracking. Start in Ljubljana, cross the
            Julian Alps over the legendary Vr&scaron;i&#x10D; Pass, follow the
            emerald So&#x10D;a River to the sea, detour into Trieste for Italian
            coffee and seafood, then ride the Parenzana rail trail and EV8 coast
            through Slovenia and Croatia to Rijeka. The mix of alpine gravel,
            historic trails, and coastal cycling is hard to beat anywhere in
            Europe &mdash; and late May means warm days, long light, and passes
            freshly open.
          </p>
        </div>
      </section>

      {/* ══════ ROUTE MAP EMBED ══════ */}
      <section
        id="route"
        className="fade-section bg-stone-100 py-20 md:py-28 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            The Route
          </h2>
          <p className="text-gray-500 text-center text-lg mb-10 max-w-2xl mx-auto">
            Ljubljana to Rijeka across three countries. Interactive map with
            elevation profile &mdash; zoom in, click around.
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <iframe
              src={RWGPS_EMBED}
              style={{
                width: "1px",
                minWidth: "100%",
                height: "700px",
                border: "none",
              }}
              scrolling="no"
              title="Slovenia West Loop route on RideWithGPS"
            />
          </div>
          <p className="text-center mt-4">
            <a
              href="https://ridewithgps.com/routes/53945831?privacy_code=I7MD2VPfqaEuqrhEyPue9ZchCgi69Ys7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline text-sm"
            >
              Open full route on RideWithGPS &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ══════ HIGHLIGHTS ══════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="fade-section text-3xl md:text-5xl font-bold text-center mb-16">
            Route Highlights
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                className="fade-section group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={h.image}
                  alt={h.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2">{h.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CAROUSEL ══════ */}
      <section className="fade-section">
        <Carousel images={CAROUSEL_IMAGES} />
      </section>

      {/* ══════ ITINERARY ══════ */}
      <section
        id="itinerary"
        className="bg-stone-100 py-20 md:py-28 px-4 md:px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="fade-section text-3xl md:text-5xl font-bold text-center mb-4">
            14-Day Itinerary
          </h2>
          <p className="fade-section text-gray-500 text-center text-lg mb-12 md:mb-16 max-w-2xl mx-auto">
            B&amp;B stays every night &mdash; real beds, hot showers, local
            breakfast. Two rest days built in for adventures (or recovery).
          </p>

          <div className="timeline-line space-y-6 md:space-y-8">
            {ITINERARY.map((day, i) => (
              <div
                key={i}
                className={`fade-section relative flex flex-col md:flex-row items-start ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border-[3px] md:border-4 border-emerald-500 rounded-full flex items-center justify-center text-sm md:text-lg z-10 shadow-md">
                  {day.icon}
                </div>

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 w-[calc(100%-3rem)] md:w-full ${
                    i % 2 === 0 ? "md:mr-[52%] md:pr-8" : "md:ml-[52%] md:pl-8"
                  }`}
                >
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                      <span className="text-emerald-600 font-mono text-xs md:text-sm font-bold">
                        {day.day}
                      </span>
                      <span className="text-gray-400 text-xs md:text-sm">
                        {day.date}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2">
                      {day.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-2.5 md:mb-3">
                      {day.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3 text-xs">
                      <span className="bg-emerald-50 text-emerald-800 px-2.5 md:px-3 py-1 rounded-full">
                        {day.distance}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 px-2.5 md:px-3 py-1 rounded-full">
                        {day.stay}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PRACTICAL INFO ══════ */}
      <section className="fade-section py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            The Practical Stuff
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Bike Setup",
                emoji: "\uD83D\uDEB2",
                content:
                  "Gravel bike with 38mm+ tires (hardtail MTB works too). Mostly gravel roads and doubletrack with some tarmac. 80% paved.",
              },
              {
                title: "Accommodation",
                emoji: "\uD83C\uDFE0",
                content:
                  "B&Bs and guesthouses all the way. Pre-bookable on Booking.com. Expect \u20AC40\u201370/night for a double room with breakfast. No camping gear needed!",
              },
              {
                title: "Weather (Late May)",
                emoji: "\u2600\uFE0F",
                content:
                  "Warm days (20\u201325\u00B0C), cool mornings in the Alps. Passes freshly open for the season. Pack a light rain jacket and arm warmers for descents.",
              },
              {
                title: "Budget Estimate",
                emoji: "\uD83D\uDCB0",
                content:
                  "Getting there ~\u20AC100\u2013200 (trains through Vienna). Accommodation ~\u20AC700\u2013900. Food ~\u20AC25\u201335/day. Total roughly \u20AC1,200\u20131,500 per person for 2 weeks.",
              },
              {
                title: "Food & Drink",
                emoji: "\uD83C\uDF55",
                content:
                  "Resupply easy \u2014 towns with shops every 20\u201330 km. Must-try: \u0161truklji, potica, So\u010Da trout, and local wines (Rebula, Teran).",
              },
              {
                title: "Navigation",
                emoji: "\uD83D\uDDFA\uFE0F",
                content:
                  "Full GPX route on RideWithGPS. Works great with Wahoo / Garmin or phone. Good cell coverage throughout Slovenia.",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-stone-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3">
                  <span className="mr-2">{card.emoji}</span>
                  {card.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.3),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            So&hellip; are we doing this?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
            550&nbsp;km across three countries. Two weeks of alpine passes,
            emerald rivers, Italian espresso, coastal sunsets, and Croatian
            seafood. Real beds every night. Let&apos;s make it happen.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://ridewithgps.com/routes/53945831?privacy_code=I7MD2VPfqaEuqrhEyPue9ZchCgi69Ys7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 text-white font-semibold px-10 py-4 rounded-full text-lg hover:bg-emerald-600 transition-colors"
            >
              View the Full Route
            </a>
            <a
              href="#itinerary"
              className="border border-white/40 text-white px-10 py-4 rounded-full text-lg hover:bg-white/10 transition-colors"
            >
              Review Itinerary &uarr;
            </a>
          </div>
        </div>
      </section>

      {/* ══════ ALTERNATIVE VARIANTS ══════ */}
      <section className="fade-section bg-stone-100 py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Alternative Variants
          </h2>
          <div className="flex flex-col gap-4">
            <Accordion title="Variant 2 - 440km - 8k up/down">
              <iframe
                src="https://ridewithgps.com/embeds?type=route&id=53947958&privacy_code=7wZMZEJJkh5CeTPhTUzDdWOjvAVKcAWd&metricUnits=true&sampleGraph=true"
                style={{
                  width: "1px",
                  minWidth: "100%",
                  height: "700px",
                  border: "none",
                }}
                scrolling="no"
                title="Variant 3 route on RideWithGPS"
              />
            </Accordion>
            <Accordion title="Variant 3 - 540km - 8k up/down">
              <iframe
                src="https://ridewithgps.com/routes/53947982"
                style={{
                  width: "1px",
                  minWidth: "100%",
                  height: "700px",
                  border: "none",
                }}
                scrolling="no"
                title="Variant 3 route on RideWithGPS"
              />
            </Accordion>
            <Accordion title="Variant 4 - 380km - 6k up/down">
              <iframe
                src="https://ridewithgps.com/routes/53947893"
                style={{
                  width: "1px",
                  minWidth: "100%",
                  height: "700px",
                  border: "none",
                }}
                scrolling="no"
                title="Variant 3 route on RideWithGPS"
              />
            </Accordion>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-gray-900 text-white/60 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center text-sm space-y-4">
          <p>
            Route data on{" "}
            <a
              href="https://ridewithgps.com/routes/53945831?privacy_code=I7MD2VPfqaEuqrhEyPue9ZchCgi69Ys7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              RideWithGPS
            </a>
            .
          </p>
          <p>
            Picures borrowed from{" "}
            <a
              href="https://www.komoot.com/collection/1347997/bikepacking-auf-dem-slovenia-west-loop-soca-variante"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Slovenia West Loop (Soča Variation) – Bikepacking
            </a>
            .
          </p>
          <p className="text-white/30">
            Vibed with excitement for the trip ahead
          </p>
        </div>
      </footer>
    </main>
  );
}
