"use client";

import { motion } from "framer-motion";
import {
  Medal,
  Shield,
  Sprout,
  Sparkles,
  Users,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { WHY_US } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  medal: Medal,
  shield: Shield,
  sprout: Sprout,
  sparkles: Sparkles,
  users: Users,
  trophy: Trophy,
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Why Ride With Us"
          title="Coaching built for real progression."
          description="Every session is designed around one goal: a kid who leaves more confident than they arrived — on the board and off it."
        />

        <StaggerGroup
          stagger={0.08}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_US.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-cream-100/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-gold-500/40 hover:bg-white/[0.04]"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-3xl transition-colors duration-500 group-hover:bg-gold-500/20" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cream-100/10 bg-ink-900 text-gold-500 transition-all duration-300 group-hover:scale-110 group-hover:border-gold-500/40">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>

                  <h3 className="relative mt-6 font-display text-xl font-semibold text-cream-50">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 text-[0.95rem] leading-relaxed text-cream-100/60">
                    {item.body}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
