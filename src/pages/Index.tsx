import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import InterestsSection from "@/components/InterestsSection";
import Footer from "@/components/Footer";
import ShapeWaves from "@/components/ShapeWaves";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0" aria-hidden="true" style={{ opacity: 0.3 }}>
        <ShapeWaves
          shapes="mixed"
          cellSize={10}
          dotSize={0.75}
          color="#C5A059"
          hoverColor="#ffffff"
          backgroundColor="#0A0A0A"
          speed={0.65}
          scale={1.1}
          contrast={1.1}
          brightness={0.55}
          fade={0.25}
          interactive={true}
          splashRadius={40}
          splashStrength={0.4}
          glow={0}
          intro={true}
          onError={(e) => console.error("[ShapeWaves]", e)}
          introDuration={1.6}
        />
      </div>
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsMarquee />
      <InterestsSection />
      <Footer />
    </div>
  );
};

export default Index;
