"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

function useScrollVelocity() {
  const velocity = useMotionValue(0);
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 1);
      const dy = window.scrollY - lastY.current;
      velocity.set(dy / dt);
      lastY.current = window.scrollY;
      lastTime.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [velocity]);

  return velocity;
}

function MarqueeRow({
  direction = 1,
  baseSpeed = 0.5,
  children,
  className,
}: {
  direction?: number;
  baseSpeed?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const scrollVelocity = useScrollVelocity();
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.scrollWidth / 2);
    }
  }, []);

  useAnimationFrame((_, delta) => {
    const scrollBoost = Math.abs(scrollVelocity.get()) * 3;
    const speed = (baseSpeed + scrollBoost) * direction;
    let newX = x.get() - speed * (delta / 16);

    if (direction === 1 && newX <= -trackWidth) {
      newX += trackWidth;
    } else if (direction === -1 && newX >= 0) {
      newX -= trackWidth;
    }

    x.set(newX);
  });

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={trackRef}
        className={`flex whitespace-nowrap ${className ?? ""}`}
        style={{ x }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

function Cross() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mx-6 shrink-0 opacity-40 self-center"
    >
      <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Diamond() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="mx-6 shrink-0 opacity-30 self-center"
    >
      <rect
        x="5"
        y="0"
        width="7.07"
        height="7.07"
        transform="rotate(45 5 0)"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function PrimaryContent() {
  return (
    <>
      <span className="font-display text-[clamp(3rem,8vw,7rem)] tracking-tight text-bone uppercase shrink-0">
        FOUNDED
      </span>
      <Cross />
      <span className="font-display text-[clamp(3rem,8vw,7rem)] tracking-tight text-stroke uppercase shrink-0">
        Dark Art
      </span>
      <Diamond />
      <span className="font-display text-[clamp(3rem,8vw,7rem)] tracking-tight text-bone uppercase shrink-0">
        Streetwear
      </span>
      <Cross />
      <span className="font-display text-[clamp(3rem,8vw,7rem)] tracking-tight text-ember/30 uppercase shrink-0">
        EST. 2025
      </span>
      <Diamond />
      <span className="font-display text-[clamp(3rem,8vw,7rem)] tracking-tight text-stroke uppercase shrink-0">
        Born From
      </span>
      <Cross />
      <span className="font-display text-[clamp(3rem,8vw,7rem)] tracking-tight text-bone uppercase shrink-0">
        The Void
      </span>
      <Diamond />
    </>
  );
}

function SecondaryContent() {
  return (
    <>
      <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] tracking-[0.5em] text-ash/40 uppercase shrink-0">
        Hand Illustrated
      </span>
      <span className="text-ash/20 mx-8 shrink-0">/</span>
      <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] tracking-[0.5em] text-ash/40 uppercase shrink-0">
        Limited Edition
      </span>
      <span className="text-ash/20 mx-8 shrink-0">/</span>
      <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] tracking-[0.5em] text-ash/40 uppercase shrink-0">
        Malaysia
      </span>
      <span className="text-ash/20 mx-8 shrink-0">/</span>
      <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] tracking-[0.5em] text-ash/40 uppercase shrink-0">
        Dark Art Streetwear
      </span>
      <span className="text-ash/20 mx-8 shrink-0">/</span>
      <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] tracking-[0.5em] text-ash/40 uppercase shrink-0">
        Skulls &amp; Thorns
      </span>
      <span className="text-ash/20 mx-8 shrink-0">/</span>
      <span className="text-[clamp(0.65rem,1.2vw,0.85rem)] tracking-[0.5em] text-ash/40 uppercase shrink-0">
        From The Void
      </span>
      <span className="text-ash/20 mx-8 shrink-0">/</span>
    </>
  );
}

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const borderOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

  return (
    <motion.div
      ref={ref}
      className="py-10 md:py-16 border-y border-smoke/30 space-y-6 overflow-hidden"
      style={{ skewY: skew }}
    >
      <MarqueeRow direction={1} baseSpeed={0.8}>
        <PrimaryContent />
      </MarqueeRow>

      <motion.div
        className="h-[1px] mx-12"
        style={{
          background: `rgba(42,39,37,${borderOpacity.get()})`,
        }}
      />

      <MarqueeRow direction={-1} baseSpeed={0.4} className="items-center">
        <SecondaryContent />
      </MarqueeRow>
    </motion.div>
  );
}
