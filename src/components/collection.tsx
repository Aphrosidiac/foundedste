"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const products = [
  {
    name: "Thorned Awakening Polo",
    image: "/images/black-polo-tribal.jpg",
    price: "RM 189",
  },
  {
    name: "Skeletal Motion Polo",
    image: "/images/black-polo-skeleton.jpg",
    price: "RM 189",
  },
  {
    name: "Abyssal Mark Polo",
    image: "/images/navy-polo-front.jpg",
    price: "RM 189",
  },
  {
    name: "Thorned Crown Detail",
    image: "/images/skull-thorns.jpg",
    price: "RM 209",
    span: true,
  },
  {
    name: "Dark Ritual Polo",
    image: "/images/brown-polo-combo.jpg",
    price: "RM 199",
  },
  {
    name: "Checked Anatomy Shirt",
    image: "/images/check-shirt-back.jpg",
    price: "RM 219",
  },
  {
    name: "Venom Stripe Polo",
    image: "/images/grey-polo-back.jpg",
    price: "RM 179",
  },
  {
    name: "Abyssal Front",
    image: "/images/black-polo-front.jpg",
    price: "RM 189",
  },
  {
    name: "Anatomy Detail Shirt",
    image: "/images/check-shirt-detail.jpg",
    price: "RM 219",
  },
];

function ProductCard({
  product,
  index,
  span,
}: {
  product: (typeof products)[0];
  index: number;
  span?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`group ${span ? "col-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-smoke/5 ${
          span ? "aspect-[2/1]" : "aspect-[3/4]"
        }`}
      >
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            sizes={span ? "80vw" : "(max-width: 768px) 50vw, 30vw"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-void/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-xs tracking-[0.12em] text-bone/80 uppercase group-hover:text-bone transition-colors duration-500">
          {product.name}
        </h3>
        <span className="text-[11px] tracking-[0.1em] text-ash/60">
          {product.price}
        </span>
      </div>
    </motion.div>
  );
}

export function Collection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="collection" className="py-24 md:py-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <div ref={titleRef} className="mb-14 md:mb-20 flex items-end justify-between">
          <div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={titleInView ? { y: 0 } : {}}
                transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                className="block text-[10px] tracking-[0.5em] text-ash uppercase mb-4"
              >
                ( 001 )
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
                The Collection
              </motion.h2>
            </div>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="hidden md:block text-[10px] tracking-[0.3em] text-ash/40 uppercase"
          >
            {products.length} Pieces
          </motion.span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              span={product.span}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
