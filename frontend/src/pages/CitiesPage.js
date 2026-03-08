import USMap from "@/components/landing/USMap";
import PageNav from "@/components/landing/PageNav";

export default function CitiesPage() {
  return (
    <div className="pt-20 min-h-screen" data-testid="cities-page">
      <USMap />
      <PageNav
        items={[
          { to: "/join", label: "Join Waitlist" },
          { to: "/become-shooter", label: "Become a Shooter" },
          { to: "/pricing", label: "Pricing" },
        ]}
      />
    </div>
  );
}
