import { useEffect, useRef, useState } from 'react';
import './ShapeWaves.css';

export type ShapeWavesShape = 'mixed' | 'squares' | 'circles' | 'triangles';

export interface ShapeWavesProps {
  text?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  textSize?: number;
  shapes?: ShapeWavesShape;
  cellSize?: number;
  dotSize?: number;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  speed?: number;
  scale?: number;
  contrast?: number;
  brightness?: number;
  flow?: number;
  direction?: number;
  fade?: number;
  interactive?: boolean;
  splashRadius?: number;
  splashStrength?: number;
  glow?: number;
  intro?: boolean;
  introDuration?: number;
  introKey?: string | number;
  paused?: boolean;
  onError?: (error: Error) => void;
  className?: string;
}

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function ShapeWaves({
  shapes = 'mixed',
  cellSize = 10,
  dotSize = 0.75,
  color = '#C5A059',
  hoverColor = '#E7CF8A',
  backgroundColor = '#0A0A0A',
  speed = 0.65,
  scale = 1,
  contrast = 1.1,
  brightness = 0.55,
  flow = 0,
  direction = 0,
  fade = 0.25,
  interactive = true,
  splashRadius = 40,
  splashStrength = 0.4,
  intro = true,
  introDuration = 1.6,
  paused = false,
  onError,
  className = '',
}: ShapeWavesProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!root || !canvas) return undefined;
    if (!context) {
      onError?.(new Error('Canvas 2D indisponible dans ce navigateur.'));
      return undefined;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let elapsed = 0;
    let previousTime = 0;
    let frameId = 0;
    let hasDrawn = false;
    let pointerX = 0;
    let pointerY = 0;
    let pointerTime = -10;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const angle = (direction * Math.PI) / 180;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      draw(performance.now());
    };

    const draw = (now: number) => {
      frameId = 0;
      if (width <= 0 || height <= 0) return;
      if (previousTime) elapsed += Math.min((now - previousTime) / 1000, 0.05) * Math.max(0, speed);
      previousTime = now;

      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      const spacing = Math.max(24, Math.max(2, cellSize) * 2.8);
      const safeScale = Math.max(0.25, scale);
      const shiftX = elapsed * flow * 34 * Math.cos(angle);
      const shiftY = elapsed * flow * 34 * Math.sin(angle);
      const introProgress = intro ? clamp(elapsed / Math.max(0.1, introDuration)) : 1;
      const introFade = intro ? clamp(introProgress * 1.8) : 1;
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let row = 0; row <= rows; row += 1) {
        const y = row * spacing + spacing / 2;
        for (let col = 0; col <= cols; col += 1) {
          const x = col * spacing + spacing / 2;
          const sx = (x + shiftX) / (150 * safeScale);
          const sy = (y + shiftY) / (150 * safeScale);
          const waveA = Math.sin(sx + sy * 1.15 + elapsed * 0.72 + Math.sin(sy * 1.25 - elapsed * 0.38) * 0.8);
          const waveB = Math.cos(sx * 0.72 - sy * 1.1 - elapsed * 0.46);
          const tone = clamp(0.5 + (waveA * 0.35 + waveB * 0.15) * contrast + (brightness - 0.5) * 0.18);
          const threshold = clamp(0.34 - (brightness - 0.5) * 0.15, 0.16, 0.7);
          if (tone <= threshold) continue;

          const band = clamp((tone - threshold) / (1 - threshold));
          const distanceFromCenter = Math.hypot((x - width / 2) / Math.max(1, width / 2), (y - height / 2) / Math.max(1, height / 2));
          const edgeFade = Math.max(0.25, 1 - clamp(fade, 0, 0.95) * distanceFromCenter);
          const pointerDistance = Math.hypot(x - pointerX, y - pointerY);
          const pointerAge = elapsed - pointerTime;
          const splash = interactive && pointerAge >= 0 && pointerAge < 1.8
            ? Math.exp(-Math.abs(pointerDistance - pointerAge * splashRadius * 5) / Math.max(12, splashRadius * 0.65))
              * Math.exp(-pointerAge * 1.2) * splashStrength
            : 0;
          const size = spacing * (0.16 + band * 0.26) * clamp(dotSize, 0.1, 1.5);
          const alpha = clamp((0.12 + band * 0.48 + splash * 0.3) * edgeFade * introFade);
          if (alpha < 0.02) continue;

          context.globalAlpha = alpha;
          context.fillStyle = splash > 0.12 ? hoverColor : color;
          const shape = shapes === 'mixed'
            ? (band < 0.32 ? 'circle' : band < 0.68 ? 'square' : 'triangle')
            : shapes;

          if (shape === 'circles' || shape === 'circle') {
            context.beginPath();
            context.arc(x, y, size, 0, Math.PI * 2);
            context.fill();
          } else if (shape === 'triangles' || shape === 'triangle') {
            context.beginPath();
            context.moveTo(x, y - size);
            context.lineTo(x + size * 0.92, y + size * 0.72);
            context.lineTo(x - size * 0.92, y + size * 0.72);
            context.closePath();
            context.fill();
          } else {
            const half = size * 0.78;
            context.fillRect(x - half, y - half, half * 2, half * 2);
          }
        }
      }
      context.globalAlpha = 1;
      if (!hasDrawn) {
        hasDrawn = true;
        setReady(true);
      }
      if (!paused && !reducedMotion.matches && !document.hidden) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const handlePointer = (event: MouseEvent) => {
      if (!interactive) return;
      const bounds = root.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      pointerTime = elapsed;
      if (paused || reducedMotion.matches) draw(performance.now());
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        draw(performance.now());
      }
    };

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(root);
    if (!observer) window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('mousemove', handlePointer, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    resize();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      if (!observer) window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('mousemove', handlePointer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [
    shapes, cellSize, dotSize, color, hoverColor, speed, scale, contrast, brightness,
    flow, direction, fade, interactive, splashRadius, splashStrength, intro,
    introDuration, paused, onError,
  ]);

  return (
    <div
      ref={rootRef}
      className={`shape-waves ${className}`}
      data-ready={ready}
      style={{ backgroundColor }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="shape-waves__canvas" />
    </div>
  );
}
