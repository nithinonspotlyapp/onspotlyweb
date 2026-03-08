import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Globe, ArrowRight } from "lucide-react";

const cities = [
  { name: "Charlotte", state: "NC", cx: 660, cy: 310 },
  { name: "Raleigh", state: "NC", cx: 680, cy: 290 },
  { name: "Austin", state: "TX", cx: 370, cy: 390 },
  { name: "Dallas", state: "TX", cx: 365, cy: 360 },
  { name: "Houston", state: "TX", cx: 400, cy: 410 },
];

const stats = [
  { icon: MapPin, value: "5", label: "Launch Cities" },
  { icon: Globe, value: "2026", label: "Nationwide Network" },
];

const US_OUTLINE = "M 122 65 L 128 98 L 100 118 L 80 155 L 70 200 L 65 240 L 78 280 L 105 318 L 138 330 L 188 335 L 270 342 L 328 358 L 355 395 L 378 420 L 412 412 L 458 392 L 518 378 L 568 370 L 608 375 L 625 415 L 638 450 L 650 480 L 655 460 L 645 420 L 638 385 L 635 360 L 648 335 L 662 318 L 680 300 L 698 282 L 712 260 L 718 242 L 728 215 L 738 192 L 748 165 L 752 142 L 740 132 L 722 148 L 698 168 L 665 172 L 625 162 L 588 155 L 555 148 L 528 150 L 498 148 L 462 138 L 428 128 L 395 115 L 358 102 L 318 90 L 278 78 L 238 70 L 198 65 L 158 62 Z";

export default function USMap() {
  const navigate = useNavigate();
  const [visibleCities, setVisibleCities] = useState([]);
  const [mapDrawn, setMapDrawn] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setMapDrawn(true), 500);
    const timers = cities.map((_, i) =>
      setTimeout(() => {
        setVisibleCities((prev) => [...prev, i]);
      }, 1200 + i * 400)
    );
    return () => {
      clearTimeout(timer1);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      id="launch-cities"
      data-testid="us-map-section"
      className="py-24 md:py-32 relative section-glow-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-violet-400 mb-4 block">
            Our Expansion
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Launching Across the{" "}
            <span className="gradient-text">United States</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Onspotly is building the first on-demand creator network for instant
            content production. We are starting with select cities and expanding
            nationwide.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-8 md:gap-16 mb-16"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <s.icon size={14} className="text-violet-400 mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {s.value}
                </span>
              </div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-3xl mx-auto mb-12 sm:mb-16 px-2 sm:px-0"
        >
          <svg
            viewBox="0 0 820 540"
            className="w-full h-auto"
            data-testid="us-map-svg"
          >
            {/* Map outline */}
            <path
              d={US_OUTLINE}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              strokeLinejoin="round"
              className={mapDrawn ? "animate-draw-path" : ""}
              style={{
                strokeDasharray: 2000,
                strokeDashoffset: mapDrawn ? 0 : 2000,
                transition: "stroke-dashoffset 2s ease-in-out",
              }}
            />

            {/* Expansion dots (faded) */}
            {[
              [300, 200], [420, 220], [550, 280], [480, 300],
              [350, 280], [250, 250], [600, 320], [200, 180],
              [450, 180], [520, 200], [380, 150], [620, 250],
            ].map(([x, y], i) => (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="2"
                fill="rgba(255,255,255,0.05)"
                style={{
                  opacity: mapDrawn ? 1 : 0,
                  transition: `opacity 0.5s ease ${2 + i * 0.2}s`,
                }}
              />
            ))}

            {/* City markers */}
            {cities.map((city, i) => (
              <g key={city.name}>
                {/* Pulse ring */}
                {visibleCities.includes(i) && (
                  <circle
                    cx={city.cx}
                    cy={city.cy}
                    r="12"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="1"
                    opacity="0.4"
                    className="animate-city-pulse"
                  />
                )}
                {/* Glow */}
                {visibleCities.includes(i) && (
                  <circle
                    cx={city.cx}
                    cy={city.cy}
                    r="16"
                    fill="rgba(124, 58, 237, 0.1)"
                    style={{
                      opacity: 1,
                      transition: "opacity 0.5s ease",
                    }}
                  />
                )}
                {/* Main dot */}
                <circle
                  cx={city.cx}
                  cy={city.cy}
                  r="5"
                  fill={visibleCities.includes(i) ? "#7C3AED" : "transparent"}
                  style={{
                    transition: "fill 0.3s ease",
                  }}
                />
                {/* City label */}
                {visibleCities.includes(i) && (
                  <text
                    x={city.cx}
                    y={city.cy - 18}
                    textAnchor="middle"
                    fill="#A78BFA"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Manrope, sans-serif"
                    style={{
                      opacity: 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {city.name}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </motion.div>

        {/* City cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              data-testid={`city-card-${city.name.toLowerCase()}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-5 text-center"
            >
              <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-3">
                <MapPin size={14} className="text-violet-400" />
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {city.name}
              </h4>
              <p className="text-xs text-zinc-500 mb-3">{city.state}</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                Launching Soon
              </span>
            </motion.div>
          ))}
        </div>

        {/* Expansion message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-zinc-500 mb-2">
            Starting with these cities — expanding nationwide.
          </p>
          <p className="text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
            Onspotly plans to launch in major cities across the United States,
            building the largest instant creator network for events, brands, and
            content creators.
          </p>
          <button
            data-testid="map-join-waitlist-btn"
            onClick={() => navigate("/join")}
            className="inline-flex items-center gap-2 btn-gradient text-white font-semibold px-6 py-3 rounded-full text-sm group"
          >
            Join Waitlist for Your City
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
