import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PageNav({ items }) {
  const navigate = useNavigate();
  return (
    <div className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-6">
          Continue Exploring
        </p>
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <button
              key={item.to}
              data-testid={`page-nav-${item.to.slice(1)}`}
              onClick={() => navigate(item.to)}
              className="glass-card px-5 py-3 text-sm text-zinc-400 hover:text-white flex items-center gap-2 group"
            >
              {item.label}
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
