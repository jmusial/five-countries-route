"use client";

import { useEffect } from "react";
import { Accordion } from "./accordion";
import { Carousel } from "./carousel";

const RWGPS_EMBED =
  "https://ridewithgps.com/embeds?type=route&id=53945831&privacy_code=I7MD2VPfqaEuqrhEyPue9ZchCgi69Ys7&metricUnits=true&sampleGraph=true";

/* ───────── route stats ───────── */
const STATS = [
  { value: "821", unit: "km", label: "Total Distance" },
  { value: "~4,400", unit: "m", label: "Elevation Gain" },
  { value: "14", unit: "days", label: "Trip Duration" },
  { value: "10", unit: "", label: "Riding Days" },
  { value: "5", unit: "", label: "Countries" },
];

/* ───────── highlights ───────── */
const HIGHLIGHTS = [
  {
    title: "Carinthian Lakes",
    desc: "Day 1 ends at the warm Klopeiner See \u2014 a gem of southern Austrian Carinthia. Ringed by villages and forest, it\u2019s one of the warmest natural lakes in the Alps. A perfect reward for the first day out of Villach.",
    color: "from-sky-500 to-blue-700",
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/28/2827znoehw4s11h9dhiema1353v9aecob-p175675252-full/17b2ac8c940?width=3360&crop=false&q=70",
    icon: "\uD83C\uDF0A",
  },
  {
    title: "Pohorje Massif",
    desc: "The crux of the whole trip. Day 3 climbs the forested Pohorje ridge to 566\u202Fm \u2014 the highest point on the route \u2014 before a long descent into Maribor. It cannot be routed around, and it doesn\u2019t need to be: the views are worth every metre.",
    color: "from-emerald-700 to-teal-900",
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/1l/1l6cpqjv3grzqq24rg52we8kx3v9adfih-p175675232-full/17b2ac82100?width=3360&crop=false&q=70",
    icon: "\u26F0\uFE0F",
  },
  {
    title: "Maribor & the Old Vine",
    desc: "Slovenia\u2019s second city is home to the world\u2019s oldest living grapevine \u2014 over 400 years old, Guinness-certified, still producing wine. The Lent riverside quarter, city castle, and excellent Styrian wine make the rest day here an easy sell.",
    color: "from-purple-700 to-grape-900",
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/1p/1pr0jf9czl9vhbowmw3a2zkkd3v9b8dxs-p175685147-full/17b2ade2b0a?width=3360&crop=false&q=70",
    icon: "\uD83C\uDF77",
  },
  {
    title: "Ptuj & Varaždin",
    desc: "Slovenia\u2019s oldest city (hilltop castle above the Drava, Roman foundations) followed immediately by Croatia\u2019s perfectly-preserved Baroque city nicknamed the \u201CCroatian Vienna\u201D. Two unmissable stops in a single day.",
    color: "from-amber-600 to-orange-800",
    image:
      "https://d2exd72xrrp1s7.cloudfront.net/www/g8/g8nf8qurzche1v25xxubqoeb43v9a0gb4-p175671324-full/17b2abee3c2?width=1680&crop=false&q=80",
    icon: "\uD83C\uDFF0",
  },
  {
    title: "Lake Balaton",
    desc: "Europe\u2019s largest warm-water lake \u2014 nearly 80\u202Fkm long. Days 5 and 6 follow the entire southern shore from Balatonszentgy\u00F6rgy to Si\u00F3fok. Flat, fast cycling with the lake always on your left and medieval Keszthely to explore along the way.",
    color: "from-cyan-500 to-blue-700",
    image:
      "https://cyclingholidayscroatia.com/_next/image?url=https%3A%2F%2Fcdn.world-discovery.com%2F43309%2FParenzana_high-res_vertical-44.jpg&w=3840&q=75",
    icon: "\uD83C\uDF05",
  },
  {
    title: "Budapest & the Danube Bend",
    desc: "Arrive in Budapest with time for the Chain Bridge and Parliament at dusk. After a rest day of thermal baths and ruin bars, Day 8 follows the Danube Bend north \u2014 one of Central Europe\u2019s most scenic stretches \u2014 to Esztergom\u2019s towering basilica on the Slovak border.",
    color: "from-rose-600 to-red-800",
    image:
      "https://epicroadrides.com/wp-content/uploads/2024/05/EuroVelo-8-cycling-Adriatic-Coast-IMG_9142.jpg",
    icon: "\uD83C\uDFDB\uFE0F",
  },
];

