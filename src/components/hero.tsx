"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?/\\|{}[]<>";

function ScrambleText({
  text,
  delay = 0,
  className,
  strokeClass,
}: {
  text: string;
  delay?: number;
  className?: string;
  strokeClass?: boolean;
}) {
  const [displayed, setDisplayed] = useState(text.replace(/[^ ]/g, " "));
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    const duration = 1200;
    const intervalMs = 30;
    const totalFrames = duration / intervalMs;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          const charProgress = i / text.length;
          if (progress > charProgress + 0.3) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayed(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
      scramble();
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, scramble]);

  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={started ? { clipPath: "inset(0 0% 0 0)" } : {}}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className={`${className ?? ""} ${strokeClass ? "text-stroke" : ""}`}
    >
      <span className="inline-block font-mono">{displayed}</span>
    </motion.div>
  );
}

function HeroLine({
  text,
  delay,
  strokeClass,
}: {
  text: string;
  delay: number;
  strokeClass?: boolean;
}) {
  return (
    <div className="overflow-hidden relative">
      <ScrambleText
        text={text}
        delay={delay}
        strokeClass={strokeClass}
        className="font-display text-[clamp(3.5rem,13vw,12rem)] leading-[0.85] tracking-tight uppercase"
      />
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] flex items-end overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <motion.div
          className="w-full h-full"
          style={{ filter: useTransform(imgBrightness, (v) => `brightness(${v})`) }}
        >
          <Image
            src="/images/skull-thorns.jpg"
            alt="FOUNDED skull thorns artwork"
            fill
            className="object-cover"
            quality={90}
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/20" />
        <div className="absolute inset-0 bg-void/30" />
      </motion.div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-12 pb-28 md:pb-20"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            className="mb-6"
          >
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-ash uppercase block mb-4">
              Drop 001 — Awakening
            </span>
          </motion.div>

          <HeroLine text="FROM" delay={800} />
          <HeroLine text="THE VOID" delay={1100} strokeClass />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-8 md:mt-12 flex items-end justify-between"
          >
            <p className="text-ash text-xs md:text-sm max-w-xs leading-relaxed tracking-wide">
              Hand-illustrated dark art on reimagined silhouettes.
              <br />
              Each piece born from chaos, crafted with precision.
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-ash text-xs tracking-[0.3em] hidden md:flex flex-col items-center gap-2"
            >
              <span>SCROLL</span>
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
                <path d="M6 0V22M6 22L1 17M6 22L11 17" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
