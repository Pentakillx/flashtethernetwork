"use client";

import { useRef, useEffect } from "react";

function createGlowImage(
  radius: number,
  color1: string,
  color2: string
): HTMLCanvasElement {
  const size = radius * 2;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    radius,
    radius,
    0,
    radius,
    radius,
    radius
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.35, color2);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0,
      height = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const PARTICLE_COUNT = 95;
    const MAX_DIST = 150;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const MAX_TRAVELERS = 60;
    const OPACITY_TIERS = 5;
    const SMALL_R = 8,
      LARGE_R = 13;

    const smallGlow = createGlowImage(
      SMALL_R,
      "rgba(130,255,160,0.95)",
      "rgba(34,197,94,0.45)"
    );
    const largeGlow = createGlowImage(
      LARGE_R,
      "rgba(210,255,225,1)",
      "rgba(80,255,150,0.65)"
    );

    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const speed = 0.22 + Math.random() * 0.42;
      const angle = Math.random() * Math.PI * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    type Traveler = { i: number; j: number; t: number; speed: number };
    const travelers: Traveler[] = [];
    let lastTravelerTime = 0;

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);

    let rafId: number;
    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, width, height);

      // Move particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      // Find connections
      const connections: [number, number][] = [];
      const tierBuckets: [number, number][][] = Array.from(
        { length: OPACITY_TIERS },
        () => []
      );

      for (let a = 0; a < PARTICLE_COUNT; a++) {
        for (let b = a + 1; b < PARTICLE_COUNT; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MAX_DIST_SQ) {
            const proximity = 1 - Math.sqrt(distSq) / MAX_DIST;
            const tier = Math.min(
              Math.floor(proximity * OPACITY_TIERS),
              OPACITY_TIERS - 1
            );
            tierBuckets[tier].push([a, b]);
            connections.push([a, b]);
          }
        }
      }

      // Draw lines by tier
      ctx.lineWidth = 0.8;
      ctx.globalCompositeOperation = "source-over";
      for (let tier = 0; tier < OPACITY_TIERS; tier++) {
        if (tierBuckets[tier].length === 0) continue;
        const opacity = ((tier + 0.5) / OPACITY_TIERS) * 0.42;
        ctx.strokeStyle = `rgba(34,197,94,${opacity.toFixed(3)})`;
        ctx.beginPath();
        for (const [a, b] of tierBuckets[tier]) {
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
        }
        ctx.stroke();
      }

      // Draw small particles (glow dots)
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        ctx.drawImage(
          smallGlow,
          p.x - SMALL_R,
          p.y - SMALL_R,
          SMALL_R * 2,
          SMALL_R * 2
        );
      }

      // Spawn new travelers
      if (
        timestamp - lastTravelerTime > 110 &&
        connections.length > 0 &&
        travelers.length < MAX_TRAVELERS
      ) {
        lastTravelerTime = timestamp;
        const pick = () =>
          connections[Math.floor(Math.random() * connections.length)];
        const [i, j] = pick();
        travelers.push({ i, j, t: 0, speed: 0.007 + Math.random() * 0.013 });
        if (Math.random() < 0.4 && travelers.length < MAX_TRAVELERS) {
          const [i2, j2] = pick();
          travelers.push({
            i: i2,
            j: j2,
            t: 0,
            speed: 0.007 + Math.random() * 0.013,
          });
        }
      }

      // Draw and advance travelers
      for (let k = travelers.length - 1; k >= 0; k--) {
        travelers[k].t += travelers[k].speed;
        if (travelers[k].t >= 1) {
          travelers.splice(k, 1);
          continue;
        }
        const { i, j, t } = travelers[k];
        const x = particles[i].x + (particles[j].x - particles[i].x) * t;
        const y = particles[i].y + (particles[j].y - particles[i].y) * t;
        ctx.drawImage(
          largeGlow,
          x - LARGE_R,
          y - LARGE_R,
          LARGE_R * 2,
          LARGE_R * 2
        );
      }

      ctx.globalCompositeOperation = "source-over";
    };

    draw(0);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
  );
}
