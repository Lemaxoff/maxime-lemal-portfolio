import { Lightbulb, Users, Heart } from "lucide-react";

const values = [
  { icon: Users, label: "Esprit d'équipe", desc: "Collaborer pour atteindre des objectifs communs" },
  { icon: Heart, label: "Générosité", desc: "Partager ses connaissances et aider les autres" },
  { icon: Lightbulb, label: "Curiosité technologique", desc: "Explorer les dernières innovations numériques" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">
          <span className="gold-text">À propos</span>
        </h2>
        <div className="w-16 h-0.5 gold-gradient mx-auto mb-10" />

        <div className="glass-card rounded-2xl p-6 sm:p-10 mb-10">
          <p className="text-foreground/80 leading-relaxed text-base sm:text-lg text-center" style={{ lineHeight: '1.9' }}>
            Étudiant en E-Business à la HEPL, je suis passionné par l'innovation numérique, 
            l'intelligence artificielle et le e-commerce. Mon parcours m'a permis de développer 
            des compétences variées allant du marketing digital au développement web, en passant 
            par l'UX/UI design et l'analyse de données. Je suis convaincu que la technologie, 
            lorsqu'elle est bien utilisée, peut transformer positivement les entreprises et la société.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((v) => (
            <div key={v.label} className="glass-card-hover rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
                <v.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{v.label}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
