"use client";

import { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
}

export default function ParticleCanvas({
  className = "",
  particleColor = "rgba(197, 168, 92, 0.45)", // Brand gold
  lineColor = "rgba(11, 34, 64, 0.08)", // Subtle navy line
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle settings
    const particleCount = Math.min(Math.floor((width * height) / 14000), 55);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      glowColor: string;
    }> = [];

    const goldColors = [
      "rgba(197, 168, 92, ",
      "rgba(223, 202, 137, ",
      "rgba(11, 34, 64, ",
      "rgba(158, 129, 56, ",
    ];

    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 0.35;
      const baseAlpha = isGold ? 0.35 + Math.random() * 0.45 : 0.15 + Math.random() * 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2.5 + 1.2,
        alpha: baseAlpha,
        baseAlpha,
        glowColor: isGold ? "rgba(197, 168, 92, " : "rgba(19, 53, 96, ",
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(197, 168, 92, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction glow & repel
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        let currentAlpha = p.baseAlpha;
        let currentSize = p.size;

        if (mdist < 100) {
          const force = (1 - mdist / 100);
          p.x += (mdx / mdist) * force * 1.5;
          p.y += (mdy / mdist) * force * 1.5;
          currentAlpha = Math.min(1, p.baseAlpha + force * 0.5);
          currentSize = p.size + force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `${p.glowColor}${currentAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(197, 168, 92, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
