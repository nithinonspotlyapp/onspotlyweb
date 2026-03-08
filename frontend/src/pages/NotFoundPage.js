import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div data-testid="not-found-page" className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Animated 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="mb-8"
        >
          <h1
            className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter gradient-text"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            404
          </h1>
        </motion.div>

        {/* Animated glitch line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-px w-32 mx-auto mb-8 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        />

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2
            className="text-xl sm:text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Page Not Found
          </h2>
          <p className="text-sm text-zinc-400 mb-10 max-w-sm mx-auto leading-relaxed">
            Looks like this page doesn't exist or has been moved. Let's get you back on track.
          </p>
        </motion.div>

        {/* Animated buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            data-testid="not-found-home-btn"
            className="btn-gradient text-white font-semibold px-8 py-3 rounded-full text-sm flex items-center gap-2"
          >
            <Home size={14} />
            Back to Home
          </Link>
          <button
            data-testid="not-found-back-btn"
            onClick={() => window.history.back()}
            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-violet-500/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
