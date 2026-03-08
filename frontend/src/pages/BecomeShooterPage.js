import BecomeShooter from "@/components/landing/BecomeShooter";
import PageNav from "@/components/landing/PageNav";

export default function BecomeShooterPage() {
  return (
    <div className="pt-20 min-h-screen" data-testid="become-shooter-page">
      <BecomeShooter />
      <PageNav
        items={[
          { to: "/join", label: "Join Waitlist" },
          { to: "/pricing", label: "Pricing" },
          { to: "/cities", label: "Launch Cities" },
        ]}
      />
    </div>
  );
}
