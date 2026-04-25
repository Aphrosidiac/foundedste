"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

function AnimatedCounter({
  value,
  suffix = "",
  inView,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function ContentBlock({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const start = 0.15 + index * 0.25;
  const peak = start + 0.12;
  const end = start + 0.25;

  const opacity = useTransform(
    progress,
    [start, peak, end, end + 0.05],
    [0, 1, 1, index === 2 ? 1 : 0]
  );
  const y = useTransform(
    progress,
    [start, peak, end, end + 0.05],
    [60, 0, 0, index === 2 ? 0 : -30]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}

export function Featured() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const clipPath = useTransform(
    clipProgress,
    (v) => `circle(${v}% at 50% 50%)`
  );

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const words = "Where the weight of darkness becomes wearable art".split(" ");

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full max-w-[1200px] mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left — image with clip-path reveal */}
          <div className="hidden md:block md:col-span-5 relative">
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ clipPath }}
            >
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="/images/skull-thorns.jpg"
                  alt="FOUNDED signature piece"
                  fill
                  className="object-cover scale-110"
                  sizes="40vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-void/10" />
            </motion.div>

            {/* Connecting line */}
            <motion.div
              className="absolute top-1/2 -right-8 h-[1px] bg-smoke/40 origin-left hidden lg:block"
              style={{ width: lineWidth }}
            />
          </div>

          {/* Right — scrolling content blocks */}
          <div className="md:col-span-6 md:col-start-7 relative h-[60vh]">
            {/* Block 1: Philosophy */}
            <ContentBlock index={0} progress={scrollYProgress}>
              <motion.span
                className="text-[10px] tracking-[0.5em] text-ash uppercase mb-6 block"
              >
                ( The Process )
              </motion.span>

              <p className="font-display text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.2] tracking-tight mb-8">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </span>
                ))}
              </p>

              <p className="text-ash text-sm leading-[1.8] tracking-wide max-w-md">
                Every FOUNDED piece begins as raw illustration — skulls, thorns,
                and organic forms drawn by hand before being translated onto
                fabric.
              </p>
            </ContentBlock>

            {/* Block 2: Method */}
            <ContentBlock index={1} progress={scrollYProgress}>
              <span className="text-[10px] tracking-[0.5em] text-ash uppercase mb-6 block">
                ( The Method )
              </span>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Illustration",
                    desc: "Each design is hand-drawn — skulls, thorns, anatomy rendered in ink before any garment is touched.",
                  },
                  {
                    step: "02",
                    title: "Selection",
                    desc: "We source thrifted polo shirts and classic silhouettes, choosing pieces with structure worth transforming.",
                  },
                  {
                    step: "03",
                    title: "Transfer",
                    desc: "Art meets fabric through screen printing and embroidery, consuming the garment with dark artistry.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 items-start">
                    <span className="font-display text-2xl text-ash/30 shrink-0 w-8">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-sm tracking-[0.15em] text-bone uppercase mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ash/60 leading-relaxed tracking-wide">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ContentBlock>

            {/* Block 3: Stats */}
            <ContentBlock index={2} progress={scrollYProgress}>
              <span className="text-[10px] tracking-[0.5em] text-ash uppercase mb-8 block">
                ( The Numbers )
              </span>

              <div ref={statsRef} className="grid grid-cols-3 gap-8">
                {[
                  { value: 100, suffix: "%", label: "Hand Illustrated" },
                  { value: 50, suffix: "+", label: "Pieces Created" },
                  { value: 1, suffix: "", label: "of One Runs", display: "LTD" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <span className="font-display text-[clamp(2rem,4vw,3.5rem)] text-bone block leading-none">
                      {stat.display ?? (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix}
                          inView={statsInView}
                        />
                      )}
                    </span>
                    <span className="text-[9px] tracking-[0.25em] text-ash/50 uppercase block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <motion.div className="mt-12 h-[1px] bg-smoke/20" />

              <p className="mt-8 text-ash text-sm leading-[1.8] tracking-wide max-w-md">
                Not decoration. Transformation. We take classic silhouettes and
                consume them with dark artistry — giving discarded garments a
                new, darker life.
              </p>
            </ContentBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
