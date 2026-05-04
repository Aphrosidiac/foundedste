"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const lookbookImages = [
  { src: "/images/collection/painted-polo.jpg", alt: "Hand-painted polo on concrete" },
  { src: "/images/collection/painted-jeans-2.jpg", alt: "Hand-painted jeans front" },
  { src: "/images/collection/painted-polo-4.jpg", alt: "Hand-painted thorn artwork close-up" },
  { src: "/images/collection/painted-jeans-3.jpg", alt: "Hand-painted jeans side view" },
  { src: "/images/collection/painted-cap-2.jpg", alt: "Hand-painted cap detail" },
];

function TiltImage({
  image,
  index,
}: {
  image: (typeof lookbookImages)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const tiltX = useSpring(rawTiltX, springConfig);
  const tiltY = useSpring(rawTiltY, springConfig);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rawTiltX.set(((e.clientY - centerY) / rect.height) * -8);
    rawTiltY.set(((e.clientX - centerX) / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  };

  const isLarge = index === 0 || index === 3;
  const isOffset = index === 1 || index === 4;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 120 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.4,
        delay: (index % 3) * 0.15,
        ease: [0.77, 0, 0.175, 1],
      }}
      className={`relative ${
        isLarge
          ? "col-span-1 md:col-span-2 aspect-[16/10]"
          : "col-span-1 aspect-[3/4]"
      } ${isOffset ? "md:mt-32" : ""}`}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="w-full h-full overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
        }}
      >
        <motion.div className="w-full h-full" style={{ y }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover scale-[1.15]"
            sizes={isLarge ? "100vw" : "50vw"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-void/10 hover:bg-void/0 transition-colors duration-700" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="absolute bottom-4 left-4 text-[9px] tracking-[0.3em] text-bone/50 uppercase"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Lookbook() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="lookbook" className="py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="mb-16 md:mb-24 flex items-end justify-between">
          <div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={titleInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                className="block text-[10px] tracking-[0.5em] text-ash uppercase mb-4"
              >
                ( 003 )
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
                Lookbook
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block text-ash text-xs tracking-wider max-w-[280px] text-right leading-relaxed"
          >
            From thrifted reworks to hand-painted originals — every
            piece carries the mark of dark artistry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {lookbookImages.map((image, i) => (
            <TiltImage key={image.src} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
