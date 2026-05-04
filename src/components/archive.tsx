"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const archivePieces = [
  {
    name: "Custom Hoodie",
    image: "/images/archive/hoodie.jpg",
    image2: "/images/archive/hoodie-2.jpg",
    size: "XL",
    price: "RM 89",
    type: "Cybersigilism Print",
  },
  {
    name: "Custom Shirt",
    image: "/images/archive/shirt-chambray.jpg",
    image2: "/images/archive/shirt-chambray-2.jpg",
    size: "M/L",
    price: "RM 59",
    type: "Chambray Rework",
  },
  {
    name: "Custom Shirt",
    image: "/images/archive/shirt-ls.jpg",
    image2: "/images/archive/shirt-ls-2.jpg",
    size: "L/XL",
    price: "RM 59",
    type: "Long Sleeve Rework",
  },
  {
    name: "Custom Polo",
    image: "/images/archive/polo-striped.jpg",
    image2: "/images/archive/polo-striped-2.jpg",
    size: "M",
    price: "RM 59",
    type: "Striped Polo Rework",
  },
  {
    name: "Zipper Shirt",
    image: "/images/archive/zipper-shirt.jpg",
    image2: "/images/archive/zipper-shirt-2.jpg",
    size: "L/XL",
    price: "RM 59",
    type: "Zip Front Rework",
  },
  {
    name: "Custom Shirt",
    image: "/images/archive/shirt-dark.jpg",
    image2: "/images/archive/shirt-dark-2.jpg",
    size: "M/L",
    price: "RM 59",
    type: "Dark Rework",
  },
  {
    name: "Custom Polo",
    image: "/images/archive/polo-xl.jpg",
    size: "XL/2XL",
    price: "RM 59",
    type: "Polo Tee Rework",
  },
  {
    name: "Custom Polo",
    image: "/images/archive/polo-m.jpg",
    size: "M",
    price: "RM 59",
    type: "Polo Tee Rework",
  },
  {
    name: "Custom Shirt",
    image: "/images/archive/shirt-s.jpg",
    image2: "/images/archive/shirt-s-2.jpg",
    size: "S",
    price: "RM 59",
    type: "Button-Up Rework",
  },
  {
    name: "Hand-Painted Polo",
    image: "/images/collection/painted-polo.jpg",
    image2: "/images/collection/painted-polo-2.jpg",
    size: "M/L",
    price: "RM 129",
    type: "Hand-Painted",
  },
];

function ArchiveCard({
  piece,
  index,
}: {
  piece: (typeof archivePieces)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-smoke/5">
        <Image
          src={piece.image}
          alt={piece.name}
          fill
          className="object-cover transition-all duration-700 ease-out"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {piece.image2 && (
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={piece.image2}
                  alt={`${piece.name} detail`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div className="absolute inset-0 bg-void/10 group-hover:bg-void/0 transition-colors duration-500" />

        <div className="absolute top-3 left-3 px-2 py-0.5 bg-void/60 backdrop-blur-sm border border-smoke/20">
          <span className="text-[8px] tracking-[0.3em] text-ember/80 uppercase">Sold</span>
        </div>

        <div className="absolute top-3 right-3 text-[9px] tracking-[0.2em] text-bone/20">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-3 space-y-0.5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[11px] tracking-[0.1em] text-bone/70 uppercase">
            {piece.name}
          </h3>
          <span className="text-[10px] tracking-[0.08em] text-ash/40">
            {piece.price}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] tracking-[0.08em] text-ash/30 uppercase">
            {piece.type}
          </span>
          <span className="text-ash/15">|</span>
          <span className="text-[9px] tracking-[0.08em] text-ash/30 uppercase">
            Size {piece.size}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Archive() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="archive" className="py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div ref={titleRef} className="mb-14 md:mb-20 flex items-end justify-between">
          <div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={titleInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                className="block text-[10px] tracking-[0.5em] text-ash uppercase mb-4"
              >
                ( 002 )
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
                className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tracking-tight uppercase"
              >
                Archive
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="hidden md:flex flex-col items-end gap-1"
          >
            <span className="text-[10px] tracking-[0.3em] text-ash/40 uppercase">
              Past Drops
            </span>
            <span className="text-[10px] tracking-[0.2em] text-ash/25 uppercase">
              All pieces 1of1 — All sold
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {archivePieces.map((piece, i) => (
            <ArchiveCard key={`${piece.name}-${i}`} piece={piece} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
