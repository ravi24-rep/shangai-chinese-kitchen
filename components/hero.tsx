"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight, Phone, UtensilsCrossed, Star } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { useMobile } from "@/hooks/use-mobile";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";

/* ═══════════════════════════════════════════════════════════════════
   IMAGE ASSETS — All verified & working
   ═══════════════════════════════════════════════════════════════════ */
const IMAGES = {
  bgTexture: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=1920",
  mainDish: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=1920",
};

/* ═══════════════════════════════════════════════════════════════════
   LAYER 3 — Floating circular food elements (right side)
   Each has a unique float animation to feel alive
   ═══════════════════════════════════════════════════════════════════ */
const FLOATING_FOODS = [
  {
    src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80",
    alt: "Hakka Noodles",
    size: "w-36 h-36 md:w-48 md:h-48",
    position: "top-[12%] right-[5%] md:right-[8%]",
    rotate: 6,
    floatDuration: 7,
    floatRange: 15,
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&q=80",
    alt: "Steamed Dumplings",
    size: "w-28 h-28 md:w-40 md:h-40",
    position: "top-[48%] right-[2%] md:right-[4%]",
    rotate: -8,
    floatDuration: 8,
    floatRange: 12,
    delay: 0.3,
  },
  {
    src: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=80",
    alt: "Chicken Fried Rice",
    size: "w-24 h-24 md:w-32 md:h-32",
    position: "top-[28%] right-[18%] md:right-[22%]",
    rotate: 12,
    floatDuration: 6,
    floatRange: 10,
    delay: 0.6,
  },
  {
    src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80",
    alt: "Hot Soup",
    size: "w-20 h-20 md:w-28 md:h-28",
    position: "top-[72%] right-[12%] md:right-[16%]",
    rotate: -4,
    floatDuration: 9,
    floatRange: 8,
    delay: 0.9,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   PARTICLE SYSTEM — Memoized to prevent recalculation on re-render
   ═══════════════════════════════════════════════════════════════════ */
function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 1.5,
        left: Math.random() * 100,
        top: 20 + Math.random() * 80,
        driftX: (Math.random() - 0.5) * 40,
        driftY: -(60 + Math.random() * 100),
        peakOpacity: Math.random() * 0.35 + 0.1,
        duration: Math.random() * 7 + 4,
        delay: Math.random() * 8,
        color:
          i % 4 === 0
            ? "rgba(193,18,31,0.45)"
            : i % 4 === 1
            ? "rgba(255,215,0,0.3)"
            : i % 4 === 2
            ? "rgba(255,140,0,0.3)"
            : "rgba(255,255,255,0.15)",
      })),
    [count]
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO COMPONENT — Ultimate Cinematic Multi-Layer Parallax
   ═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  // Mobile multiplier: reduce parallax intensity on small screens
  const m = isMobile ? 0.3 : 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring for ultra-buttery scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Mouse-based depth interaction (disabled on mobile)
  const mouse = useMouseParallax(!isMobile);
  const mouseXBg   = useTransform(mouse.x, [-1, 1], [-8, 8]);   // bg shifts 8px
  const mouseYBg   = useTransform(mouse.y, [-1, 1], [-5, 5]);
  const mouseXFood = useTransform(mouse.x, [-1, 1], [15, -15]); // food shifts opposite
  const mouseYFood = useTransform(mouse.y, [-1, 1], [10, -10]);

  /* ── LAYER 1: Background Texture (slowest — 0.15x) ── */
  const bgY      = useTransform(smoothProgress, [0, 1], ["0%", `${15 * m}%`]);
  const bgScale  = useTransform(smoothProgress, [0, 1], [1, 1 + 0.05 * m]);

  /* ── LAYER 2: Main Hero Image (medium — 0.3x) ── */
  const mainY       = useTransform(smoothProgress, [0, 1], ["0%", `${40 * m}%`]);
  const mainScale   = useTransform(smoothProgress, [0, 1], [1, 1 + 0.1 * m]);
  const mainOpacity = useTransform(smoothProgress, [0, 0.8], [0.65, 0.25]);

  /* ── LAYER 3: Floating Foods (faster — 0.5x) ── */
  const foodY       = useTransform(smoothProgress, [0, 1], ["0%", `${80 * m}%`]);
  const foodOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0.4]);

  /* ── LAYER 4: Decorative / Particles (fastest — 0.7x) ── */
  const particleY = useTransform(smoothProgress, [0, 1], ["0%", `${120 * m}%`]);

  /* ── CONTENT: Stays mostly fixed, fades out gently ── */
  const contentOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const contentY       = useTransform(smoothProgress, [0, 0.35], ["0%", "-12%"]);

  /* ── FOREGROUND GLOW (extreme depth) ── */
  const glowY = useTransform(smoothProgress, [0, 1], ["0%", "-150%"]);

  const particles = useParticles(isMobile ? 10 : 30);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: "110vh" }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1 — Dark Textured Background  (depth 0.15x)
          Slowest movement · slight blur for depth-of-field
          ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
      <motion.div
        style={{ y: bgY, scale: bgScale, x: mouseXBg, translateY: mouseYBg }}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <img
          src={IMAGES.bgTexture}
          alt=""
          aria-hidden="true"
          className="w-full h-[130%] object-cover opacity-[0.12] blur-[2px]"
          loading="eager"
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 2 — Main Hero Image  (depth 0.3x)
          Medium speed · zoom on scroll · cinematic overlay
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: mainY, scale: mainScale, opacity: mainOpacity }}
        className="absolute inset-0 z-[2] will-change-transform"
      >
        <motion.img
          src={IMAGES.mainDish}
          alt="Signature Chinese Dishes"
          className="w-full h-[150%] object-cover object-center"
          loading="eager"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Multi-directional cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-transparent" style={{ height: "30%" }} />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 3 — Floating Circular Food Elements  (depth 0.5x)
          Right side · hover glow · independent float animations
          Hidden on mobile for perf, shown on md+
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: foodY, opacity: foodOpacity, x: mouseXFood, translateY: mouseYFood }}
        className="absolute inset-0 z-[5] pointer-events-none will-change-transform hidden md:block"
      >
        {FLOATING_FOODS.map((food, i) => (
          <motion.div
            key={i}
            className={`absolute ${food.position} ${food.size} pointer-events-auto cursor-pointer group`}
            initial={{ opacity: 0, scale: 0.6, rotate: food.rotate }}
            animate={{ opacity: 1, scale: 1, rotate: food.rotate }}
            transition={{ duration: 1.4, delay: 0.6 + food.delay, ease }}
          >
            {/* Outer glow ring on hover */}
            <div className="absolute -inset-3 rounded-full bg-[#C1121F]/0 group-hover:bg-[#C1121F]/15 transition-all duration-500 blur-xl scale-110" />

            {/* Food image with float animation */}
            <motion.div
              className="w-full h-full relative"
              animate={{
                y: [-food.floatRange, food.floatRange, -food.floatRange],
                rotate: [food.rotate - 2, food.rotate + 2, food.rotate - 2],
              }}
              transition={{
                duration: food.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={food.src}
                alt={food.alt}
                className="w-full h-full object-cover rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-white/[0.08] group-hover:border-[#FFD700]/30 transition-all duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Inner shine effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
            </motion.div>

            {/* Label tooltip on hover */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-[0.15em] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {food.alt}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 4 — Decorative: Particles + Steam + Chopstick Lines
          Fastest movement · creates maximum depth separation
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: particleY }}
        className="absolute inset-0 z-[3] pointer-events-none overflow-hidden will-change-transform"
      >
        {/* Ember / Spice Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: p.color,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: [0, p.driftY],
              x: [0, p.driftX],
              opacity: [0, p.peakOpacity, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}

        {/* Steam Wisps */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute right-[22%] bottom-[8%] w-48 h-72 rounded-full bg-white/[0.03] blur-3xl"
              animate={{ y: [0, -90], opacity: [0.03, 0, 0.03] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[38%] bottom-[3%] w-36 h-56 rounded-full bg-white/[0.025] blur-3xl"
              animate={{ y: [0, -70], opacity: [0.025, 0, 0.025] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <motion.div
              className="absolute right-[10%] bottom-[15%] w-24 h-40 rounded-full bg-[#C1121F]/[0.02] blur-2xl"
              animate={{ y: [0, -50], opacity: [0.02, 0, 0.02] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </>
        )}

        {/* Decorative Chopstick Lines */}
        {!isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.06, scaleY: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
              className="absolute right-[30%] top-[5%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-[#FFD700] to-transparent origin-top"
            />
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.04, scaleY: 1 }}
              transition={{ duration: 2, delay: 1.8 }}
              className="absolute right-[32%] top-[8%] w-[1px] h-[35%] bg-gradient-to-b from-transparent via-[#FFD700] to-transparent origin-top rotate-[5deg]"
            />
          </>
        )}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          CONTENT LAYER — Fixed with scroll-linked fade out
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-[10] max-w-7xl mx-auto px-6 w-full pt-24 will-change-transform"
      >
        <div className="max-w-2xl">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/75 backdrop-blur-xl text-[11px] font-bold uppercase tracking-[0.25em] mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F] animate-pulse" />
            <UtensilsCrossed size={13} className="text-[#C1121F]" />
            Authentic Chinese Kitchen
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-extrabold leading-[1.02] mb-8 tracking-tight"
            style={{ textShadow: "0 4px 80px rgba(0,0,0,0.5)" }}
          >
            Authentic{" "}
            <span className="text-[#C1121F] relative inline-block">
              Chinese
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C1121F] to-[#C1121F]/40 rounded-full origin-left"
              />
            </span>
            <br />
            Flavours in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500]">
              Maduravoyal
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="text-base md:text-lg text-white/55 mb-12 leading-[1.8] max-w-md font-light"
          >
            Experience the true taste of the East. From fiery Schezwan to
            delicate dim sum, premium Chinese cuisine at honest prices.
          </motion.p>

          {/* CTA Buttons with hover glow */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#menu"
              className="group relative w-full sm:w-auto bg-[#C1121F] text-white px-10 py-[18px] rounded-2xl font-bold text-base transition-all duration-500 flex items-center justify-center gap-2 overflow-hidden"
            >
              {/* Animated glow behind button */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#C1121F] to-[#ff2a3a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute -inset-1 bg-[#C1121F]/40 blur-2xl rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2">
                Explore Menu
                <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </a>
            <a
              href={`tel:${RESTAURANT_DATA.phoneClean}`}
              className="group w-full sm:w-auto bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl text-white px-10 py-[18px] rounded-2xl font-bold text-base transition-all duration-500 flex items-center justify-center gap-3 border border-white/[0.08] hover:border-[#FFD700]/25"
            >
              <span className="absolute -inset-1 bg-[#FFD700]/0 group-hover:bg-[#FFD700]/5 blur-2xl rounded-2xl transition-all duration-500" />
              <Phone size={18} className="text-white/45 group-hover:text-[#FFD700] transition-colors duration-300 relative" />
              <span className="relative">{RESTAURANT_DATA.phone}</span>
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease }}
            className="mt-16 flex items-center gap-8 border-t border-white/[0.06] pt-8 max-w-md"
          >
            <div className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-1.5">
                {RESTAURANT_DATA.rating}
                <Star size={18} className="text-[#FFD700] fill-[#FFD700]" />
              </span>
              <span className="text-[9px] text-white/30 uppercase tracking-[0.25em] font-semibold">
                {RESTAURANT_DATA.reviewCount} Reviews
              </span>
            </div>
            <div className="w-px h-10 bg-white/[0.06]" />
            <div className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                {RESTAURANT_DATA.priceRange.split(" ")[0]}
              </span>
              <span className="text-[9px] text-white/30 uppercase tracking-[0.25em] font-semibold">
                Per Person
              </span>
            </div>
            <div className="w-px h-10 bg-white/[0.06]" />
            <div className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-display font-bold text-[#25D366]">
                Open
              </span>
              <span className="text-[9px] text-white/30 uppercase tracking-[0.25em] font-semibold">
                Until 11 PM
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════
          FOREGROUND DEPTH GLOWS — Move fastest for maximum 3D
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -bottom-48 -left-48 w-[550px] h-[550px] bg-[#C1121F]/10 rounded-full blur-[140px] pointer-events-none z-[6] will-change-transform"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute -bottom-32 right-[5%] w-72 h-72 bg-[#FFD700]/[0.06] rounded-full blur-[100px] pointer-events-none z-[6] will-change-transform"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute top-[20%] right-[15%] w-48 h-48 bg-[#C1121F]/[0.04] rounded-full blur-[80px] pointer-events-none z-[4] will-change-transform"
      />

      {/* ═══════════════════════════════════════════════════════════════
          SCROLL INDICATOR
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2"
      >
        <span className="text-[9px] text-white/20 uppercase tracking-[0.35em] font-semibold">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[18px] h-[28px] rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], height: [4, 8, 4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] rounded-full bg-white/30"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
