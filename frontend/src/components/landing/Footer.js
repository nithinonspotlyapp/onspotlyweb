import { useNavigate } from "react-router-dom";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "How It Works", path: "/how-it-works" },
      { label: "Features", path: "/features" },
      { label: "Packages", path: "/pricing" },
      { label: "Launch Cities", path: "/cities" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Onspotly", path: "/" },
      { label: "Become a Shooter", path: "/become-shooter" },
      { label: "Join Waitlist", path: "/join" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", path: "/terms" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      data-testid="footer"
      className="border-t border-white/5 py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button
              data-testid="footer-logo"
              onClick={() => navigate("/")}
              className="text-xl font-bold tracking-tight mb-4 block"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="text-white">on</span>
              <span className="gradient-text-strong">spotly</span>
            </button>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mb-6">
              The Uber-style platform for booking nearby content creators who
              shoot, edit, and deliver reels within 30 minutes.
            </p>
            <div>
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-3">
                Follow Onspotly
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    data-testid={`social-${s.label.toLowerCase()}`}
                    href={s.href}
                    className="text-xs text-zinc-500 hover:text-white transition-colors duration-200 px-2 py-1 rounded-md bg-white/5 border border-white/5 hover:border-white/10"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4
                className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-5"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                      onClick={() => navigate(link.path)}
                      className="text-sm text-zinc-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Onspotly. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Contact:{" "}
            <a
              href="mailto:support@onspotlyapp.com"
              className="text-zinc-500 hover:text-white transition-colors duration-200"
            >
              support@onspotlyapp.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
