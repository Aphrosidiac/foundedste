"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function SectionDivider({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="px-6 md:px-12 py-4">
      <div className="max-w-[1400px] mx-auto flex items-center gap-6">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
          className="flex-1 h-[1px] bg-smoke/30 origin-left"
        />
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-[9px] tracking-[0.5em] text-ash/30 uppercase shrink-0"
          >
            {label}
          </motion.span>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
          className="w-24 h-[1px] bg-smoke/30 origin-right"
        />
      </div>
    </div>
  );
}
