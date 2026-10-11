import type { ReactNode } from "react";
import LogoLoop, { type LogoItem } from "./LogoLoop";
import photoshopLogo from "@/assets/logos/photoshop.png";
import canvaLogo from "@/assets/logos/canva.png";
import odooLogo from "@/assets/logos/odoo.png";
import microsoftLogo from "@/assets/logos/microsoft.png";
import wordpressLogo from "@/assets/logos/wordpress.png";
import lovableLogo from "@/assets/logos/lovable.png";
import capcutLogo from "@/assets/logos/capcut.png";

interface Skill {
  name: string;
  icon: ReactNode;
}

const imgClass = "w-8 h-8 object-contain";

const skills: Skill[] = [
  {
    name: "WordPress",
    icon: <img src={wordpressLogo} alt="WordPress" className={imgClass} />,
  },
  {
    name: "VS Code",
    icon: (
      <svg viewBox="0 0 24 24" fill="#007ACC" className="w-8 h-8">
        <path d="M17.583.063a1.5 1.5 0 00-1.032.392 1.5 1.5 0 00-.001 0L7.05 9.592 2.913 6.283a1 1 0 00-1.251.063l-1.4 1.272a1 1 0 000 1.462L4.233 12 .262 14.92a1 1 0 000 1.462l1.4 1.272a1 1 0 001.251.063L7.05 14.408l9.5 9.137c.292.281.672.436 1.062.455h.03a1.5 1.5 0 00.47-.076l3.5-1.167A1.5 1.5 0 0023 21.33V2.67a1.5 1.5 0 00-1.388-1.494l-3.5-1.167a1.5 1.5 0 00-.529.054zM17.5 5.075v13.85L9.475 12z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="#f0f0f0" className="w-8 h-8">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Odoo",
    icon: <img src={odooLogo} alt="Odoo" className={imgClass} />,
  },
  {
    name: "Photoshop",
    icon: <img src={photoshopLogo} alt="Photoshop" className={imgClass} />,
  },
  {
    name: "Lovable",
    icon: <img src={lovableLogo} alt="Lovable" className={imgClass} />,
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83" />
        <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF" />
        <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E" />
        <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262" />
        <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    icon: (
      <svg viewBox="0 0 24 24" fill="#10A37F" className="w-8 h-8">
        <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.694.013a6.044 6.044 0 00-5.772 4.206 5.984 5.984 0 00-3.935 2.911 6.045 6.045 0 00.749 7.19 5.983 5.983 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.935-2.911 6.045 6.045 0 00-.749-7.19zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071.005l-4.83-2.786A4.504 4.504 0 012.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 01.071-.005l4.83 2.786a4.494 4.494 0 01-.676 8.105v-5.678a.79.79 0 00-.407-.657zM20.91 8.587l-.142-.085-4.774-2.782a.776.776 0 00-.785 0L9.37 9.089V6.757a.072.072 0 01.033-.063l4.83-2.786a4.5 4.5 0 016.678 4.679zM8.256 12.919l-2.02-1.164a.08.08 0 01-.038-.057V6.116a4.5 4.5 0 017.375-3.453l-.142.08L8.652 5.5a.795.795 0 00-.392.68zm1.1-2.963l2.602-1.502 2.6 1.502v3.003l-2.6 1.502-2.602-1.502z" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" fill="url(#gemini-grad)" />
        <defs>
          <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#4285F4" />
            <stop offset="0.5" stopColor="#9B72CB" />
            <stop offset="1" stopColor="#D96570" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Microsoft 365",
    icon: <img src={microsoftLogo} alt="Microsoft 365" className={imgClass} />,
  },
  {
    name: "Canva",
    icon: <img src={canvaLogo} alt="Canva" className={imgClass} />,
  },
  {
    name: "CapCut",
    icon: <img src={capcutLogo} alt="CapCut" className={imgClass} />,
  },
];

const logos: LogoItem[] = skills.map(({ name, icon }) => ({
  title: name,
  ariaLabel: name,
  node: (
    <div className="glass-card rounded-xl px-5 py-4 min-w-[136px] h-24 flex flex-col items-center justify-center gap-2 transition-colors duration-300 hover:border-primary/40">
      <span className="flex h-9 items-center justify-center">{icon}</span>
      <span className="text-xs font-semibold tracking-wide text-foreground/80 whitespace-nowrap">
        {name}
      </span>
    </div>
  ),
}));

const SkillsMarquee = () => (
  <section id="skills" className="section-padding overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <h2 className="section-title">
        <span className="gold-text">Compétences & Outils</span>
      </h2>
      <div className="w-16 h-0.5 gold-gradient mx-auto mb-12" />
    </div>

    <div className="logoloop-full-bleed relative py-2">
      <LogoLoop
        logos={logos}
        speed={54}
        direction="left"
        logoHeight={36}
        gap={24}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="hsl(var(--background))"
        ariaLabel="Compétences et outils de Maxime Lemal"
      />
    </div>
  </section>
);

export default SkillsMarquee;
