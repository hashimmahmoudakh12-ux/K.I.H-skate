"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cream-100/15">
              <motion.span
                className="absolute inset-0 rounded-full border-t-2 border-gold-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="h-2 w-2 rounded-full bg-gold-500" />
            </div>
            <p className="font-display text-xs uppercase tracking-[0.35em] text-cream-100/50">
              K.I.H.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
