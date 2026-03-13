import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Clock, MapPin, Users, Send, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const API = `${(process.env.REACT_APP_BACKEND_URL || '').replace(/\/+$/, '')}/api`;

const benefits = [
  { icon: Clock, label: "Flexible Work", desc: "Choose your own schedule" },
  { icon: MapPin, label: "Local Bookings", desc: "Work near your location" },
  { icon: Send, label: "Fast Payouts", desc: "Get paid quickly" },
  { icon: Users, label: "Creator Community", desc: "Join a growing network" },
];

const deviceOptions = [
  "iPhone 13",
  "iPhone 13 Mini",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
  "iPhone 16e",
  "iPhone 17",
  "iPhone 17 Air",
  "iPhone 17 Pro",
  "iPhone 17 Pro Max",
];

export default function BecomeShooter() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio_link: "",
    experience_years: "",
    city: "",
    device_type: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.portfolio_link || !form.experience_years || !form.city || !form.device_type) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/shooter-apply`, form);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="become-shooter"
      data-testid="become-shooter-section"
      className="py-24 md:py-32 relative section-glow-right"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium tracking-widest uppercase text-emerald-400 mb-4 block">
              For Creators
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Become an Onspotly Creator
            </h2>
            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-md">
              Join our network of trained creators and earn by shooting events
              and content near you.
            </p>

            <div className="mb-10">
              <h3
                className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Requirements
              </h3>
              <ul className="space-y-3">
                {[
                  "Experience with iPhone videography",
                  "Strong passion in content creation",
                  "Basic editing skills",
                  "Ability to shoot reels and event content",
                  "Reliable and professional",
                ].map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="glass-card p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <b.icon size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{b.label}</p>
                    <p className="text-xs text-zinc-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="glass-card p-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                </motion.div>
                <h3
                  className="text-xl font-semibold text-white mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Application Submitted!
                </h3>
                <p className="text-sm text-zinc-400">
                  We'll review your application and get back to you soon.
                </p>
              </div>
            ) : (
              <form
                data-testid="shooter-form"
                onSubmit={handleSubmit}
                className="glass-card p-8 md:p-10 space-y-5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    <Camera size={18} className="text-violet-400" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    Apply as Shooter
                  </h3>
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Name</label>
                  <input
                    data-testid="shooter-name-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Email</label>
                  <input
                    data-testid="shooter-email-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Phone Number</label>
                  <input
                    data-testid="shooter-phone-input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">City</label>
                  <input
                    data-testid="shooter-city-input"
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Portfolio Link</label>
                  <input
                    data-testid="shooter-portfolio-input"
                    type="url"
                    name="portfolio_link"
                    value={form.portfolio_link}
                    onChange={handleChange}
                    placeholder="Instagram / YouTube / TikTok / Website"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Device Type</label>
                  <select
                    data-testid="shooter-device-select"
                    name="device_type"
                    value={form.device_type}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors duration-200 appearance-none"
                  >
                    <option value="" className="bg-zinc-900">Select your iPhone model</option>
                    {deviceOptions.map((d) => (
                      <option key={d} value={d} className="bg-zinc-900">{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-medium">Years of Experience</label>
                  <select
                    data-testid="shooter-experience-select"
                    name="experience_years"
                    value={form.experience_years}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors duration-200 appearance-none"
                  >
                    <option value="" className="bg-zinc-900">Select experience</option>
                    <option value="0-1" className="bg-zinc-900">Less than 1 year</option>
                    <option value="1-3" className="bg-zinc-900">1-3 years</option>
                    <option value="3-5" className="bg-zinc-900">3-5 years</option>
                    <option value="5+" className="bg-zinc-900">5+ years</option>
                  </select>
                </div>

                {/* Terms checkbox */}
                <label
                  data-testid="shooter-terms-checkbox-label"
                  className="flex items-start gap-3 cursor-pointer pt-1"
                >
                  <input
                    data-testid="shooter-terms-checkbox"
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
                  data-testid="shooter-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gradient text-white font-semibold py-3.5 rounded-full text-sm flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      Apply as Shooter
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
