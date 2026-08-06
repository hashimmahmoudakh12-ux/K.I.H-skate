"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Scene } from "@/components/media/Scene";

const GALLERY_ITEMS = [
  { art: "carve", variant: "ember", label: "Street Session", span: "row-span-2" },
  { art: "ollie", variant: "dusk", label: "First Ollie", span: "" },
  { art: "ramp", variant: "deep", label: "Mini Ramp", span: "" },
  { art: "wheels", variant: "teal", label: "Gear Check", span: "row-span-2" },
  { art: "grind", variant: "teal", label: "Ledge Work", span: "" },
  { art: "flip", variant: "ember", label: "Flip Tricks", span: "" },
  { art: "carve", variant: "deep", label: "Group Lesson", span: "" },
  { art: "ramp", variant: "teal", label: "Camp Day", span: "row-span-2" },
] as const;

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = () => setActiveIndex(null);
  const prev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <section id="gallery" className="relative bg-ink-950 py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from the park."
          description="A look at the sessions, the small wins, and the tricks landed along the way."
        />

        <div className="mt-16 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 0.06} className={item.span}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="focus-ring group relative h-full w-full overflow-hidden rounded-2xl"
                aria-label={`Open image: ${item.label}`}
              >
                <div className="h-full w-full transition-transform duration-700 ease-premium group-hover:scale-110">
                  <Scene variant={item.variant} art={item.art} className="h-full w-full" />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-display text-sm font-medium text-cream-50">
                    {item.label}
                  </span>
                </div>
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-cream-50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md sm:p-10"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              <Scene
                variant={GALLERY_ITEMS[activeIndex].variant}
                art={GALLERY_ITEMS[activeIndex].art}
                label={GALLERY_ITEMS[activeIndex].label}
                className="h-full w-full"
              />
            </motion.div>

            <button
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="focus-ring absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/15 bg-white/5 text-cream-50 transition-colors hover:bg-white/10 sm:right-8 sm:top-8"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="focus-ring absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream-100/15 bg-white/5 text-cream-50 transition-colors hover:bg-white/10 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="focus-ring absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream-100/15 bg-white/5 text-cream-50 transition-colors hover:bg-white/10 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
