"use client";

import { motion } from "motion/react";
import { Counter } from "@/components/ui/Counter";
import { RevealText } from "@/components/ui/RevealText";
import { EASE, stagger } from "@/lib/animations";

const stats = [
  [6271, "sq ft super built-up"],
  [4, "private residences"],
  [4, "covered car parks"],
  [1, "owner"],
];

export function Offering() {
  return (
    <section id="offering" className="content-auto bg-bone px-5 py-24 text-ink md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="section-grid items-end">
          <div className="col-span-12 md:col-span-7">
            <motion.div className="eyebrow" {...stagger(0)}>
              THE OFFERING
            </motion.div>
            <RevealText
              text="The entire vertical, undivided."
              className="font-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)] uppercase leading-tight tracking-[0.04em]"
            />
          </div>
          <motion.p
            className="col-span-12 max-w-xl text-base leading-8 text-ink/65 md:col-span-5"
            {...stagger(2)}
          >
            Four independent residences, one street-level base, one private
            lift-served stack, and one buyer for the whole address.
          </motion.p>
        </div>
        <div className="mt-14 grid grid-cols-2 overflow-hidden border-y border-ink/15 md:mt-16 md:grid-cols-4">
          {stats.map(([value, label], index) => (
            <motion.div
              key={label as string}
              className="border-ink/15 px-4 py-9 odd:border-r md:border-r md:px-8 md:py-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: EASE, delay: index * 0.08 }}
            >
              <div className="font-display text-4xl text-champagne md:text-7xl">
                <Counter value={value as number} />
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.22em] text-ink/55">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-b border-ink/15 pb-5 text-sm uppercase tracking-[0.16em] text-ink/62"
          {...stagger(4)}
        >
          <span>Lift to all floors</span>
          <span>2 staff quarters</span>
          <span>Open terrace at 4th floor</span>
          <span>KMC frontage road</span>
        </motion.div>
      </div>
    </section>
  );
}
