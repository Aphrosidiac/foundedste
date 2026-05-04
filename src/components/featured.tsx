"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export function Featured() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.95]);

  const words = "Where the weight of darkness becomes wearable art".split(" ");

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          <div className="md:col-span-5 md:col-start-1 relative">
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ y: imageY, scale: imageScale }}
            >
              <Image
                src="/images/archive/hoodie.jpg"
                alt="FOUNDED custom hoodie with cybersigilism artwork"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-void/10" />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                duration: 1.5,
                ease: [0.77, 0, 0.175, 1],
                delay: 0.3,
              }}
              className="absolute -bottom-4 -right-4 w-32 h-32 border border-smoke/20 origin-left"
            />
          </div>

          <div
            ref={textRef}
            className="md:col-span-6 md:col-start-7 space-y-12"
          >
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                className="block text-[10px] tracking-[0.5em] text-ash uppercase"
              >
                ( The Process )
              </motion.span>
            </div>

            <p className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.2] tracking-tight">
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + i * 0.05,
                      ease: [0.77, 0, 0.175, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-ash text-sm leading-[1.8] tracking-wide max-w-md"
            >
              Every FOUNDED piece begins as raw illustration — skulls, thorns,
              and biomechanical forms drawn by hand. We take thrifted polo shirts,
              classic silhouettes, and denim — then consume them with dark artistry
              through screen printing, hand-painting, and custom rework.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-6"
            >
              <div className="flex flex-col">
                <span className="font-display text-3xl text-bone">1/1</span>
                <span className="text-[10px] tracking-[0.3em] text-ash uppercase mt-1">
                  Every Piece
                </span>
              </div>
              <div className="w-[1px] h-12 bg-smoke/30" />
              <div className="flex flex-col">
                <span className="font-display text-3xl text-bone">40+</span>
                <span className="text-[10px] tracking-[0.3em] text-ash uppercase mt-1">
                  Pieces Sold
                </span>
              </div>
              <div className="w-[1px] h-12 bg-smoke/30" />
              <div className="flex flex-col">
                <span className="font-display text-3xl text-bone">MYS</span>
                <span className="text-[10px] tracking-[0.3em] text-ash uppercase mt-1">
                  Based Brand
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
