"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const commissionExamples = [
  { src: "/images/collection/painted-cap.jpg", alt: "Hand-painted cap", label: "Custom Cap" },
  { src: "/images/collection/painted-jeans-3.jpg", alt: "Hand-painted jeans", label: "Custom Jeans" },
  { src: "/images/collection/painted-polo-4.jpg", alt: "Hand-painted polo", label: "Custom Polo" },
];

export function Commission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const videoRef = useRef<HTMLDivElement>(null);
  const videoInView = useInView(videoRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0.1, 0.4], [0.92, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <section
      id="commission"
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-7">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={titleInView ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                  className="block text-[10px] tracking-[0.5em] text-ash uppercase mb-4"
                >
                  ( Open for Work )
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={titleInView ? { y: 0 } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.77, 0, 0.175, 1],
                  }}
                  className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight uppercase"
                >
                  Commission
                </motion.h2>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 1 }}
              className="md:col-span-4 md:col-start-9"
            >
              <p className="text-ash text-sm leading-[1.8] tracking-wide">
                Got a piece you want transformed? We take your garments — polos,
                shirts, denim, caps — and turn them into hand-painted, one-of-a-kind
                art pieces. Every commission is unique.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          ref={videoRef}
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="relative aspect-video md:aspect-[21/9] overflow-hidden bg-smoke/5 mb-16 md:mb-24"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/commission-reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-void/20" />

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <span className="text-[10px] tracking-[0.3em] text-bone/50 uppercase block mb-2">
              Process
            </span>
            <span className="font-display text-lg md:text-2xl text-bone tracking-tight uppercase">
              100% Made with Love
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {commissionExamples.map((example, i) => (
            <CommissionCard key={example.src} example={example} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <span className="text-[10px] tracking-[0.5em] text-ash/40 uppercase">
              Interested?
            </span>
            <a
              href="https://instagram.com/founded.ste"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-smoke/30 hover:border-ember/40 transition-all duration-500"
            >
              <span className="text-xs tracking-[0.2em] text-bone uppercase group-hover:text-ember transition-colors duration-500">
                DM on Instagram
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ash group-hover:text-ember transition-colors duration-500">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CommissionCard({
  example,
  index,
}: {
  example: (typeof commissionExamples)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-smoke/5">
        <Image
          src={example.src}
          alt={example.alt}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-void/10 group-hover:bg-transparent transition-colors duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-void/70 via-void/20 to-transparent">
          <span className="text-xs tracking-[0.15em] text-bone uppercase">
            {example.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
