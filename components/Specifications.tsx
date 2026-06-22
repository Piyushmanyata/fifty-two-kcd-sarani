"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";

const specs = [
  ["Address", "Premises No. 52, Krishna Chandra Dey Sarani, New Alipore"],
  ["Jurisdiction", "Ward 081, P.S. New Alipore, Borough X, KMC"],
  ["Structure", "G+4 premium residential building"],
  ["Status", "Sanctioned & Under Active Construction"],
  ["Total saleable", "6,271 sq ft across 4 residences"],
  ["Parking", "4 covered car parks"],
  ["Lift", "1400 x 1350 lift to all floors"],
  ["Frontage", "KMC black-top road"],
  ["Sale model", "Entire building only - all floors to one buyer"],
  ["Price", "Price on Request"],
];

export function Specifications() {
  return (
    <section className="content-auto bg-ink px-5 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="section-grid">
          <div className="col-span-12 md:col-span-5">
            <motion.div className="eyebrow" {...fadeUp}>
              BUILDING FACTS
            </motion.div>
            <RevealText
              text="The complete address, in one holding."
              className="font-display mt-6 text-[clamp(2rem,4vw,3.8rem)] uppercase leading-tight tracking-[0.04em]"
            />
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="border-y border-marble">
              {specs.map(([label, value], index) => (
                <motion.div
                  key={label}
                  className="grid gap-2 border-b border-marble py-5 last:border-b-0 md:grid-cols-[180px_1fr]"
                  {...stagger(index)}
                >
                  <div className="text-xs uppercase tracking-[0.22em] text-mist">
                    {label}
                  </div>
                  <div className="text-base leading-7 text-bone">{value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
