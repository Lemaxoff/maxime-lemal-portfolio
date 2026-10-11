import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(60, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    const getParticleHsl = () => {
      const styles = getComputedStyle(document.documentElement);
      const h = styles.getPropertyValue("--particle-h").trim() || "43";
      const s = styles.getPropertyValue("--particle-s").trim() || "74%";
      const l = styles.getPropertyValue("--particle-l").trim() || "49%";
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

      // Gradient mesh blobs
      const time = Date.now() * 0.0002;
      for (let i = 0; i < 3; i++) {
        const cx = canvas.width * (0.3 + 0.4 * Math.sin(time + i * 2.1));
        const cy = canvas.height * (0.3 + 0.4 * Math.cos(time * 0.7 + i * 1.8));
        const r = Math.min(canvas.width, canvas.height) * 0.35;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `hsla(${hueH}, ${hueS}, ${hueL}, 0.06)`);
        grad.addColorStop(0.5, `hsla(${hueH}, ${hueS}, ${hueL}, 0.03)`);
        grad.addColorStop(1, `hsla(${hueH}, ${hueS}, ${hueL}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hueH}, ${hueS}, ${hueL}, ${p.opacity})`;
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${hueH}, ${hueS}, ${hueL}, ${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
