"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { floorPlans, contact } from "@/lib/property";
import { EASE, fadeUp } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";

export function FloorPlans() {
  const [active, setActive] = useState(floorPlans[0].key);
  const plan = floorPlans.find((item) => item.key === active) ?? floorPlans[0];

  return (
    <section id="residences" className="content-auto hairline-grid bg-slate px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div className="eyebrow" {...fadeUp}>
          THE RESIDENCES
        </motion.div>
        <RevealText
          text="Drawn by Collage Architects."
          className="font-display mt-6 max-w-4xl text-[clamp(2.2rem,5vw,4.5rem)] uppercase leading-tight tracking-[0.04em]"
        />
        <div className="mt-12 flex flex-wrap gap-8 border-b border-marble">
          {floorPlans.map((item) => (
            <button
              key={item.key}
              className="touch-target relative pb-4 font-display text-sm uppercase tracking-[0.16em] text-bone/70 transition hover:text-bone md:tracking-[0.2em]"
              onClick={() => setActive(item.key)}
            >
              {item.label}
              {active === item.key ? (
                <motion.span
                  className="absolute bottom-0 left-0 h-px w-full bg-champagne"
                  layoutId="tab-rule"
                />
              ) : null}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div
            key={plan.key}
            className="relative aspect-[.72] border border-marble bg-ink p-3 text-left shadow-2xl shadow-ink/35 md:aspect-[.92]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={plan.image}
              alt={`${plan.title} architectural drawing`}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-contain p-3"
            />
          </motion.div>
          <motion.div
            key={`${plan.key}-table`}
            className="premium-panel p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          >
            <div className="font-display text-3xl uppercase tracking-[0.08em]">
              {plan.title}
            </div>
            <div className="mt-3 text-sm uppercase tracking-[0.18em] text-champagne">
              {plan.area}
            </div>
            <div className="mt-8">
              {plan.rows.map(([room, size]) => (
                <div
                  key={room}
                  className="grid grid-cols-[1fr_auto] gap-5 border-t border-marble py-4 text-sm"
                >
                  <span className="text-mist">{room}</span>
                  <span className="tabular text-right text-bone">{size}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm italic text-mist">
              All areas super built-up. Dimensions per architectural drawings.
            </p>
            <a
              href={contact.floorPlans}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm uppercase tracking-[0.18em] text-champagne"
            >
              Request full drawings on WhatsApp →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
