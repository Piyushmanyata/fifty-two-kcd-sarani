"use client";

import { motion } from "motion/react";

export function GoldLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`gold-glow h-px w-10 origin-left bg-champagne ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
