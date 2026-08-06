"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND, EXPERIENCE_LEVELS } from "@/lib/data";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-2xl border border-cream-100/12 bg-white/[0.03] px-4 py-3.5 text-cream-50 placeholder:text-cream-100/35 transition-colors duration-200 focus:border-flame-500/60 focus:bg-white/[0.05] focus-ring";

const labelClasses = "mb-2 block text-xs font-medium uppercase tracking-wide text-cream-100/50";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-900 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="container relative grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr,1.3fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="section-heading-eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-flame-500" />
              Book Your Lesson
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-cream-50 sm:text-5xl">
              Let&apos;s get them rolling.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-100/60">
              Tell us a bit about your rider and we&apos;ll follow up within
              24 hours to lock in the perfect lesson time.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 space-y-5">
              {[
                { icon: Phone, label: "Call or text", value: BRAND.phone },
                { icon: Mail, label: "Email", value: BRAND.email },
                { icon: MapPin, label: "Location", value: BRAND.address },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream-100/10 bg-white/[0.03] text-flame-500">
                    <row.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-cream-100/40">
                      {row.label}
                    </p>
                    <p className="text-cream-50">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-3xl border border-cream-100/10 bg-ink-950/60 p-6 shadow-premium backdrop-blur-sm sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[380px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flame-500/15 text-flame-500">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-cream-50">
                  Request sent!
                </h3>
                <p className="mt-3 max-w-xs text-cream-100/60">
                  We&apos;ll be in touch within 24 hours to schedule your
                  lesson. Get the helmet ready.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary mt-8"
                >
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Parent / Guardian Name
                    </label>
                    <input id="name" name="name" type="text" required placeholder="Jamie Rivera" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email
                    </label>
                    <input id="email" name="email" type="email" required placeholder="jamie@email.com" className={inputClasses} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone
                    </label>
                    <input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="childAge" className={labelClasses}>
                      Child&apos;s Age
                    </label>
                    <input id="childAge" name="childAge" type="number" min={3} max={18} required placeholder="9" className={inputClasses} />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className={labelClasses}>
                    Experience Level
                  </label>
                  <select id="experience" name="experience" required defaultValue="" className={cn(inputClasses, "appearance-none")}>
                    <option value="" disabled>
                      Select experience level
                    </option>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <option key={level} value={level} className="bg-ink-900">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your rider — goals, availability, questions..."
                    className={cn(inputClasses, "resize-none")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary group w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? "Sending..." : "Book Your Lesson"}
                  <Send className={cn("h-4 w-4 transition-transform duration-300", !submitting && "group-hover:translate-x-1")} />
                </button>
                <p className="text-center text-xs text-cream-100/40">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
