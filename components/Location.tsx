"use client";

import { motion } from "motion/react";
import { fadeUp, stagger } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";

export function Location() {
  const mapUrl =
    "https://www.google.com/maps?q=52%20Krishna%20Chandra%20Dey%20Sarani%2C%20Kolkata%20700053&output=embed";

  return (
    <section id="location" className="content-auto bg-ink px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="section-grid items-center">
          <div className="col-span-12 md:col-span-6">
            <motion.div className="eyebrow" {...fadeUp}>
              NEW ALIPORE
            </motion.div>
            <RevealText
              text="An address that needs no introduction."
              className="font-display mt-6 text-[clamp(2.2rem,5vw,4.5rem)] uppercase leading-tight tracking-[0.04em]"
            />
            <motion.p className="mt-9 max-w-xl text-lg leading-9 text-mist" {...stagger(2)}>
              New Alipore has spent six decades as one of South Kolkata&apos;s most
              quietly coveted addresses — tree-lined avenues, an established
              residential character, and minutes from Alipore, Behala, and the
              arterial routes to the airport and business districts. Krishna
              Chandra Dey Sarani sits inside its calm interior grid: a
              KMC-maintained frontage on a street that doesn&apos;t pass through, it
              arrives.
            </motion.p>
          </div>
          <motion.div
            className="premium-panel col-span-12 p-4 md:col-span-6 md:p-6"
            {...stagger(3)}
          >
            <div className="relative min-h-[420px] overflow-hidden border border-marble bg-ink md:min-h-[460px]">
              <iframe
                title="Map showing 52 Krishna Chandra Dey Sarani, Kolkata 700053"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="fullscreen"
                className="absolute inset-0 h-full w-full border-0 opacity-82 grayscale-[0.12] saturate-[0.9] contrast-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/52 to-ink/10" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/28 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-5 h-16 w-px bg-champagne gold-glow" />
                <div className="font-display max-w-md text-4xl uppercase leading-tight tracking-[0.08em]">
                  52 Krishna Chandra Dey Sarani
                </div>
                <p className="mt-5 max-w-md text-sm leading-7 text-bone/82">
                  Premises No. 52, Ward 081, Borough X, KMC, Kolkata 700053.
                </p>
                <a
                  href="https://maps.app.goo.gl/aC4NpSLZWuJ1xaeY8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clip-corner touch-target mt-7 inline-block bg-champagne px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-bone"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
