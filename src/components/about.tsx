"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const manifestoLines = [
  { text: "We don't design for trends.", accent: false },
  { text: "We design for those who find", accent: false },
  { text: "beauty in darkness,", accent: true },
  { text: "who see art in the anatomy of decay,", accent: false },
  { text: "who wear their shadows", accent: false },
  { text: "on the outside.", accent: true },
  { text: "", accent: false },
  { text: "FOUNDED is not a brand.", accent: false },
  { text: "It is a mark.", accent: true },
];

function ManifestoLine({
  line,
  index,
  total,
  progress,
}: {
  line: (typeof manifestoLines)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / (total + 2);
  const end = (index + 1.5) / (total + 2);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [40, 0]);
  const blur = useTransform(progress, [start, end], [8, 0]);

  if (line.text === "") {
    return <div className="h-6 md:h-10" />;
  }

  return (
    <motion.p
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className={`font-display text-[clamp(1.3rem,3vw,2.5rem)] leading-[1.3] tracking-tight ${
        line.accent ? "text-bone" : "text-ash/70"
      }`}
    >
      {line.text}
    </motion.p>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const lineProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  const detailOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const detailY = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

  return (
    <section id="about" ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-7">
              <motion.span
                style={{
                  opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
                }}
                className="block text-[10px] tracking-[0.5em] text-ash uppercase mb-8"
              >
                ( 003 ) — Manifesto
              </motion.span>

              {manifestoLines.map((line, i) => (
                <ManifestoLine
                  key={i}
                  line={line}
                  index={i}
                  total={manifestoLines.length}
                  progress={lineProgress}
                />
              ))}
            </div>

            <motion.div
              className="hidden md:flex md:col-span-4 md:col-start-9 flex-col justify-end"
              style={{ opacity: detailOpacity, y: detailY }}
            >
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-[10px] tracking-[0.3em] text-ash uppercase block">
                    Origin
                  </span>
                  <p className="text-sm text-bone/50 leading-relaxed tracking-wide">
                    Born in Malaysia, FOUNDED emerges from the intersection of
                    dark illustration and streetwear culture. Every garment is a
                    canvas. Every print is a ritual.
                  </p>
                </div>

                <div className="h-[1px] bg-smoke/20" />

                <div className="space-y-3">
                  <span className="text-[10px] tracking-[0.3em] text-ash uppercase block">
                    Philosophy
                  </span>
                  <p className="text-sm text-bone/50 leading-relaxed tracking-wide">
                    We rework thrifted polo shirts and classic silhouettes,
                    transforming them with hand-rendered artwork — giving
                    discarded garments a new, darker life.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