/* ───────── itinerary ───────── */
const ITINERARY = [
  {
    day: "Travel",
    date: "24 May",
    title: "Home \u2192 Villach",
    desc: "Arrival day. Villach is the start \u2014 a well-connected rail hub in southern Austria. Direct ICE/EC from Munich (~4h15m); from Krak\u00F3w take EC to Vienna then Railjet to Villach (~9\u00bdh). Assemble bike, rest.",
    distance: "Travel day",
    stay: "Villach",
    icon: "\uD83D\uDE82",
  },
  {
    day: "Day 1",
    date: "25 May",
    title: "Villach \u2192 Klagenfurt \u2192 St Kanzian am Klopeiner See",
    desc: "Gentle opener through the Carinthian heartland. Roll east from Villach to Klagenfurt (caf\u00E9 stop on Neuer Platz), then south through undulating hills to the warm Klopeiner See \u2014 a Carinthian lake ringed by villages.",
    distance: "65 km \u2191 396 m",
    stay: "St Kanzian am Klopeiner See",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 2",
    date: "26 May",
    title: "St Kanzian \u2192 Prevalje \u2192 Vuzenica",
    desc: "A step up in difficulty. The route threads through the M\u017Ea valley into Slovenia, climbing steadily through the old mining towns of Prevalje and Muta before easing into the Drava valley.",
    distance: "60 km \u2191 559 m",
    stay: "Vuzenica",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 3",
    date: "27 May",
    title: "Vuzenica \u2192 Lovrenc na Pohorju \u2192 Maribor",
    desc: "Shortest day, hardest climbing. The route ascends the Pohorje massif \u2014 the forested ridge defining this corner of Slovenia \u2014 reaching 566\u202Fm before a long descent into Maribor. The crux of the whole trip.",
    distance: "51 km \u2191 782 m",
    stay: "Maribor",
    icon: "\u26F0\uFE0F",
  },
  {
    day: "Rest Day",
    date: "28 May",
    title: "Maribor",
    desc: "The Old Vine House holds the world\u2019s oldest living grapevine (400+ years, Guinness-certified). Lent riverside quarter, city castle, and excellent Styrian wine. Optional flat spin along the Drava riverbank.",
    distance: "Rest day",
    stay: "Maribor",
    icon: "\uD83C\uDF77",
  },
  {
    day: "Day 4",
    date: "29 May",
    title: "Maribor \u2192 Ptuj \u2192 Vara\u017Edin \u2192 \u010Cakovec",
    desc: "Ptuj is Slovenia\u2019s oldest city \u2014 hilltop castle above the Drava with Roman foundations. Cross into Croatia at Vara\u017Edin, the perfectly-preserved Baroque city nicknamed the \u201CCroatian Vienna\u201D. Continue to \u010Cakovec at the junction of three countries.",
    distance: "86 km \u2191 325 m",
    stay: "\u010Cakovec",
    icon: "\uD83C\uDFF0",
  },
  {
    day: "Day 5",
    date: "30 May",
    title: "\u010Cakovec \u2192 Nagykanizsa \u2192 Balatonszentgy\u00F6rgy",
    desc: "The longest day, but almost entirely flat Pannonian plain. Cross into Hungary at Letenye. Nagykanizsa is a good midpoint stop. The day\u2019s reward: the first view of Lake Balaton \u2014 Europe\u2019s largest warm-water lake \u2014 at Balatonszentgy\u00F6rgy.",
    distance: "110 km \u2191 444 m",
    stay: "Balatonszentgy\u00F6rgy",
    icon: "\uD83C\uDF0A",
  },
  {
    day: "Day 6",
    date: "31 May",
    title: "Balatonszentgy\u00F6rgy \u2192 Keszthely \u2192 Si\u00F3fok \u2192 Sz\u00E9kesfeh\u00E9rv\u00E1r",
    desc: "Long but flat. Ride the entire southern Balaton shore: Keszthely (Festetics Palace) then Si\u00F3fok, Hungary\u2019s lively summer resort capital. Leave the lake at Si\u00F3fok and push north through low Transdanubian hills to Sz\u00E9kesfeh\u00E9rv\u00E1r, the royal coronation city of medieval Hungary.",
    distance: "119 km \u2191 390 m",
    stay: "Sz\u00E9kesfeh\u00E9rv\u00E1r",
    icon: "\uD83C\uDF05",
  },
  {
    day: "Day 7",
    date: "1 Jun",
    title: "Sz\u00E9kesfeh\u00E9rv\u00E1r \u2192 Budapest",
    desc: "The hilliest stretch since the Pohorje. Rolling countryside leads to the descent toward the Danube and Budapest\u2019s unmistakable skyline. Arrive with time to see the Chain Bridge and Parliament lit at dusk.",
    distance: "86 km \u2191 754 m",
    stay: "Budapest",
    icon: "\uD83C\uDFDB\uFE0F",
  },
  {
    day: "Rest Day",
    date: "2 Jun",
    title: "Budapest",
    desc: "Heroes\u2019 Square, Great Market Hall, a soak in Sz\u00E9chenyi or Gell\u00E9rt thermal baths. Ruin bars in the Jewish Quarter. Cross to Buda for the Castle District and panoramic Danube views.",
    distance: "Rest day",
    stay: "Budapest",
    icon: "\uD83D\uDEC0",
  },
  {
    day: "Day 8",
    date: "3 Jun",
    title: "Budapest \u2192 Esztergom",
    desc: "Follow the Danube Bend north \u2014 one of Central Europe\u2019s most scenic stretches. The river curves dramatically between forested hills. Esztergom\u2019s enormous basilica (Hungary\u2019s largest church) crowns the hilltop above the Slovak border bridge.",
    distance: "87 km \u2191 316 m",
    stay: "Esztergom",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 9",
    date: "4 Jun",
    title: "Esztergom \u2192 Kom\u00E1rno \u2192 \u017Eitn\u00FD ostrov (Bod\u00EDky)",
    desc: "Flat Danube cycle paths all day. Cross into Slovakia at Kom\u00E1rno \u2014 a divided city where Hungarian Kom\u00E1rom and Slovak Kom\u00E1rno face each other across the river. Enter \u017Eitn\u00FD ostrov (Rye Island), the largest river island in Central Europe, woven with quiet cycling paths and orchards.",
    distance: "98 km \u2191 260 m",
    stay: "Bod\u00EDky / \u017Eitn\u00FD ostrov",
    icon: "\uD83D\uDEB2",
  },
  {
    day: "Day 10",
    date: "5 Jun",
    title: "\u017Eitn\u00FD ostrov \u2192 \u0160amor\u00EDn \u2192 Bratislava",
    desc: "A short, flat, triumphal finish. Cross the last stretch of Rye Island to \u0160amor\u00EDn, then follow the Danube embankment into Bratislava. The Slovak capital\u2019s old town and castle appear above the river. 821\u202Fkm done.",
    distance: "59 km \u2191 140 m",
    stay: "Bratislava",
    icon: "\uD83C\uDFC1",
  },
  {
    day: "Return",
    date: "6 Jun",
    title: "Bratislava \u2192 Home",
    desc: "Depart from Bratislava hl. st. EC/Railjet to Vienna (~1h), then connections onward \u2014 Munich (~3h30m), Krak\u00F3w (~5h45m via Vienna), or Berlin (~9h). Bratislava station is 5 minutes from the finish.",
    distance: "Travel day",
    stay: "Home",
    icon: "\uD83D\uDE82",
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
    image:
      "https://epicroadrides.com/wp-content/uploads/2024/05/EuroVelo-8-cycling-Adriatic-Coast-IMG_9142.jpg",
  },
  {
    image:
      "https://epicroadrides.com/wp-content/uploads/2024/05/EuroVelo-8-cycling-Adriatic-Coast-IMG_9110.jpg",
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
            24 May &mdash; 6 June 2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
            The Poor Man&apos;s
            <br />
            <span className="text-emerald-400">Slovenia</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
            Villach to Bratislava &mdash; Carinthian lakes, Slovenia&apos;s
            Pohorje massif, baroque Varaždin, all of Lake Balaton, Budapest
            thermal baths, and the Danube Bend to the Slovak capital. Five
            countries, 821&nbsp;km, 10 riding days.
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

      {/* ══════ WHY THIS ROUTE ══════ */}
      <section className="fade-section py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Why This Route?
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Five countries, zero backtracking, and nearly all the hard climbing
            done in the first three days. Start in Austrian Carinthia, tackle
            the forested Pohorje massif into Maribor, then cross baroque Croatia
            at Varaždin and ride two glorious flat days along the entire
            southern shore of Lake Balaton. Roll into Budapest for a rest day of
            thermal baths and ruin bars, follow the dramatic Danube Bend north
            past Esztergom&apos;s hilltop basilica, and finish through the
            cycling paradise of Žitný ostrov (Rye Island) into Bratislava.
            Late&nbsp;May means long days, warm weather, and lake season just
            beginning.
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
            Villach to Bratislava across five countries. Interactive map with
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
              title="The Poor Man's Slovenia route"
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
            Day-by-Day Itinerary
          </h2>
          <p className="fade-section text-gray-500 text-center text-lg mb-12 md:mb-16 max-w-2xl mx-auto">
            10 riding days + 2 rest days &mdash; real beds and hot showers
            every night. Nearly all climbing in the first three days; flat
            Pannonian plains and Danube cycle paths for the rest.
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
                  "Road or gravel bike. The opening section (Days 1\u20133) has ~1,700\u202Fm of climbing across 176\u202Fkm; the remaining 645\u202Fkm are Pannonian plain and Danube cycle paths. 28\u201332\u202Fmm tires are fine from Day 4 onward.",
              },
              {
                title: "Getting There & Back",
                emoji: "\uD83D\uDE82",
                content:
                  "Direct ICE/EC Munich\u2009\u2192\u2009Villach (~4h15m). From Krak\u00F3w: EC to Vienna then Railjet (~9\u00bdh). Return from Bratislava: EC/Railjet to Vienna (~1h) then onward. Bike reservation mandatory on all international trains (~\u20AC10\u201315/leg). Book early \u2014 bike spaces are limited.",
              },
              {
                title: "Weather (Late May)",
                emoji: "\u2600\uFE0F",
                content:
                  "Warm days (20\u201325\u00B0C), cool mornings in the Carinthian hills. Lake Balaton starts warming up. Pack a light rain jacket and arm warmers for the Pohorje descent on Day 3.",
              },
              {
                title: "Budget Estimate",
                emoji: "\uD83D\uDCB0",
                content:
                  "Trains ~\u20AC80\u2013150 return (bike reservation extra). Accommodation ~\u20AC35\u201360/night (cheaper in Hungary and Slovakia). Food ~\u20AC20\u201330/day. Total roughly \u20AC900\u20131,200 per person for the full trip.",
              },
              {
                title: "Money & Currency",
                emoji: "\uD83D\uDCB3",
                content:
                  "EUR throughout except Hungary (HUF). Carry HUF cash for Hungary \u2014 card acceptance on rural cycling routes can be patchy. ATMs available in all town centres along the route.",
              },
              {
                title: "Navigation",
                emoji: "\uD83D\uDDFA\uFE0F",
                content:
                  "TCX route file available for Garmin/Wahoo. Well-signed EuroVelo paths along the Danube and Balaton shore. Good mobile coverage throughout. Offline maps (OsmAnd / Maps.me) recommended for the Pohorje section.",
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
        <div className="absolute inset-0 bg-linear-to-br from-emerald-900 via-teal-800 to-cyan-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.3),transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            So&hellip; are we doing this?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
            821&nbsp;km across five countries. Forested mountain climbs, wine in
            Maribor, baroque city stops, two days on Lake Balaton, Budapest
            thermal baths, and a triumphal finish into Bratislava along the
            Danube. Real beds every night. Let&apos;s make it happen.
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

      {/* ══════ TRAIN CONNECTIONS ══════ */}
      <section className="fade-section bg-stone-100 py-20 md:py-28 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Train Connections
          </h2>
          <p className="text-gray-500 text-center text-lg mb-12 max-w-2xl mx-auto">
            Start in Villach (24&nbsp;May) &mdash; End in Bratislava
            (6&nbsp;Jun). Bike reservation mandatory on all international trains
            (~&euro;10&ndash;15/leg). Book well in advance.
          </p>
          <div className="flex flex-col gap-4">
            <Accordion title="From / To Berlin (~8–9h each way)">
              <div className="text-gray-600 text-sm leading-relaxed space-y-2 p-2">
                <p>
                  <strong>Outbound:</strong> ICE Berlin &rarr; Munich (~4h) +
                  direct ICE/EC Munich &rarr; Villach. 1 change in Munich
                  (30&ndash;45&nbsp;min).
                </p>
                <p>
                  <strong>Return:</strong> EC/Railjet Bratislava &rarr; Vienna
                  (~1h) + Railjet Vienna &rarr; Munich (~3h30m) + ICE Munich
                  &rarr; Berlin (~4h).
                </p>
                <p className="text-gray-400">
                  Note: Vienna&ndash;Berlin via Passau is disrupted Jun&ndash;Dec
                  2026 &mdash; route via Munich is reliable year-round. Book via{" "}
                  <strong>int.bahn.de</strong> or <strong>oebb.at</strong>.
                </p>
              </div>
            </Accordion>
            <Accordion title="From / To Munich (~4–4.5h each way)">
              <div className="text-gray-600 text-sm leading-relaxed space-y-2 p-2">
                <p>
                  <strong>Outbound:</strong> Direct ICE or EC Munich &rarr;
                  Villach via Salzburg (~4h15m). Multiple departures daily.
                </p>
                <p>
                  <strong>Return:</strong> EC/Railjet Bratislava &rarr; Vienna
                  (~1h) + direct Railjet Vienna &rarr; Munich (~3h30m).
                </p>
                <p className="text-gray-400">
                  Easiest connection. New 2026 timetable adds ICE services
                  Munich&ndash;Villach via the Koralmbahn. Book Sparschiene
                  fares early on <strong>oebb.at</strong>.
                </p>
              </div>
            </Accordion>
            <Accordion title="From / To Kraków (~9–10h each way)">
              <div className="text-gray-600 text-sm leading-relaxed space-y-2 p-2">
                <p>
                  <strong>Outbound:</strong> EC Krak&oacute;w &rarr; Vienna
                  (~5h45m) + Railjet Vienna &rarr; Villach (~3h30m). Allow
                  60&ndash;90&nbsp;min for the Wien Hbf transfer.
                </p>
                <p>
                  <strong>Return:</strong> EC/Railjet Bratislava &rarr; Vienna
                  (~1h) + direct EC Vienna &rarr; Krak&oacute;w (~5h45m).
                </p>
                <p className="text-gray-400">
                  3 direct EC Krak&oacute;w&ndash;Vienna daily from 2026. Book
                  PKP Intercity + &Ouml;BB tickets separately. Bike reservation
                  mandatory on all legs.
                </p>
              </div>
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
          <p className="text-white/30">
            Vibed with excitement for the trip ahead
          </p>
        </div>
      </footer>
    </main>
  );
}
