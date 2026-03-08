import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Audience from "@/components/landing/Audience";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import USMap from "@/components/landing/USMap";
import BecomeShooter from "@/components/landing/BecomeShooter";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";
import PrivacyPolicy from "@/components/landing/PrivacyPolicy";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Audience />
        <Features />
        <Pricing />
        <USMap />
        <BecomeShooter />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
};

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
