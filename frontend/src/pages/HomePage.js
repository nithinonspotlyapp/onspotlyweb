import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Camera, DollarSign, MapPin, Users, LayoutList } from "lucide-react";
import Hero from "@/components/landing/Hero";
import Audience from "@/components/landing/Audience";

const exploreLinks = [
  { to: "/how-it-works", icon: LayoutList, title: "How It Works", desc: "7-step process from booking to delivery", color: "text-violet-400", bg: "bg-violet-500/10" },
  { to: "/features", icon: Zap, title: "Features", desc: "See what makes us different", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { to: "/pricing", icon: DollarSign, title: "Pricing", desc: "Simple, transparent packages", color: "text-amber-400", bg: "bg-amber-500/10" },
  { to: "/cities", icon: MapPin, title: "Launch Cities", desc: "Where we're launching first", color: "text-pink-400", bg: "bg-pink-500/10" },
  { to: "/become-shooter", icon: Camera, title: "Become a Creator", desc: "Join our shooter network", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { to: "/join", icon: Users, title: "Join Waitlist", desc: "Get early access to the app", color: "text-violet-400", bg: "bg-violet-500/10" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div data-testid="home-page">
      <Hero />
      <Audience />

      {/* Explore section */}
      <section className="py-24 md:py-32 relative section-glow-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-violet-400 mb-4 block">
              Explore
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Discover Onspotly
            </h2>
            <p className="text-base text-zinc-400">
              Everything you need to know about the platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exploreLinks.map((item, i) => (
              <motion.button
                key={item.to}
                data-testid={`explore-card-${item.to.slice(1)}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => navigate(item.to)}
                className="glass-card p-6 text-left group"
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <h3
                  className="text-base font-semibold text-white mb-1 flex items-center gap-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {item.title}
                  <ArrowRight
                    size={14}
                    className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-transform duration-200"
                  />
                </h3>
                <p className="text-sm text-zinc-500">{item.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
