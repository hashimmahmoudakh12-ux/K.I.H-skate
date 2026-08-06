"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { INSTRUCTORS } from "@/lib/data";

export function Instructors() {
  return (
    <section id="instructors" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Your Coaches"
          title="The three behind K.I.H."
          description="Khyree, Ismael, and Hashim — the coaches your kid will actually ride with, every session."
        />

        <StaggerGroup
          stagger={0.1}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {INSTRUCTORS.map((coach) => (
            <StaggerItem key={coach.name}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-3xl border border-cream-100/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-teal-400/40 hover:bg-white/[0.04]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-teal-500/0 blur-3xl transition-colors duration-500 group-hover:bg-teal-500/25" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-700 font-display text-xl font-bold text-cream-50 ring-1 ring-cream-100/10 transition-transform duration-300 group-hover:scale-105">
                  {coach.initials}
                </div>

                <h3 className="relative mt-6 font-display text-xl font-semibold text-cream-50">
                  {coach.name}
                </h3>
                <p className="relative mt-1 text-xs font-medium uppercase tracking-wide text-gold-500">
                  {coach.role}
                </p>
                <p className="relative mt-4 text-[0.95rem] leading-relaxed text-cream-100/60">
                  {coach.bio}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
