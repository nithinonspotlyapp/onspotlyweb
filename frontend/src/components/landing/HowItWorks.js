import { motion } from "framer-motion";
import {
  Calendar,
  Zap,
  CheckCircle,
  MapPin,
  Shield,
  Scissors,
  Send,
} from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Book a Shooter",
    desc: "User selects a package, location, date, and time.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Zap,
    title: "AI Matches Nearby Creator",
    desc: "Our system matches the request with trained and vetted shooters nearby.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: CheckCircle,
    title: "Shooter Accepts Booking",
    desc: "The assigned creator confirms the booking and heads to the location.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: MapPin,
    title: "Live Arrival Tracking",
    desc: "Customer can track the shooter's arrival similar to a ride-hailing app.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: "OTP Verified Shoot",
    desc: "Shoot starts and ends with OTP verification for security and transparency.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Scissors,
    title: "On-Spot Editing",
    desc: "Creator edits content instantly on iPhone during or right after shoot.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Send,
    title: "Content Delivered in 30 Minutes",
    desc: "Customer receives edited reels and photos within 30 minutes via the app.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-testid="how-it-works-section"
      className="py-24 md:py-32 relative section-glow-left"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-violet-400 mb-4 block">
            The Process
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            How Onspotly Works
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-lg leading-relaxed">
            From booking to delivery in 7 simple steps. Content creation has
            never been this fast.
          </p>
        </motion.div>

        {/* Route map mini visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-16 overflow-x-auto pb-2"
        >
          {["Book", "Match", "Accept", "Track", "Verify", "Edit", "Deliver"].map(
            (label, i) => (
              <div key={label} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i === 6
                      ? "bg-violet-500/20 text-violet-300"
                      : "bg-white/5 text-zinc-500"
                  }`}
                >
                  {i + 1}
                </div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider hidden sm:inline">
                  {label}
                </span>
                {i < 6 && (
                  <div className="w-6 md:w-10 h-px bg-gradient-to-r from-zinc-700 to-zinc-800" />
                )}
              </div>
            )
          )}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px timeline-line opacity-30" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                data-testid={`step-${i + 1}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-6 md:gap-8 group"
              >
                {/* Step icon */}
                <div
                  className={`relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl ${step.bg} flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors duration-300`}
                >
                  <step.icon size={20} className={step.color} />
                </div>

                {/* Step content */}
                <div className="pt-1 md:pt-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3
                    className="text-lg md:text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
