"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/animations";

const marks = ["1", "2", "3", "4", "52"];

export function Preloader() {
  const reducedMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("skip-preloader")) {
      return;
    }
    setShow(true);
    const timer = window.setTimeout(() => {
      setShow(false);
    }, reducedMotion ? 1100 : 2700);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="text-center">
            <div className="relative h-24 w-40 overflow-hidden">
              {marks.map((mark, index) => (
                <motion.div
                  key={mark}
                  className="font-display absolute inset-0 grid place-items-center text-6xl tracking-[0.18em] text-bone"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={
                    reducedMotion
                      ? { opacity: [0, 1, 1, 0] }
                      : {
                          opacity: [0, 1, 1, 0],
                          y: [20, 0, 0, -20],
                        }
                  }
                  transition={{
                    duration: 0.62,
                    delay: index * 0.18,
                    ease: EASE,
                  }}
                >
                  {mark}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="gold-glow mx-auto mt-5 h-px w-40 origin-left bg-champagne"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <motion.div
              className="font-display mt-10 text-sm tracking-[0.12em] text-bone"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.12em" }}
              transition={{ delay: 1.25, duration: 0.6, ease: EASE }}
            >
              FIFTY TWO
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
