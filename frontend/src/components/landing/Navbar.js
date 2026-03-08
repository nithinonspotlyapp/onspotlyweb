import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Cities", path: "/cities" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16 md:h-20">
        <button
          data-testid="navbar-logo"
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold tracking-tight"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <span className="text-white">on</span>
          <span className="gradient-text-strong">spotly</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              data-testid={`nav-link-${link.path.slice(1)}`}
              onClick={() => navigate(link.path)}
              className={`text-sm transition-colors duration-200 ${
                location.pathname === link.path
                  ? "text-white font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            data-testid="nav-join-waitlist"
            onClick={() => navigate("/join")}
            className="btn-gradient text-sm font-semibold text-white px-5 py-2.5 rounded-full"
          >
            Join Waitlist
          </button>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  data-testid={`mobile-nav-${link.path.slice(1)}`}
                  onClick={() => navigate(link.path)}
                  className={`text-left text-base py-2 transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-white font-medium"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                data-testid="mobile-nav-become-shooter"
                onClick={() => navigate("/become-shooter")}
                className="text-left text-zinc-300 hover:text-white text-base py-2 transition-colors duration-200"
              >
                Become a Shooter
              </button>
              <button
                data-testid="mobile-nav-waitlist"
                onClick={() => navigate("/join")}
                className="btn-gradient text-sm font-semibold text-white px-5 py-2.5 rounded-full mt-2 w-fit"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
