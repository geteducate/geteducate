import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import QuoteSection from "@/components/home/QuoteSection";
import MissionSection from "@/components/home/MissionSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/effects/MouseGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MouseGlow />
      <Navbar />
      <HeroSection />
      <QuoteSection />
      <MissionSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
