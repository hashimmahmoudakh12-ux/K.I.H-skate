"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { Scene } from "@/components/media/Scene";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-24 h-[130%]">
        <Scene variant="teal" art="carve" className="h-full w-full" />
        <div className="absolute inset-0 bg-skateboards bg-repeat opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/40" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container relative z-10 pb-24 pt-24 sm:pb-8 sm:pt-28"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream-100/15 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-500" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-cream-100/70">
              Now Booking — Fall Sessions
            </span>
          </motion.div>

          <h1 className="font-display text-[13vw] font-bold leading-[0.98] tracking-tight text-cream-50 sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {["Learn to Skate", "with Confidence."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  {i === 1 ? <span className="text-gold-500">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-cream-100/70 sm:text-xl"
          >
            Beginner to advanced coaching built around real progression —
            structured, safe, and genuinely fun. Every rider gets a plan,
            every lesson gets them closer to landing it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a href="#contact" className="btn-primary group">
              Book Your Lesson
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#about" className="btn-secondary group">
              <Play className="h-3.5 w-3.5 fill-current" />
              Learn More
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-10 flex items-center gap-6 border-t border-cream-100/10 pt-6 sm:mt-14 sm:gap-12 sm:pt-7"
          >
            {[
              ["500+", "Riders Coached"],
              ["4.9/5", "Parent Rating"],
              ["10 yrs", "On the Boards"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
                  {stat}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-cream-100/50">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#why-us"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="focus-ring absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream-100/50 transition-colors hover:text-cream-100"
        aria-label="Scroll to next section"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
