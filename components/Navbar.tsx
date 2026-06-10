"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";

const links = [
  ["The Building", "#offering"],
  ["Residences", "#residences"],
  ["Location", "#location"],
  ["Enquire", "#enquire"],
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [fixed, setFixed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setFixed(latest > window.innerHeight * 0.85);
    setHidden(latest > previous && latest > window.innerHeight);
  });

  return (
    <>
      <motion.header
        className={`left-0 right-0 top-0 z-50 px-5 py-5 md:px-8 ${
          fixed
            ? "fixed border-b border-marble bg-ink/85 backdrop-blur-md"
            : "absolute bg-transparent"
        }`}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="font-display text-sm tracking-[0.3em] text-bone">
            FIFTY TWO
          </a>
          <div className="hidden items-center gap-8 text-sm text-bone/78 md:flex">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-bone">
                {label}
              </a>
            ))}
            <a
              href="#enquire"
              className="clip-corner border border-champagne px-5 py-2 text-xs uppercase tracking-[0.18em] text-champagne transition hover:bg-champagne hover:text-ink"
            >
              Private Viewing
            </a>
          </div>
          <button
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span className="block h-px w-8 bg-bone" />
            <span className="mt-2 block h-px w-8 bg-bone" />
          </button>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink px-6 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm tracking-[0.3em]">FIFTY TWO</span>
              <button
                className="text-sm uppercase tracking-[0.2em] text-mist"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-24 flex flex-col gap-8">
              {links.map(([label, href], index) => (
                <motion.a
                  key={label}
                  href={href}
                  className="font-display text-4xl tracking-[0.08em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
