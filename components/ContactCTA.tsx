"use client";

import { motion } from "motion/react";
import { contact } from "@/lib/property";
import { stagger } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

const cards = [
  ["WhatsApp", "Message now — fastest response", contact.whatsapp, true],
  ["Call", contact.phone, contact.phoneHref, false],
  ["Email", contact.email, contact.emailHref, false],
] as const;

export function ContactCTA() {
  return (
    <section id="enquire" className="content-auto bg-ink px-5 py-28 md:min-h-screen md:px-8 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div className="eyebrow justify-center" {...stagger(0)}>
          PRIVATE VIEWING
        </motion.div>
        <RevealText
          text="One building. One conversation."
          className="font-display mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.8rem)] uppercase leading-tight tracking-[0.04em]"
        />
        <motion.p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-mist" {...stagger(2)}>
          Viewings are by appointment and the dossier is shared on request. If
          the vertical tour held your attention, the building will hold it
          longer.
        </motion.p>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-3">
        {cards.map(([label, value, href, external], index) => (
          <motion.div key={label} {...stagger(index + 3)}>
            <MagneticButton
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener" : undefined}
              className="premium-panel block h-full p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-champagne"
            >
              <div className="font-display text-3xl uppercase tracking-[0.08em]">
                {label}
              </div>
              <div className="mt-8 min-h-12 text-base leading-7 text-mist">{value}</div>
              <div className="mt-8 text-xs uppercase tracking-[0.22em] text-champagne">
                Begin enquiry
              </div>
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
