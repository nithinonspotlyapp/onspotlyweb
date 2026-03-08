import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Star } from "lucide-react";

const packages = [
  {
    name: "1 Hour Shoot",
    price: "$49",
    reels: "1 Edited Reel Delivered",
    popular: false,
  },
  {
    name: "3 Hour Shoot",
    price: "$129",
    reels: "2 Edited Reels Delivered",
    popular: true,
  },
  {
    name: "5 Hour Shoot",
    price: "$199",
    reels: "3 Edited Reels Delivered",
    popular: false,
  },
];

const included = [
  "Shot on Latest iPhone",
  "Fast Delivery (30 minutes post shoot)",
  "Trained & Certified Shooters",
  "Onspotly Branding Included",
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section
      id="pricing"
      data-testid="pricing-section"
      className="py-24 md:py-32 relative section-glow-left"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-amber-400 mb-4 block">
            Packages
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Choose the package that fits your needs. No hidden fees, ever.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              data-testid={`pricing-card-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl p-8 ${
                pkg.popular
                  ? "glass-card-glow md:scale-105"
                  : "glass-card"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    <Star size={10} className="fill-violet-400 text-violet-400" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3
                  className="text-lg font-semibold text-white mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{pkg.price}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mb-8">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-4">
                  What's Included
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-white font-medium">
                    <Check size={16} className="text-violet-400 mt-0.5 flex-shrink-0" />
                    {pkg.reels}
                  </li>
                  {included.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-zinc-400"
                    >
                      <Check size={16} className="text-zinc-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                data-testid={`pricing-book-btn-${i}`}
                onClick={() => navigate("/join")}
                className={`w-full py-3 rounded-full text-sm font-semibold transition-colors transition-opacity duration-200 ${
                  pkg.popular
                    ? "btn-gradient text-white"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                Book on App (Launching Soon)
              </button>
            </motion.div>
          ))}
        </div>

        {/* More packages note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-zinc-500 mt-10"
        >
          More packages and custom pricing coming soon.
        </motion.p>
      </div>
    </section>
  );
}
