import { motion } from "framer-motion";
import { PartyPopper, Store, Users, Briefcase, Heart } from "lucide-react";

const audiences = [
  {
    icon: PartyPopper,
    title: "Last-Minute Personal Events",
    items: ["Birthday parties", "Surprise celebrations", "Gender reveals"],
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Store,
    title: "Small Businesses",
    items: [
      "Restaurants & Cafes",
      "Local brands",
      "Retail shops needing daily reels",
    ],
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Users,
    title: "Social Media Creators",
    items: [
      "Influencers",
      "Content creators needing frequent content",
    ],
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    items: ["Product launches", "Team events", "Business meetings"],
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Heart,
    title: "Behind-the-Scenes Weddings",
    items: [
      "Pre-wedding events",
      "Wedding preparation coverage",
      "Candid behind-the-scenes moments",
    ],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function Audience() {
  return (
    <section
      id="audience"
      data-testid="audience-section"
      className="py-24 md:py-32 relative section-glow-right"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-pink-400 mb-4 block">
            Use Cases
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Who Is Onspotly For
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed">
            Whether it's a birthday party or a product launch, Onspotly has you
            covered.
          </p>
        </motion.div>

        {/* Cards grid - bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              data-testid={`audience-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-8 cursor-default ${
                i === 0 || i === 3 ? "md:col-span-1" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6`}
              >
                <item.icon size={22} className={item.color} />
              </div>
              <h3
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {item.title}
              </h3>
              <ul className="space-y-2">
                {item.items.map((line, j) => (
                  <li
                    key={j}
                    className="text-sm text-zinc-400 flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-zinc-600 mt-2 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
