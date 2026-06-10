"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { floorPlans } from "@/lib/property";

export function FloorPlanLightbox({
  planKey,
  onClose,
}: {
  planKey: string | null;
  onClose: () => void;
}) {
  const plan = floorPlans.find((item) => item.key === planKey);

  return (
    <AnimatePresence>
      {plan ? (
        <motion.div
          className="fixed inset-0 z-[95] bg-ink/95 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute right-5 top-5 z-10 text-xs uppercase tracking-[0.22em] text-bone"
            onClick={onClose}
          >
            Close
          </button>
          <div className="relative mx-auto h-full max-w-5xl border border-marble bg-bone">
            <Image
              src={plan.image}
              alt={`${plan.title} architectural drawing`}
              fill
              sizes="100vw"
              className="object-contain p-2"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
