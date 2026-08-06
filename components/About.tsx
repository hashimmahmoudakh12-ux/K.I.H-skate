"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Scene } from "@/components/media/Scene";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="container relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Scene variant="deep" art="grind" className="h-full w-full" label="Riverside Skate Park" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-6 -right-6 hidden w-56 rounded-3xl border border-cream-100/10 bg-ink-950/90 p-5 shadow-premium backdrop-blur-xl sm:block"
            >
              <p className="font-display text-3xl font-bold text-gold-500">10+</p>
              <p className="mt-1 text-sm text-cream-100/60">
                years coaching every level, from first push to first competition.
              </p>
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="section-heading-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              About K.I.H.
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-cream-50 sm:text-5xl">
              Built by riders, run for your kid.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-lg leading-relaxed text-cream-100/65">
              K.I.H. started with a simple idea: skateboarding should be
              taught with the same care as any other sport — real
              fundamentals, real safety, real encouragement. No shouting, no
              guesswork, no kid left standing at the edge of the ramp
              wondering what to do next.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-4 text-lg leading-relaxed text-cream-100/65">
              Today we run private lessons, small groups, and seasonal camps
              for beginners through advanced riders — all built around one
              belief: confidence is a skill, and it&apos;s one we can coach.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 grid grid-cols-2 gap-6 border-t border-cream-100/10 pt-8 sm:grid-cols-3">
              {[
                ["500+", "Riders coached"],
                ["1,200+", "Lessons taught"],
                ["100%", "Helmet policy"],
              ].map(([stat, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-bold text-cream-50">{stat}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-cream-100/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
