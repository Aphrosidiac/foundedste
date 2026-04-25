"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.closest("a") ||
        t.closest("button") ||
        t.dataset.cursor === "grow"
      ) {
        hovering.current = true;
        dot.classList.add("cursor-grow");
      }
    };

    const onOut = () => {
      if (hovering.current) {
        hovering.current = false;
        dot.classList.remove("cursor-grow");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div className="cursor-dot w-8 h-8 rounded-full bg-bone" />
      </div>
      <style jsx global>{`
        @media (min-width: 768px) {
          * { cursor: none !important; }
        }
        .cursor-dot {
          transition: width 0.3s ease, height 0.3s ease, margin 0.3s ease;
        }
        .cursor-grow .cursor-dot {
          width: 80px;
          height: 80px;
          margin-left: -24px;
          margin-top: -24px;
        }
      `}</style>
    </>
  );
}
