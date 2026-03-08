import Features from "@/components/landing/Features";
import PageNav from "@/components/landing/PageNav";

export default function FeaturesPage() {
  return (
    <div className="pt-20 min-h-screen" data-testid="features-page">
      <Features />
      <PageNav
        items={[
          { to: "/pricing", label: "Pricing" },
          { to: "/how-it-works", label: "How It Works" },
          { to: "/join", label: "Join Waitlist" },
        ]}
      />
    </div>
  );
}
