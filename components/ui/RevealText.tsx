"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/animations";

export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  accentLast = false,
  load = false,
  baseDelay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  accentLast?: boolean;
  load?: boolean;
  baseDelay?: number;
}) {
  const reducedMotion = useReducedMotion();
  const lines = text.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${accentLast && index === lines.length - 1 ? "text-champagne" : ""}`}
            initial={load ? (reducedMotion ? { opacity: 0 } : { y: "105%" }) : false}
            animate={load ? (reducedMotion ? { opacity: 1 } : { y: 0 }) : undefined}
            whileInView={!load ? (reducedMotion ? { opacity: 1 } : { y: 0 }) : undefined}
            viewport={!load ? { once: true, amount: 0.05 } : undefined}
            transition={{
              duration: reducedMotion ? 0.3 : 1,
              ease: EASE,
              delay: reducedMotion ? 0 : baseDelay + index * 0.09,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
