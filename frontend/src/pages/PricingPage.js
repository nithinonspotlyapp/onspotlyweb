import Pricing from "@/components/landing/Pricing";
import PageNav from "@/components/landing/PageNav";

export default function PricingPage() {
  return (
    <div className="pt-20 min-h-screen" data-testid="pricing-page">
      <Pricing />
      <PageNav
        items={[
          { to: "/cities", label: "Launch Cities" },
          { to: "/features", label: "Features" },
          { to: "/join", label: "Join Waitlist" },
        ]}
      />
    </div>
  );
}
