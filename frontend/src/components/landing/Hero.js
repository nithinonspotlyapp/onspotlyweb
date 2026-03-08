import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, MapPin, Camera, ArrowRight } from "lucide-react";

const creators = [
  { cx: 280, cy: 130, dx: 8, dy: -5, dur: 5, eta: "2 min" },
  { cx: 120, cy: 170, dx: -6, dy: 7, dur: 6, eta: "4 min" },
  { cx: 310, cy: 270, dx: 5, dy: 6, dur: 4.5, eta: "3 min" },
  { cx: 100, cy: 300, dx: -8, dy: -4, dur: 5.5, eta: "5 min" },
  { cx: 250, cy: 340, dx: 7, dy: -6, dur: 6.5, eta: "1 min" },
  { cx: 330, cy: 190, dx: -5, dy: 8, dur: 5.2, eta: null },
];

function NearbyCreatorsMap() {
  return (
    <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[460px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Subtle grid */}
        {[80, 160, 240, 320].map((v) => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="400" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            <line x1="0" y1={v} x2="400" y2={v} stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Road paths */}
        <path d="M 0 200 Q 100 190 200 200 Q 300 210 400 200" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
        <path d="M 200 0 Q 190 100 200 200 Q 210 300 200 400" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="12" />
        <path d="M 50 50 Q 150 180 350 350" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
        <path d="M 350 50 Q 250 180 50 350" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />

        {/* Radar pulse */}
        <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(124,58,237,0.12)" strokeWidth="0.8" className="animate-city-pulse" />
        <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="0.6" className="animate-city-pulse" style={{ animationDelay: "0.7s" }} />
        <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(124,58,237,0.04)" strokeWidth="0.5" className="animate-city-pulse" style={{ animationDelay: "1.4s" }} />

        {/* Creator pins */}
        {creators.map((c, i) => (
          <motion.g
            key={i}
            animate={{ x: [0, c.dx, -c.dx / 2, 0], y: [0, c.dy, -c.dy / 2, 0] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx={c.cx} cy={c.cy} r="14" fill="rgba(244,114,182,0.08)" />
            <circle cx={c.cx} cy={c.cy} r="7" fill="#1a1a2e" stroke="#F472B6" strokeWidth="1.5" />
            <circle cx={c.cx} cy={c.cy} r="2.5" fill="#F472B6" />
            {c.eta && (
              <g>
                <rect x={c.cx + 10} y={c.cy - 8} width="28" height="14" rx="4" fill="rgba(10,10,10,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <text x={c.cx + 24} y={c.cy + 1} textAnchor="middle" fill="#A78BFA" fontSize="7" fontWeight="600" fontFamily="Manrope, sans-serif">
                  {c.eta}
                </text>
              </g>
            )}
          </motion.g>
        ))}

        {/* User location center */}
        <circle cx="200" cy="200" r="16" fill="rgba(124,58,237,0.15)" />
        <circle cx="200" cy="200" r="9" fill="#7C3AED" />
        <circle cx="200" cy="200" r="4" fill="white" />

        {/* Center label */}
        <g>
          <rect x="170" y="220" width="60" height="16" rx="5" fill="rgba(10,10,10,0.85)" stroke="rgba(124,58,237,0.3)" strokeWidth="0.5" />
          <text x="200" y="231" textAnchor="middle" fill="#A78BFA" fontSize="7.5" fontWeight="700" fontFamily="Manrope, sans-serif">You</text>
        </g>
      </svg>

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[9px] sm:text-[10px] text-zinc-400 tracking-wider uppercase font-medium whitespace-nowrap">
        6 creators nearby
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const flowRef = useRef(null);
  const flowInView = useInView(flowRef, { once: true });
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (flowInView) {
      const timers = [0, 1, 2].map((i) =>
        setTimeout(() => setActiveStep(i), 400 + i * 600)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [flowInView]);

  const steps = [
    { icon: MapPin, label: "Book", color: "text-violet-400", bg: "bg-violet-500/15", border: "border-violet-500/30" },
    { icon: Camera, label: "Shoot", color: "text-pink-400", bg: "bg-pink-500/15", border: "border-pink-500/30" },
    { icon: Zap, label: "Delivered in 30 min", color: "text-cyan-400", bg: "bg-cyan-500/15", border: "border-cyan-500/30" },
  ];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12"
    >
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 hero-glow-secondary pointer-events-none" />

      <div className="absolute top-32 right-[10%] w-20 h-20 rounded-2xl bg-violet-500/5 border border-violet-500/10 animate-float hidden lg:block" />
      <div className="absolute top-[60%] left-[5%] w-14 h-14 rounded-full bg-pink-500/5 border border-pink-500/10 animate-float-slow hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span
                data-testid="hero-badge"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-6 sm:mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                App Launching Soon
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              data-testid="hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="gradient-text">Book nearby shooters like an Uber cab.</span>
              <br />
              <span className="text-white">We Shoot. We Edit. We Deliver</span>{" "}
              <span className="gradient-text">— All within 30 minutes.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              data-testid="hero-tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed mb-3 max-w-lg italic"
            >
              A New Era of Instant Content Creation is Coming.
            </motion.p>

            {/* Supporting text */}
            <motion.p
              data-testid="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm text-zinc-500 leading-relaxed mb-8 max-w-md"
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
              className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-10"
            >
              <button
                data-testid="hero-join-waitlist-btn"
                onClick={() => navigate("/join")}
                className="btn-gradient text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm flex items-center justify-center gap-2 group"
              >
                Join Early Access Waitlist
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                data-testid="hero-become-shooter-btn"
                onClick={() => navigate("/become-shooter")}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Camera size={16} />
                Become a Shooter
              </button>
            </motion.div>

            {/* Animated flow - SINGLE HORIZONTAL LINE */}
            <motion.div
              ref={flowRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-2 sm:gap-3"
              data-testid="hero-flow"
            >
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.3 }}
                    animate={activeStep >= i ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full ${step.bg} border ${step.border}`}
                  >
                    <step.icon size={12} className={`${step.color} sm:w-[14px] sm:h-[14px]`} />
                    <span className={`text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap ${activeStep >= i ? "text-white" : "text-zinc-600"} transition-colors duration-300`}>
                      {step.label}
                    </span>
                  </motion.div>
                  {i < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={activeStep > i ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.4 }}
                      className="w-3 sm:w-5 md:w-6 h-0.5 bg-gradient-to-r from-zinc-600 to-zinc-700 origin-left flex-shrink-0"
                    />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Animated Map — VISIBLE ON ALL SCREENS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-first lg:order-last"
          >
            <NearbyCreatorsMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
