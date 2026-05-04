"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const footerLinks = [
  { label: "Instagram", href: "https://instagram.com/founded.ste" },
  { label: "Shopee", href: "#" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-24 md:py-32 px-6 md:px-12 border-t border-smoke/20"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          <div className="md:col-span-6">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{
                  duration: 1,
                  ease: [0.77, 0, 0.175, 1],
                }}
                className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tight uppercase"
              >
                GET IN
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.77, 0, 0.175, 1],
                }}
                className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.85] tracking-tight text-stroke uppercase"
              >
                TOUCH
              </motion.div>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-8 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-4"
            >
              <span className="text-[10px] tracking-[0.3em] text-ash uppercase block">
                Follow
              </span>
              {footerLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.1,
                  }}
                  className="block text-sm tracking-[0.15em] text-bone hover:text-ember transition-colors duration-500 uppercase"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="md:col-span-2 md:col-start-11 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
              className="space-y-4"
            >
              <span className="text-[10px] tracking-[0.3em] text-ash uppercase block">
                Inquiries
              </span>
              <a
                href="https://instagram.com/founded.ste"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-[0.1em] text-bone hover:text-ember transition-colors duration-500"
              >
                @founded.ste
              </a>
              <p className="text-[10px] tracking-[0.1em] text-ash/40 mt-2 leading-relaxed">
                DM for purchases,<br />commissions &amp; collabs
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 md:mt-32 pt-8 border-t border-smoke/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] text-ash/50 uppercase">
            &copy; 2025 FOUNDED. All rights reserved.
          </span>
          <span className="text-[10px] tracking-[0.3em] text-ash/50 uppercase">
            Dark Art Streetwear — Malaysia
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
