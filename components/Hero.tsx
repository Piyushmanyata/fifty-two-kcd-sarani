"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { contact } from "@/lib/property";
import { EASE } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        initial={reducedMotion ? { opacity: 0 } : { scale: 1.04, filter: "blur(8px)" }}
        animate={reducedMotion ? { opacity: 1 } : { scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={reducedMotion ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="FIFTY TWO building facade at 52 Krishna Chandra Dey Sarani"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/66 via-ink/22 to-ink/94" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(201,169,106,0.2),transparent_34%)]" />
      <div className="absolute inset-0 bg-ink/24" />
      <motion.div
        className="section-grid relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-24 pt-28 md:px-8 md:pb-28"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="relative col-span-12 w-full min-w-0 max-w-[calc(100vw-2.5rem)] overflow-hidden md:col-span-8 md:max-w-none">
          <motion.div
            className="gold-glow absolute -left-5 top-1 hidden h-[86%] w-px origin-top bg-champagne md:block"
            initial={reducedMotion ? { scaleY: 0 } : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 2.4, ease: EASE }}
          />
          <motion.div
            className="eyebrow"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: EASE }}
          >
            NEW ALIPORE · KOLKATA 700053
          </motion.div>
          <RevealText
            as="h1"
            text={"ONE BUILDING.\nONE OWNER.\nFIFTY TWO."}
            accentLast
            load
            baseDelay={2.8}
            className="font-display mt-7 text-[clamp(2.55rem,6.2vw,6.25rem)] uppercase leading-[0.92] tracking-[0.04em] drop-shadow-[0_18px_46px_rgba(0,0,0,0.45)] md:[&>span>span]:whitespace-nowrap"
          />
          <motion.p
            className="hero-copy mt-8 text-base font-light leading-7 text-bone/74 md:text-lg md:leading-8"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.1, ease: EASE }}
          >
            A four-storied private residence of 6,271 sq ft on Krishna Chandra
            Dey Sarani — fully sanctioned, actively under construction, and offered
            in its entirety to a single buyer.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.3, ease: EASE }}
          >
            <a
              href="#enquire"
              className="clip-corner touch-target bg-champagne px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_18px_48px_rgba(201,169,106,0.24)] transition hover:bg-bone"
            >
              Request the Private Dossier
            </a>
            <a
              href="#tour"
              className="clip-corner touch-target border border-bone/35 bg-ink/25 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-bone backdrop-blur-sm transition hover:border-champagne hover:text-champagne"
            >
              Take the Vertical Tour ↓
            </a>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-6 right-5 z-10 hidden text-right text-xs uppercase tracking-[0.22em] text-bone/78 md:block"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5, ease: EASE }}
        >
          SANCTIONED & UNDERWAY · G+4 · 4 CAR PARKS · PRICE ON REQUEST
        </motion.div>
      </motion.div>
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="sr-only">
        WhatsApp enquiry
      </a>
    </section>
  );
}
