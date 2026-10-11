import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const CursorGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mx = -100, my = -100;
    let pmx = -100, pmy = -100;
    const particles: Particle[] = [];
    const MAX = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onClick = () => {
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18;
        const speed = 1.5 + Math.random() * 2;
        particles.push({
          x: mx,
          y: my,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: 1 + Math.random() * 2,
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const getParticleHsl = () => {
      const styles = getComputedStyle(document.documentElement);
      const h = styles.getPropertyValue("--particle-h").trim() || "43";
      const s = styles.getPropertyValue("--particle-s").trim() || "74%";
      const l = styles.getPropertyValue("--particle-l").trim() || "55%";
      return { h, s, l };
    };

    let { h: hueH, s: hueS, l: hueL } = getParticleHsl();

    const observer = new MutationObserver(() => {
      const next = getParticleHsl();
      hueH = next.h;
      hueS = next.s;
      hueL = next.l;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn trail particles based on mouse speed
      const dx = mx - pmx;
      const dy = my - pmy;
      const speed = Math.sqrt(dx * dx + dy * dy);
      const count = Math.min(Math.floor(speed / 3), 5);

      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX) particles.shift();
        const t = (i + 1) / (count + 1);
        particles.push({
          x: pmx + dx * t + (Math.random() - 0.5) * 6,
          y: pmy + dy * t + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          life: 0,
          maxLife: 25 + Math.random() * 15,
          size: 1 + Math.random() * 1.5,
        });
      }

      // Always keep a few ambient particles near cursor
      if (particles.length < 8 && mx > 0) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 10,
          y: my + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: 0,
          maxLife: 20 + Math.random() * 10,
          size: 1 + Math.random(),
        });
      }

      pmx = mx;
      pmy = my;

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;
        const r = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hueH}, ${hueS}, ${hueL}, ${alpha * 0.85})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hueH}, ${hueS}, ${hueL}, ${alpha * 0.18})`;
        ctx.fill();
      }

      // Core glow at cursor position
      if (mx > 0) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 12);
        g.addColorStop(0, `hsla(${hueH}, ${hueS}, ${hueL}, 0.5)`);
        g.addColorStop(0.5, `hsla(${hueH}, ${hueS}, ${hueL}, 0.15)`);
        g.addColorStop(1, `hsla(${hueH}, ${hueS}, ${hueL}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
};

export default CursorGlow;
