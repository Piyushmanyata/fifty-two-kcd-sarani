"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ReactNode, useState } from "react";

export function MagneticButton({
  children,
  className = "",
  href,
  target,
  rel,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 12 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 12 });

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x, y }}
      onPointerDown={(event) => setIsTouch(event.pointerType === "touch")}
      onPointerMove={(event) => {
        if (reducedMotion || isTouch) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      target={target}
      rel={rel}
    >
      {children}
    </motion.a>
  );
}
