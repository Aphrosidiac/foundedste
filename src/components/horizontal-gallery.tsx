"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { src: "/images/black-polo-front.jpg", alt: "Black polo front", caption: "Abyssal Mark", detail: "Front View" },
  { src: "/images/skull-thorns.jpg", alt: "Skull thorns detail", caption: "Thorned Crown", detail: "Detail" },
  { src: "/images/check-shirt-detail.jpg", alt: "Check shirt detail", caption: "Anatomy Check", detail: "Close-Up" },
  { src: "/images/brown-polo-combo.jpg", alt: "Brown polo combo", caption: "Dark Ritual", detail: "Full Piece" },
  { src: "/images/grey-polo-back.jpg", alt: "Grey polo back", caption: "Striped Venom", detail: "Back View" },
];

function GalleryCard({
  image,
  index,
  scrollProgress,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  scrollProgress: MotionValue<number>;
}) {
  const yOffset = useTransform(
    scrollProgress,
    [index * 0.12, index * 0.12 + 0.4],
    [index % 2 === 0 ? 40 : -40, 0]
  );

  return (
    <motion.div
      className="relative shrink-0 w-[60vw] md:w-[32vw] group"
      style={{ y: yOffset }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-smoke/5">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
          sizes="(max-width: 768px) 60vw, 32vw"
        />
        <div className="absolute inset-0 bg-void/15 group-hover:bg-void/0 transition-colors duration-500" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-void/80 via-void/30 to-transparent">
          <span className="block text-[10px] tracking-[0.3em] text-ash/60 uppercase mb-1">
            {image.detail}
          </span>
          <span className="block text-sm tracking-[0.15em] text-bone uppercase">
            {image.caption}
          </span>
        </div>

        <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] text-bone/30">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </motion.div>
  );
}

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-62%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const labelOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <motion.div
          className="px-8 md:px-16 mb-8 flex items-center justify-between"
          style={{ opacity: labelOpacity }}
        >
          <span className="text-[10px] tracking-[0.5em] text-ash/50 uppercase">
            ( Gallery )
          </span>
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-[10px] tracking-[0.3em] text-ash/30 uppercase">
              {galleryImages.length} Images
            </span>
            <div className="w-24 md:w-40 h-[1px] bg-smoke/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-bone/30"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
        </motion.div>

        {/* Gallery track */}
        <motion.div
          className="flex gap-4 md:gap-6 pl-8 md:pl-16 pr-8 items-center"
          style={{ x }}
        >
          {galleryImages.map((img, i) => (
            <GalleryCard
              key={img.src}
              image={img}
              index={i}
              scrollProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Footer hint */}
        <motion.div
          className="px-8 md:px-16 mt-8 flex justify-between items-center"
          style={{ opacity: labelOpacity }}
        >
          <span className="text-[10px] tracking-[0.3em] text-ash/20 uppercase hidden md:block">
            Scroll to explore
          </span>

          {/* Dot pagination */}
          <div className="flex gap-2">
            {galleryImages.map((_, i) => {
              const dotStart = i / galleryImages.length;
              const dotEnd = (i + 1) / galleryImages.length;
              return (
                <GalleryDot
                  key={i}
                  progress={scrollYProgress}
                  start={dotStart}
                  end={dotEnd}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GalleryDot({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const safeStart = Math.max(0, start);
  const mid1 = safeStart + 0.01;
  const mid2 = Math.max(mid1 + 0.01, end - 0.01);
  const safeEnd = Math.min(1, mid2 + 0.01);

  const opacity = useTransform(
    progress,
    [safeStart, mid1, mid2, safeEnd],
    [0.2, 0.8, 0.8, 0.2]
  );
  const scale = useTransform(
    progress,
    [safeStart, mid1, mid2, safeEnd],
    [1, 1.5, 1.5, 1]
  );

  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-bone"
      style={{ opacity, scale }}
    />
  );
}
