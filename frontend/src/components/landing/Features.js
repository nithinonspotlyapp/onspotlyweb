import { motion } from "framer-motion";
import {
  Clock,
  Smartphone,
  Camera,
  DollarSign,
  ArrowRight,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Delivery Speed",
    before: {
      label: "Slow Delivery",
      icon: Clock,
      points: [
        "Weeks or even months to receive final content",
        "Long editing queues",
        "Missed social media opportunities",
      ],
    },
    after: {
      label: "Instant Content Delivery",
      icon: Zap,
      points: [
        "Content edited on-site",
        "Reels delivered within 30 minutes after shoot",
        "Ready to post the same day",
      ],
    },
  },
  {
    title: "Booking Process",
    before: {
      label: "Complicated Booking",
      icon: Clock,
      points: [
        "Search multiple websites",
        "Contact several photographers",
        "Wait for quotes and confirmations",
      ],
    },
    after: {
      label: "Book in Seconds",
      icon: Smartphone,
      points: [
        "Open the app",
        "Select package, location, and time",
        "Nearby creator gets assigned instantly",
      ],
      tagline: "Book a creator as easily as booking a cab.",
    },
  },
  {
    title: "Equipment & Crew",
    before: {
      label: "Heavy Production Setup",
      icon: Camera,
      points: [
        "Large crews of 3-6 people",
        "Expensive cameras and equipment",
        "Complex coordination",
      ],
    },
    after: {
      label: "Lean Mobile Production",
      icon: Smartphone,
      points: [
        "One trained creator",
        "Shot using the latest iPhone",
        "Fast, flexible, and social-media optimized",
      ],
    },
  },
  {
    title: "Pricing",
    before: {
      label: "Unpredictable Costs",
      icon: DollarSign,
      points: [
        "Negotiations and hidden fees",
        "Expensive production budgets",
        "Unclear pricing structure",
      ],
    },
    after: {
      label: "Transparent Pricing",
      icon: DollarSign,
      points: [
        "Fixed package pricing",
        "No hidden costs",
        "Pay only for the time you need",
      ],
    },
  },
];

export default function Features() {
  return (
    <section
      id="features"
      data-testid="features-section"
      className="py-24 md:py-32 relative section-glow-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-cyan-400 mb-4 block">
            Why Onspotly
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Top Features of Onspotly
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Content creation reimagined for the speed of social media. Traditional
            content production is slow, expensive, and complicated. Onspotly
            transforms the entire process into a fast, simple, on-demand
            experience.
          </p>
        </motion.div>

        {/* Before / After header labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-sm font-bold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "Manrope, sans-serif" }}>
                Before Onspotly
              </span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-500/[0.06] border border-violet-500/20">
              <div className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-sm font-bold uppercase tracking-widest gradient-text" style={{ fontFamily: "Manrope, sans-serif" }}>
                After Onspotly
              </span>
            </div>
          </div>
        </motion.div>

        {/* Feature comparisons */}
        <div className="space-y-12 md:space-y-16">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              data-testid={`feature-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Feature title */}
              <h3
                className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-6"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {feat.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Before */}
                <div className="before-card rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <feat.before.icon size={18} className="text-zinc-500" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                        Before
                      </span>
                      <h4 className="text-base font-semibold text-zinc-400">
                        {feat.before.label}
                      </h4>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {feat.before.points.map((p, j) => (
                      <li
                        key={j}
                        className="text-sm text-zinc-500 flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-zinc-700 mt-2 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="after-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <feat.after.icon size={18} className="text-violet-400" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-violet-400 font-medium">
                        Onspotly
                      </span>
                      <h4 className="text-base font-semibold text-white">
                        {feat.after.label}
                      </h4>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {feat.after.points.map((p, j) => (
                      <li
                        key={j}
                        className="text-sm text-zinc-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {feat.after.tagline && (
                    <p className="mt-4 text-xs text-violet-300 italic">
                      {feat.after.tagline}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass-card-glow p-8 md:p-12 text-center"
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            The Future of Content Creation
          </h3>
          <p className="text-lg md:text-xl text-zinc-300 font-medium mb-6">
            Fast. Simple. On Demand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <Zap size={14} className="text-violet-400" />
              Capture moments instantly
            </span>
            <span className="flex items-center gap-2">
              <ArrowRight size={14} className="text-pink-400" />
              Social-ready content in minutes
            </span>
            <span className="flex items-center gap-2">
              <Camera size={14} className="text-cyan-400" />
              We handle the content
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
