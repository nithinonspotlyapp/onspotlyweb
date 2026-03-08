import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Toaster } from "sonner";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ReelTransition from "@/components/landing/ReelTransition";
import HomePage from "@/pages/HomePage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import FeaturesPage from "@/pages/FeaturesPage";
import PricingPage from "@/pages/PricingPage";
import CitiesPage from "@/pages/CitiesPage";
import BecomeShooterPage from "@/pages/BecomeShooterPage";
import WaitlistPage from "@/pages/WaitlistPage";
import PrivacyPolicy from "@/components/landing/PrivacyPolicy";

function AppShell() {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      prevPath.current = location.pathname;
      setTransitioning(true);

      // Lock body scroll during transition
      document.body.style.overflow = 'hidden';

      const switchTimer = setTimeout(() => {
        setDisplayLocation(location);
        // Robust scroll-to-top: disable smooth scroll, force instant scroll
        requestAnimationFrame(() => {
          const html = document.documentElement;
          html.style.scrollBehavior = 'auto';
          window.scrollTo(0, 0);
          html.scrollTop = 0;
          document.body.scrollTop = 0;
          requestAnimationFrame(() => {
            html.style.scrollBehavior = '';
          });
        });
      }, 650);

      const hideTimer = setTimeout(() => {
        setTransitioning(false);
        document.body.style.overflow = '';
      }, 1100);

      return () => {
        clearTimeout(switchTimer);
        clearTimeout(hideTimer);
        document.body.style.overflow = '';
      };
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <ReelTransition isActive={transitioning} />
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/become-shooter" element={<BecomeShooterPage />} />
        <Route path="/join" element={<WaitlistPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0A0A0A',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
