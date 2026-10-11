import { Bike, Bot } from "lucide-react";
import { useRef, useEffect, useCallback, useState } from "react";
import ballonImg from "@/assets/ballon_de_foot.png";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const InterestCard = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number>(0);

  const startSwirl = useCallback(() => {
    setHovered(true);
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;
    const rect = card.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const spawn = () => {
      if (sparksRef.current.length < 30) {
        const side = Math.floor(Math.random() * 4);
        let x = 0, y = 0;
        if (side === 0) { x = Math.random() * canvas.width; y = 0; }
        else if (side === 1) { x = canvas.width; y = Math.random() * canvas.height; }
        else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height; }
        else { x = 0; y = Math.random() * canvas.height; }

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const dx = cx - x;
        const dy = cy - y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = 0.6 + Math.random() * 0.8;
        // Add perpendicular swirl
        sparksRef.current.push({
          x, y,
          vx: (dx / dist) * speed + (dy / dist) * 0.3 * (Math.random() - 0.5),
          vy: (dy / dist) * speed - (dx / dist) * 0.3 * (Math.random() - 0.5),
          life: 0,
          maxLife: 30 + Math.random() * 20,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spawn();
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        if (s.life >= s.maxLife) {
          sparksRef.current.splice(i, 1);
          continue;
        }
        const alpha = 1 - s.life / s.maxLife;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(43, 74%, 55%, ${alpha * 0.6})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  const stopSwirl = useCallback(() => {
    setHovered(false);
    cancelAnimationFrame(animRef.current);
    sparksRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={startSwirl}
      onMouseLeave={stopSwirl}
      className="glass-card-hover rounded-xl p-6 text-center group relative overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />
      <div className="relative z-[2]">{children}</div>
      <p className="text-sm font-medium text-foreground relative z-[2]">{label}</p>
    </div>
  );
};

const InterestsSection = () => {
  return (
    <section id="interests" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">
          <span className="gold-text">Centres d'intérêt</span>
        </h2>
        <div className="w-16 h-0.5 gold-gradient mx-auto mb-12" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Formule 1 - spinning wheel + smoke */}
          <InterestCard label="Formule 1">
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 relative">
              <svg
                viewBox="0 0 24 24"
                width={24}
                height={24}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-primary-foreground group-hover:animate-[spin_0.4s_linear_infinite]"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="8" />
                <line x1="12" y1="16" x2="12" y2="22" />
                <line x1="2" y1="12" x2="8" y2="12" />
                <line x1="16" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="8.46" y2="8.46" />
                <line x1="15.54" y1="15.54" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="8.46" y2="15.54" />
                <line x1="15.54" y1="8.46" x2="19.07" y2="4.93" />
              </svg>
              {/* Smoke particles */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none">
                <span className="absolute w-2 h-2 rounded-full bg-muted-foreground/30 blur-[2px] animate-[smoke1_0.8s_ease-out_infinite]" />
                <span className="absolute w-1.5 h-1.5 rounded-full bg-muted-foreground/20 blur-[3px] animate-[smoke2_1s_ease-out_infinite_0.2s]" />
                <span className="absolute w-2.5 h-2.5 rounded-full bg-muted-foreground/25 blur-[2px] animate-[smoke3_0.9s_ease-out_infinite_0.4s]" />
              </div>
            </div>
          </InterestCard>

          {/* Football */}
          <InterestCard label="Football">
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <img
                src={ballonImg}
                alt="Ballon de football"
                className="w-7 h-7 object-contain group-hover:animate-[bounce-rotate_0.6s_ease-in-out_infinite]"
              />
            </div>
          </InterestCard>

          {/* Cyclisme */}
          <InterestCard label="Cyclisme">
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <Bike
                size={24}
                className="text-primary-foreground group-hover:animate-[ride_1s_ease-in-out_infinite]"
              />
            </div>
          </InterestCard>

          {/* Veille IA & Commerce */}
          <InterestCard label="Veille IA & Commerce">
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4 group-hover:shadow-[0_0_16px_hsl(43_74%_49%/0.5)] transition-shadow duration-200">
              <Bot
                size={24}
                className="text-primary-foreground group-hover:animate-[tilt_0.6s_ease-in-out_infinite]"
              />
            </div>
          </InterestCard>
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
