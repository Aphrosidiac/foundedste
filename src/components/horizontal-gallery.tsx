"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  { src: "/images/black-polo-front.jpg", alt: "Black polo front", caption: "Abyssal Mark — Front" },
  { src: "/images/skull-thorns.jpg", alt: "Skull thorns detail", caption: "Thorned Crown — Detail" },
  { src: "/images/check-shirt-detail.jpg", alt: "Check shirt detail", caption: "Anatomy Check — Detail" },
  { src: "/images/brown-polo-combo.jpg", alt: "Brown polo combo", caption: "Dark Ritual — Combo" },
  { src: "/images/grey-polo-back.jpg", alt: "Grey polo back", caption: "Striped Venom — Back" },
];

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-6 md:px-12 mb-8 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.5em] text-ash uppercase">
            ( Gallery )
          </span>
          <div className="w-32 h-[1px] bg-smoke/30 relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-bone/50"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <motion.div className="flex gap-6 md:gap-8 pl-6 md:pl-12" style={{ x }}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative shrink-0 w-[75vw] md:w-[40vw] group"
              style={{
                y: useTransform(
                  scrollYProgress,
                  [i * 0.15, i * 0.15 + 0.3],
                  [60, 0]
                ),
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-smoke/10">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 75vw, 40vw"
                />
                <div className="absolute inset-0 bg-void/10 group-hover:bg-void/0 transition-colors duration-700" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] text-ash uppercase">
                  {img.caption}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-ash/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
