'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowDown, Shield, Sparkles } from 'lucide-react';
import posthog from 'posthog-js';

/* ---------- Dot Grid Canvas ---------- */
const DotGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DOT_SPACING = 28;
    const DOT_BASE_RADIUS = 1.8;
    const DOT_MAX_RADIUS = 5.5;
    const GLOW_RADIUS = 180;
    const BASE_COLOR = { r: 160, g: 178, b: 196 };
    const GLOW_COLOR = { r: 68, g: 162, b: 186 };
    const GLOW_COLOR_2 = { r: 82, g: 168, b: 136 };

    let dots: { x: number; y: number }[] = [];
    let width = 0;
    let height = 0;

    const buildDots = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          dots.push({ x, y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / GLOW_RADIUS);
        const radius =
          DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * t * t;
        const angle = Math.atan2(dy, dx);
        const blend = (Math.sin(angle * 2) + 1) / 2;

        const gc = {
          r: GLOW_COLOR.r + (GLOW_COLOR_2.r - GLOW_COLOR.r) * blend,
          g: GLOW_COLOR.g + (GLOW_COLOR_2.g - GLOW_COLOR.g) * blend,
          b: GLOW_COLOR.b + (GLOW_COLOR_2.b - GLOW_COLOR.b) * blend,
        };
        const r = Math.round(BASE_COLOR.r + (gc.r - BASE_COLOR.r) * t);
        const g = Math.round(BASE_COLOR.g + (gc.g - BASE_COLOR.g) * t);
        const b = Math.round(BASE_COLOR.b + (gc.b - BASE_COLOR.b) * t);
        const alpha = 0.5 + 0.5 * t;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();

        if (t > 0.3) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius + 4 + 6 * t, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${gc.r}, ${gc.g}, ${gc.b}, ${0.12 * t})`;
          ctx.fill();
        }
      }

      if (!shouldReduceMotion) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (shouldReduceMotion) draw();
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      if (shouldReduceMotion) draw();
    };

    const handleResize = () => {
      buildDots();
      if (shouldReduceMotion) draw();
    };

    buildDots();
    if (shouldReduceMotion) {
      draw();
    } else {
      animFrameRef.current = requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      aria-hidden="true"
      style={{ pointerEvents: 'auto' }}
    />
  );
};

/* ---------- Hero Section ---------- */
const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    posthog.capture('hero_cta_primary_clicked', { label: 'Request Early Access' });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWorkflow = () => {
    posthog.capture('hero_cta_secondary_clicked', { label: 'See How It Works' });
    const el = document.getElementById('workflow');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const MotionDiv = shouldReduceMotion ? 'div' : motion.div;

  return (
    <section
      id="hero"
      className="relative py-14 sm:py-18 lg:py-22 overflow-hidden min-h-[80vh] flex items-center"
    >
      <DotGridBackground />

      {/* Radial overlay for readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 42%, rgba(245,247,250,0.55), transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2] w-full pointer-events-none">
        <div className="max-w-3xl mx-auto text-center space-y-7 lg:space-y-9">
          {/* Badge */}
          <MotionDiv
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              },
            })}
          >
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-3 text-xs font-bold mb-4 inline-flex"
              style={{
                backgroundColor: 'hsl(196 55% 90%)',
                color: 'hsl(196 55% 38%)',
                border: '1px solid hsl(196 55% 80%)',
              }}
            >
              Built for Equity Research
            </Badge>
          </MotionDiv>

          {/* Headline */}
          <MotionDiv
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: {
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            })}
          >
            <h1
              data-testid="hero-headline"
              className="text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-7xl leading-[1.05] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-gloock), 'Gloock', serif",
                color: 'hsl(222 35% 12%)',
              }}
            >
              Stop Switching Tools{' '}
              Start
              <span style={{ color: 'hsl(196 55% 38%)' }}> Orchestrating</span>
            </h1>
          </MotionDiv>

          {/* Subheading */}
          <MotionDiv
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2, duration: 0.6 },
            })}
          >
            <p
              className="text-base md:text-lg lg:text-xl leading-relaxed max-w-[58ch] mx-auto"
              style={{ color: 'hsl(222 18% 34%)' }}
            >
              n4a is the AI workspace where financial researchers run the entire research workflow. 
              From data discovery to insight extraction to
              financial modelling to final report, without losing context.
            </p>
            <p
              className="text-base md:text-lg lg:text-xl leading-relaxed max-w-[58ch] mx-auto"
              style={{ color: 'hsl(222 18% 26%)' }}
            >
              Improve efficiency. Boost productivity.
            </p>
          </MotionDiv>

          {/* CTA buttons */}
          <MotionDiv
            className="flex flex-wrap gap-3 pt-2 justify-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3, duration: 0.6 },
            })}
          >
            <Button
              data-testid="hero-primary-cta-button"
              className="pointer-events-auto rounded-xl bg-[hsl(222_45%_16%)] text-white px-7 py-3 text-sm font-medium shadow-lg hover:bg-[hsl(222_45%_14%)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              onClick={scrollToContact}
            >
              Request Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              data-testid="hero-secondary-cta-button"
              variant="outline"
              className="pointer-events-auto rounded-xl border border-[hsl(214_20%_88%)] bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-medium hover:bg-[hsl(210_30%_95%)] transition-colors"
              onClick={scrollToWorkflow}
            >
              See How It Works
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </MotionDiv>

          {/* Trust markers */}
          <MotionDiv
            className="flex flex-wrap items-center gap-4 pt-4 justify-center"
            {...(!shouldReduceMotion && {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5, duration: 0.8 },
            })}
          >
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: 'hsl(222 12% 46%)' }}
            >
              <Shield
                className="h-3.5 w-3.5"
                style={{ color: 'hsl(162 45% 40%)' }}
              />
              <span>Source-linked research</span>
            </div>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: 'hsl(222 12% 46%)' }}
            >
              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: 'hsl(196 55% 38%)' }}
              />
              <span>Built for research teams</span>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
