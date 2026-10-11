import { Linkedin, Mail } from "lucide-react";
import Magnet from "./Magnet";

const Footer = () => {
  return (
    <footer id="contact" className="section-padding border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title">
          <span className="gold-text">Me contacter</span>
        </h2>
        <div className="w-16 h-0.5 gold-gradient mx-auto mb-8" />
        <p className="glass-card rounded-2xl p-5 sm:p-6 text-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          N'hésitez pas à me contacter pour discuter de projets ou d'opportunités.
        </p>

        <div className="flex justify-center gap-6 mb-10">
          <Magnet padding={28} strength={3}>
            <a
              href="https://www.linkedin.com/in/maxime-lemal-770bb12a0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </Magnet>
          <Magnet padding={28} strength={3}>
            <a
              href="mailto:maxime.lemal3@gmail.com"
              className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </Magnet>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Portfolio. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
