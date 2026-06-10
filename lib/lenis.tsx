"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { ReactNode, useEffect } from "react";

export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (connection.connection?.saveData) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
