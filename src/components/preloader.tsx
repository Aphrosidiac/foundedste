"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1200);
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-void flex flex-col items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="font-display text-[clamp(2rem,6vw,5rem)] tracking-[0.3em] text-bone uppercase mb-8">
              FOUNDED
            </div>
            <div className="w-48 h-[1px] bg-smoke mx-auto relative overflow-hidden">
              <motion.div
                className="h-full bg-bone absolute left-0 top-0"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-4 text-ash text-xs tracking-[0.5em] font-mono">
              {count.toString().padStart(3, "0")}
            </div>
          </motion.div>

          <div className="absolute bottom-12 left-8 text-[10px] tracking-[0.3em] text-ash uppercase">
            Dark Art Streetwear
          </div>
          <div className="absolute bottom-12 right-8 text-[10px] tracking-[0.3em] text-ash uppercase">
            EST. MMXXV
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
