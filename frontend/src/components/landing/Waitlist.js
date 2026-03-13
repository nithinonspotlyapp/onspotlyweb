import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Sparkles, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API = `${(process.env.REACT_APP_BACKEND_URL || '').replace(/\/+$/, '')}/api`;

export default function Waitlist() {
  const [form, setForm] = useState({ name: "", email: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.city) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, form);
      setSubmitted(true);
      toast.success("You're on the waitlist!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      data-testid="waitlist-section"
      className="py-24 md:py-32 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-violet-400 mb-4 block">
              Early Access
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Get Early Access to the{" "}
              <span className="gradient-text">Onspotly App</span>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed mb-8">
              Be the first to experience instant content creation when we launch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="glass-card p-10 md:p-12"
                data-testid="waitlist-success-message"
              >
                {/* Animated icons */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle size={28} className="text-emerald-400" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Thank You for Joining Onspotly!
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-zinc-300 leading-relaxed max-w-sm mx-auto">
                    You're officially on the waitlist. We're thrilled to have you on board!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-violet-400 text-sm">
                    <Bell size={14} />
                    <span>We'll notify you as soon as we launch in your city.</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-4">
                    Keep an eye on your inbox for exclusive updates, early access invitations, and launch announcements.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 flex items-center justify-center gap-1"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <Sparkles size={12} className="text-violet-400/60" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <form
                data-testid="waitlist-form"
                onSubmit={handleSubmit}
                className="glass-card p-8 space-y-4"
              >
                <input
                  data-testid="waitlist-name-input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />
                <input
                  data-testid="waitlist-email-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />
                <input
                  data-testid="waitlist-city-input"
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                />

                {/* Terms checkbox */}
                <label
                  data-testid="waitlist-terms-checkbox-label"
                  className="flex items-start gap-3 cursor-pointer pt-2"
                >
                  <input
                    data-testid="waitlist-terms-checkbox"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/50 cursor-pointer accent-violet-500"
                  />
                  <span className="text-xs text-zinc-400 text-left leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-violet-400 hover:text-violet-300 underline transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-violet-400 hover:text-violet-300 underline transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <button
                  data-testid="waitlist-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gradient text-white font-semibold py-3.5 rounded-full text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
