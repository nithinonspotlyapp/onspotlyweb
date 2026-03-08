import { motion, AnimatePresence } from "framer-motion";
import { Play, Heart, MessageCircle, Share2 } from "lucide-react";

const reels = [
  { bg: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)", user: "@creator_one" },
  { bg: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)", user: "@event_magic" },
  { bg: "linear-gradient(135deg, #F472B6 0%, #EF4444 100%)", user: "@onspotly" },
  { bg: "linear-gradient(135deg, #10B981 0%, #14B8A6 100%)", user: "@reel_studio" },
  { bg: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)", user: "@content_pro" },
];

const REEL_HEIGHT = 300;

export default function ReelTransition({ isActive }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          data-testid="reel-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center"
        >
          {/* Phone frame */}
          <div className="relative w-[160px] h-[300px] rounded-[1.8rem] border-2 border-white/10 overflow-hidden bg-zinc-950"
            style={{ boxShadow: "0 0 60px rgba(124,58,237,0.15)" }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 bg-black rounded-b-xl z-20" />

            {/* Scrolling reels */}
            <motion.div
              className="flex flex-col"
              animate={{
                y: [0, -REEL_HEIGHT, -REEL_HEIGHT * 2, -REEL_HEIGHT * 3],
              }}
              transition={{
                duration: 0.7,
                ease: [0.32, 0, 0.14, 1],
                times: [0, 0.3, 0.65, 1],
              }}
            >
              {reels.map((reel, i) => (
                <div
                  key={i}
                  className="w-[160px] h-[300px] flex-shrink-0 relative"
                  style={{ background: reel.bg }}
                >
                  {/* Play icon center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.12, duration: 0.2 }}
                      className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Play size={14} className="text-white ml-0.5" fill="white" />
                    </motion.div>
                  </div>

                  {/* Side icons */}
                  <div className="absolute right-2.5 bottom-20 flex flex-col gap-3.5">
                    <Heart size={13} className="text-white/50" />
                    <MessageCircle size={13} className="text-white/50" />
                    <Share2 size={13} className="text-white/50" />
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-4 h-4 rounded-full bg-white/25" />
                      <span className="text-white text-[8px] font-semibold tracking-wide">
                        {reel.user}
                      </span>
                    </div>
                    <div className="w-3/4 h-[3px] rounded-full bg-white/15 mb-1" />
                    <div className="w-1/2 h-[3px] rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Logo below phone */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className="mt-6"
          >
            <span
              className="text-base font-bold tracking-tight"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="text-white">on</span>
              <span className="gradient-text-strong">spotly</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
