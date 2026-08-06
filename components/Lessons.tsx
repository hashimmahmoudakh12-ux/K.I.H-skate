"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import { LESSONS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Lessons() {
  return (
    <section id="lessons" className="relative bg-ink-950 py-28 sm:py-36">
      <div id="camps" className="absolute -top-24" />
      <div className="container">
        <SectionHeading
          eyebrow="Lessons & Camps"
          title="Pick the format that fits your rider."
          description="Every path — private, small group, or camp — runs on the same curriculum and the same coach-to-rider attention to safety."
        />

        <StaggerGroup
          stagger={0.1}
          className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {LESSONS.map((plan) => (
            <StaggerItem key={plan.name}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-colors duration-300",
                  plan.featured
                    ? "border-gold-500/50 bg-gradient-to-b from-gold-600/[0.12] to-ink-900 shadow-glow"
                    : "border-cream-100/10 bg-white/[0.02] hover:border-cream-100/25"
                )}
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-gold-500 px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-wide text-ink-950">
                    Most Popular
                  </span>
                )}

                <h3 className="font-display text-2xl font-semibold text-cream-50">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-sm text-cream-100/55">
                  {plan.description}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-cream-50">
                    {plan.price}
                  </span>
                  <span className="text-sm text-cream-100/50">{plan.unit}</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-cream-100/75">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.featured
                            ? "bg-gold-500 text-ink-950"
                            : "bg-cream-100/10 text-cream-100"
                        )}
                      >
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={cn(
                    "group/btn mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide transition-all duration-300 ease-premium",
                    plan.featured
                      ? "bg-cream-100 text-ink-950 hover:-translate-y-0.5 hover:shadow-glow"
                      : "border border-cream-100/20 text-cream-50 hover:border-cream-100/50 hover:bg-white/5"
                  )}
                >
                  {plan.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
