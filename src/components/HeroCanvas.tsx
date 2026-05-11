import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  lineColor: string;
}

// Simple noise function for particle movement
function noise(x: number, y: number, t: number): number {
  const sin = Math.sin;
  return (
    sin(x * 0.5 + t) * cos(y * 0.3 + t * 0.7) +
    sin(x * 0.7 - t * 0.5) * cos(y * 0.5 - t)
  ) * 0.5;
}
function cos(v: number): number {
  return Math.cos(v);
}

const PARTICLE_COUNT = 180;
const CONNECTION_DIST = 80;
const MOUSE_RADIUS = 100;
const MOUSE_FORCE = 0.8;
const VELOCITY_DAMPING = 0.98;
const EMERALD_PARTICLES = 0.65;

const COLORS = {
  emerald: "rgba(46, 204, 113, 0.6)",
  emeraldLine: "rgba(46, 204, 113, 0.15)",
  white: "rgba(255, 255, 255, 0.25)",
  whiteLine: "rgba(255, 255, 255, 0.08)",
  bg: "#2E1A5E",
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;
    const count = isMobile || isReducedMotion ? 80 : PARTICLE_COUNT;
    const skipLines = isMobile || isReducedMotion;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const isEmerald = Math.random() < EMERALD_PARTICLES;
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 1 + Math.random() * 1.5,
        color: isEmerald ? COLORS.emerald : COLORS.white,
        lineColor: isEmerald ? COLORS.emeraldLine : COLORS.whiteLine,
      });
    }
    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      timeRef.current += 1;
      const t = timeRef.current * 0.0003;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, w, h);

      // Update particles
      for (const p of particles) {
        // Noise-driven velocity
        const angle =
          noise(p.x * 0.005, p.y * 0.005, t) * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.15;
        p.vy += Math.sin(angle) * 0.15;

        // Mouse repulsion
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS && mDist > 0) {
          const force = ((MOUSE_RADIUS - mDist) / MOUSE_RADIUS) * MOUSE_FORCE;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Damping
        p.vx *= VELOCITY_DAMPING;
        p.vy *= VELOCITY_DAMPING;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Draw proximity lines (skip on mobile)
      if (!skipLines) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST) {
              const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
              ctx.strokeStyle = particles[i].lineColor.replace(
                /[\d.]+\)$/,
                `${alpha})`
              );
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}
