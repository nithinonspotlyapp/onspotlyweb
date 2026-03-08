import HowItWorks from "@/components/landing/HowItWorks";
import PageNav from "@/components/landing/PageNav";

export default function HowItWorksPage() {
  return (
    <div className="pt-20 min-h-screen" data-testid="how-it-works-page">
      <HowItWorks />
      <PageNav
        items={[
          { to: "/features", label: "Features" },
          { to: "/pricing", label: "Pricing" },
          { to: "/join", label: "Join Waitlist" },
        ]}
      />
    </div>
  );
}
