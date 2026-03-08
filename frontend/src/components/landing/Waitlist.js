import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Users } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Waitlist() {
  const [form, setForm] = useState({ name: "", email: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(`${API}/waitlist/count`);
        setCount(res.data.count);
      } catch (err) {
        // silently fail
      }
    };
    fetchCount();
  }, [submitted]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.city) {
      toast.error("Please fill in all fields");
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
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
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
            <p className="text-base text-zinc-400 leading-relaxed mb-4">
              Be the first to experience instant content creation when we
              launch.
            </p>

            {/* Waitlist counter */}
            {count > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-8">
                <Users size={14} className="text-violet-400" />
                <span>
                  <span className="text-white font-semibold">{count}</span>{" "}
                  people on the waitlist
                </span>
              </div>
            )}
          </motion.div>

          {/* Form */}
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
                className="glass-card p-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3
                  className="text-xl font-semibold text-white mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  You're on the list!
                </h3>
                <p className="text-sm text-zinc-400">
                  We'll notify you as soon as Onspotly launches in your city.
                </p>
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
