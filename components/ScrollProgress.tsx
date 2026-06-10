"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      className="gold-glow fixed left-0 top-0 z-50 hidden h-screen w-px origin-top bg-champagne md:block"
      style={{ scaleY }}
      aria-hidden="true"
    />
  );
}
