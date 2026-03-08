import Waitlist from "@/components/landing/Waitlist";
import PageNav from "@/components/landing/PageNav";

export default function WaitlistPage() {
  return (
    <div className="pt-20 min-h-screen" data-testid="waitlist-page">
      <Waitlist />
      <PageNav
        items={[
          { to: "/become-shooter", label: "Become a Shooter" },
          { to: "/cities", label: "Launch Cities" },
          { to: "/pricing", label: "Pricing" },
        ]}
      />
    </div>
  );
}
