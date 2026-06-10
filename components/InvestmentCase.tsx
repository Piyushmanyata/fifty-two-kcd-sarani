"use client";

import { motion } from "motion/react";
import { stagger } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";

const columns = [
  [
    "Total control.",
    "No society, no committee, no shared decisions. One owner sets the rules for 6,271 sq ft — occupy it, rent it floor by floor, or customize the entire layout.",
  ],
  [
    "Sanctioned & Underway.",
    "Sidestep the regulatory and planning risks. All KMC building permits are fully sanctioned and construction is active. You get a brand-new, modern structure without the wait of pre-development timelines.",
  ],
  [
    "A compound for one family.",
    "Three full-floor 3 BHKs and a terraced penthouse under one roof — generations together, doors apart. Acquired early, layouts can be seamlessly merged or tailored to your family's exact needs.",
  ],
];

export function InvestmentCase() {
  return (
    <section className="content-auto bg-bone px-5 py-24 text-ink md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div className="eyebrow" {...stagger(0)}>
          THE CASE
        </motion.div>
        <RevealText
          text="Why a whole building changes the mathematics."
          className="font-display mt-6 max-w-5xl text-[clamp(2.2rem,5vw,4.5rem)] uppercase leading-tight tracking-[0.04em]"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-0">
          {columns.map(([title, copy], index) => (
            <motion.div
              key={title}
              className="border-ink/15 md:border-l md:px-10 first:md:border-l-0 first:md:pl-0"
              {...stagger(index + 1)}
            >
              <h3 className="font-display text-3xl uppercase tracking-[0.06em]">
                {title}
              </h3>
              <p className="mt-6 text-base leading-8 text-ink/68">{copy}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          className="font-accent mx-auto mt-16 max-w-3xl text-center text-3xl italic leading-[1.45] text-ink/80"
          {...stagger(5)}
        >
          Assets like this don&apos;t list often. They change hands quietly — usually
          before anyone hears.
        </motion.p>
      </div>
    </section>
  );
}
