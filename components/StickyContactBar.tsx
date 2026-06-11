"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { contact } from "@/lib/property";

export function StickyContactBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > window.innerHeight * 0.9);
  });

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-marble bg-ink/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
      initial={{ y: "110%" }}
      animate={{ y: visible ? 0 : "110%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-2 gap-3">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="clip-corner bg-champagne px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink"
        >
          WhatsApp
        </a>
        <a
          href={contact.phoneHref}
          className="clip-corner border border-bone/35 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-bone"
        >
          Call
        </a>
      </div>
    </motion.div>
  );
}
