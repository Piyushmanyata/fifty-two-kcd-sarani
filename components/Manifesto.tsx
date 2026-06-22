"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { fadeUp } from "@/lib/animations";

const quote =
  "Most people buy an apartment. A few buy a floor. Almost no one gets to buy the address itself.";

function Word({ word, index, total }: { word: string; index: number; total: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "start 44%"],
  });
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, index / total - 0.18), Math.min(1, index / total + 0.18)],
    [0.15, 1],
  );
  return (
    <motion.span ref={ref} style={reducedMotion ? undefined : { opacity }}>
      {word}{" "}
    </motion.span>
  );
}

export function Manifesto() {
  const words = quote.split(" ");

  return (
    <section className="bg-ink px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-accent text-[clamp(1.75rem,4vw,2.5rem)] italic leading-[1.5] text-bone">
          {words.map((word, index) => (
            <Word key={`${word}-${index}`} word={word} index={index} total={words.length} />
          ))}
        </p>
        <motion.p
          className="mx-auto mt-12 max-w-2xl text-base leading-8 text-mist md:text-lg"
          {...fadeUp}
        >
          Fifty Two is an upcoming G+4 boutique residence in the heart of New
          Alipore, currently under active construction with all KMC building
          sanctions fully approved. Comprising three full-floor 3 BHK homes, a
          terraced penthouse, four covered car parks, and staff infrastructure,
          the property is offered as a single, indivisible whole. Acquired at
          this stage, it provides an unparalleled opportunity to customize layouts
          and bespoke finishes before completion.
        </motion.p>
      </div>
    </section>
  );
}
