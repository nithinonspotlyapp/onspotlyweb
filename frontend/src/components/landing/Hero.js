import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, MapPin, Camera, ArrowRight } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background glows */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 hero-glow-secondary pointer-events-none" />

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-[10%] w-20 h-20 rounded-2xl bg-violet-500/5 border border-violet-500/10 animate-float hidden lg:block" />
      <div className="absolute top-[60%] left-[5%] w-14 h-14 rounded-full bg-pink-500/5 border border-pink-500/10 animate-float-slow hidden lg:block" />
      <div className="absolute bottom-32 right-[20%] w-10 h-10 rounded-lg bg-cyan-500/5 border border-cyan-500/10 animate-float-delayed hidden lg:block" />

      {/* Animated route visualization */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-3 opacity-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-violet-400" />
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-violet-500/40 to-pink-500/40" />
          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
            <Camera size={12} className="text-pink-400" />
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-pink-500/40 to-cyan-500/40" />
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Zap size={12} className="text-cyan-400" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              data-testid="hero-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              App Launching Soon
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            data-testid="hero-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            A New Era of{" "}
            <span className="gradient-text">Instant Content Creation</span>{" "}
            is Coming.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            data-testid="hero-subheading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-zinc-300 leading-relaxed mb-4 max-w-2xl"
          >
            Book nearby shooters like an Uber cab.
            <br />
            <span className="text-white font-medium">
              We Shoot. We Edit. We Deliver
            </span>{" "}
            — All within 30 minutes.
          </motion.p>

          {/* Supporting text */}
          <motion.p
            data-testid="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base text-zinc-500 leading-relaxed mb-10 max-w-xl"
          >
            Onspotly connects you with trained creators near your location to
            capture high-quality photos and reels instantly for events,
            businesses, and creators.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              data-testid="hero-join-waitlist-btn"
              onClick={() => navigate("/join")}
              className="btn-gradient text-white font-semibold px-8 py-3.5 rounded-full text-sm flex items-center justify-center gap-2 group"
            >
              Join Early Access Waitlist
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
            <button
              data-testid="hero-become-shooter-btn"
              onClick={() => navigate("/become-shooter")}
              className="px-8 py-3.5 rounded-full text-sm font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors transition-[background-color] duration-200 flex items-center justify-center gap-2"
            >
              <Camera size={16} />
              Become a Shooter
            </button>
          </motion.div>

          {/* Mini workflow visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex items-center gap-4 text-xs text-zinc-500"
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-violet-400" />
              <span>Book</span>
            </div>
            <div className="w-8 h-px bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Camera size={14} className="text-pink-400" />
              <span>Shoot</span>
            </div>
            <div className="w-8 h-px bg-zinc-700" />
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-cyan-400" />
              <span>Delivered in 30 min</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Phone mockup on right side - desktop only */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="phone-mockup w-[240px] h-[480px] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1616727836012-ff5c4efd8249?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHw0fHxwaG90b2dyYXBoZXIlMjBldmVudCUyMGZhc2hpb24lMjBydW53YXklMjBkYXJrJTIwbGlnaHRpbmd8ZW58MHx8fHwxNzcyOTkwMTAxfDA&ixlib=rb-4.1.0&q=85"
            alt="Creator shooting content"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Now Shooting</div>
            <div className="text-xs text-white font-medium">Event Coverage</div>
            <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
