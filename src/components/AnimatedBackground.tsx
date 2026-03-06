"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

interface GradientBlob {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const blobsRef = useRef<GradientBlob[]>([]);
    const reducedMotionRef = useRef(false);

    const initParticles = useCallback((width: number, height: number) => {
        const isMobile = width < 768;
        const count = isMobile ? 25 : 55;
        const particles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1,
            });
        }
        particlesRef.current = particles;
    }, []);

    const initBlobs = useCallback((width: number, height: number) => {
        blobsRef.current = [
            {
                x: width * 0.3,
                y: height * 0.3,
                vx: 0.15,
                vy: 0.1,
                radius: Math.min(width, height) * 0.35,
                color: "rgba(99, 102, 241, 0.04)",
            },
            {
                x: width * 0.7,
                y: height * 0.6,
                vx: -0.12,
                vy: 0.08,
                radius: Math.min(width, height) * 0.3,
                color: "rgba(139, 92, 246, 0.035)",
            },
            {
                x: width * 0.5,
                y: height * 0.8,
                vx: 0.1,
                vy: -0.13,
                radius: Math.min(width, height) * 0.25,
                color: "rgba(6, 182, 212, 0.03)",
            },
        ];
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMotionRef.current = mql.matches;
        const handleMotionChange = (e: MediaQueryListEvent) => {
            reducedMotionRef.current = e.matches;
        };
        mql.addEventListener("change", handleMotionChange);

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            ctx.scale(dpr, dpr);
            initParticles(window.innerWidth, window.innerHeight);
            initBlobs(window.innerWidth, window.innerHeight);
        };

        resize();
        window.addEventListener("resize", resize);

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;

            ctx.clearRect(0, 0, w, h);

            if (reducedMotionRef.current) {
                // Static gradient fallback
                const grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.6);
                grad.addColorStop(0, "rgba(99, 102, 241, 0.06)");
                grad.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
                grad.addColorStop(1, "transparent");
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                return;
            }

            // Gradient blobs
            for (const blob of blobsRef.current) {
                blob.x += blob.vx;
                blob.y += blob.vy;
                if (blob.x < -blob.radius || blob.x > w + blob.radius) blob.vx *= -1;
                if (blob.y < -blob.radius || blob.y > h + blob.radius) blob.vy *= -1;

                const grad = ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.radius
                );
                grad.addColorStop(0, blob.color);
                grad.addColorStop(1, "transparent");
                ctx.fillStyle = grad;
                ctx.fillRect(
                    blob.x - blob.radius,
                    blob.y - blob.radius,
                    blob.radius * 2,
                    blob.radius * 2
                );
            }

            // Particles
            const particles = particlesRef.current;
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(148, 163, 230, ${p.opacity})`;
                ctx.fill();
            }

            // Connecting lines
            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(148, 163, 230, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", resize);
            mql.removeEventListener("change", handleMotionChange);
        };
    }, [initParticles, initBlobs]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ pointerEvents: "none", zIndex: 0 }}
            aria-hidden="true"
        />
    );
}
