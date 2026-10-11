import { Globe, BarChart3, Search, Car, Flame, Calculator, ExternalLink, Play } from "lucide-react";
import { useRef, useState, useCallback } from "react";

const projects = [
  {
    icon: Globe,
    title: "Projet Web Scuderia Ferrari",
    desc: "Création d'un site sur mesure (WordPress, VS Code, Photoshop) dédié à l'écurie et ses pilotes.",
    tags: ["WordPress", "VS Code", "Photoshop"],
    span: "md:col-span-2",
    link: "/Projet-Web-Scuderia-Ferrari.mp4",
    linkIcon: "play" as const,
  },
  {
    icon: BarChart3,
    title: "Stratégie Digitale PME",
    desc: "Analyse physique et digitale, calendrier éditorial et création de contenu pour une PME belge.",
    tags: ["Stratégie", "Contenu", "Analyse"],
    span: "",
    link: "/Strategie-Digitale-PME.pdf",
    linkIcon: "external" as const,
  },
  {
    icon: Search,
    title: "Audit UX Neuhaus",
    desc: "Analyse des bonnes pratiques UX/UI du site Neuhaus, avec recommandations d'amélioration.",
    tags: ["UX/UI", "Audit", "Recherche"],
    span: "",
    link: "/Audit-UX-Neuhaus.pdf",
    linkIcon: "external" as const,
  },
  {
    icon: Car,
    title: "E-Commerce de Luxe",
    desc: "Plateforme de location de voitures électriques haut de gamme (en cours de développement).",
    tags: ["E-commerce", "Luxe", "En cours"],
    span: "md:col-span-2",
  },
  {
    icon: Flame,
    title: "Startup Studio — Bougies Belges",
    desc: "Entreprise fictive de bougies artisanales : prospection, stratégie de vente et branding.",
    tags: ["Startup", "Branding", "Vente"],
    span: "md:col-span-2",
    link: "/Startup-Studio-Bougies-Belges.pdf",
    linkIcon: "external" as const,
  },
  {
    icon: Calculator,
    title: "App Développement",
    desc: "Application de gestion de budget collaborative de type 'Tricount'.",
    tags: ["Développement", "App", "Budget"],
    span: "",
  },
];

interface TiltState {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateY: (x - 0.5) * 16,
      rotateX: (0.5 - y) * 16,
      glowX: x * 100,
      glowY: y * 100,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
    setIsHovered(false);
  }, []);

  const LinkIcon = project.linkIcon === "play" ? Play : ExternalLink;
  const hasLink = !!project.link;

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      className="relative rounded-2xl p-8 flex flex-col items-center text-center h-full transition-all duration-200 ease-out bg-card/70 backdrop-blur-md"
      style={{
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        border: "1px solid hsl(var(--gold) / 0.12)",
        boxShadow: isHovered
          ? "0 20px 60px hsl(var(--gold) / 0.18), 0 8px 24px hsl(var(--foreground) / 0.08), inset 0 1px 0 hsl(var(--gold) / 0.12)"
          : "0 8px 32px hsl(var(--foreground) / 0.06), 0 2px 8px hsl(var(--foreground) / 0.04)",
      }}
    >
      {/* Mouse-following glow highlight */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, hsl(var(--gold) / 0.1), transparent 60%)`,
          }}
        />
      )}
      {/* Gold border glow on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: "1px solid hsl(var(--gold) / 0.35)",
            boxShadow: "inset 0 0 20px hsl(var(--gold) / 0.06)",
          }}
        />
      )}

      {/* Clickable overlay icon */}
      {hasLink && isHovered && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none z-10">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: "hsl(var(--gold) / 0.18)",
              backdropFilter: "blur(8px)",
              border: "1px solid hsl(var(--gold) / 0.35)",
              boxShadow: "0 0 20px hsl(var(--gold) / 0.25)",
            }}
          >
            <LinkIcon size={22} className="text-primary" />
          </div>
        </div>
      )}

      <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-5">
        <project.icon size={20} className="text-primary-foreground" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-3">{project.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5 max-w-md">{project.desc}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full text-primary"
            style={{
              background: "hsl(var(--gold) / 0.08)",
              border: "1px solid hsl(var(--gold) / 0.2)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${project.span}`} style={{ perspective: "800px" }}>
      {hasLink ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          <span className="gold-text">Mes Projets</span>
        </h2>
        <div className="w-16 h-0.5 gold-gradient mx-auto mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
