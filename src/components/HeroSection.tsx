import profileImg from "@/assets/profile.jpg";
import lanyardBack from "@/assets/lanyard-back.svg";
import { lazy, Suspense } from "react";
import { ArrowDown, FileText, Download } from "lucide-react";
import Magnet from "./Magnet";

const Lanyard = lazy(() => import("./Lanyard"));

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center section-padding pt-24 relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-up mb-1">
          <div
            className="relative z-10 mx-auto h-[410px] w-full max-w-[24rem] sm:h-[480px] lg:h-[500px]"
            role="img"
            aria-label="Badge 3D de Maxime Lemal : photo au recto, carte E-Business et QR code LinkedIn au verso."
          >
            <Suspense
              fallback={
                <div className="mx-auto mt-16 h-[290px] w-[208px] overflow-hidden rounded-2xl glass-card gold-glow">
                  <img src={profileImg} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                </div>
              }
            >
              <Lanyard
                frontImage={profileImg}
                backImage={lanyardBack}
                imageFit="cover"
                cardColor="#0A0A0A"
                orientation="portrait"
                finish="matte"
                cornerRadius={0.24}
                size={0.72}
                anchor="center"
                strapLength={0.46}
                strapColor="#111111"
                strapWidth={0.65}
                metal="gold"
                gravity={0.85}
                damping={0.65}
                elasticity={0.5}
                breeze={0.16}
                interactive
                intro
                className="lanyard-hero"
              />
            </Suspense>
          </div>
          <a
            href="https://www.linkedin.com/in/maxime-lemal-770bb12a0"
            target="_blank"
            rel="noopener noreferrer"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
          >
            Accéder au profil LinkedIn de Maxime Lemal
          </a>
        </div>

        <h1 className="animate-fade-up-delay-1 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span className="gold-text">Maxime Lemal</span>
        </h1>

        <p className="animate-fade-up-delay-1 glass-card rounded-2xl p-5 sm:p-6 text-sm sm:text-base text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Marketing digital • Intelligence artificielle • E-commerce • Développement web • UX/UI design • Création de contenu • Analyse digitale
        </p>

        <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Magnet className="self-center" padding={36} strength={3}>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 gold-gradient text-primary-foreground font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Me contacter
            </a>
          </Magnet>
          <Magnet className="self-center" padding={36} strength={3}>
            <a
              href="/cv-maxime-lemal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 glass-card px-8 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              <Download size={18} />
              Mon CV
            </a>
          </Magnet>
          <Magnet className="self-center" padding={36} strength={3}>
            <a
              href="#projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 glass-card px-8 py-3 rounded-lg text-foreground hover:bg-secondary transition-colors"
            >
              <FileText size={18} />
              Voir mes projets
            </a>
          </Magnet>
        </div>

        <a
          href="#about"
          className="animate-fade-up-delay-3 inline-block mt-16 text-muted-foreground hover:text-primary transition-colors animate-float"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
