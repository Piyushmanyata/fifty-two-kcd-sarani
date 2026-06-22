"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  useMotionValue,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import { tourFloors } from "@/lib/property";
import { EASE } from "@/lib/animations";
import { RevealText } from "@/components/ui/RevealText";

const floorProgressStops = tourFloors.map((_, index) =>
  tourFloors.length === 1 ? 0 : index / (tourFloors.length - 1),
);
const elevatorStops = tourFloors.map((_, index) => `${index * -5.5}rem`);

const mobileShortCopies = [
  "Sanctioned stilt entry, lift lobby, and covered parking.",
  "Full-floor 3 BHK layout, fully customisable to your lifestyle.",
  "Independent blank canvas for multi-generational family privacy.",
  "Third full-floor residence below the terrace level.",
  "Bespoke penthouse with study and a grand private terrace."
];

function MobileElevation({ activeIndex, progress }: { activeIndex: number; progress: any }) {
  return (
    <div className="relative mx-auto w-full max-w-sm px-6 py-3">
      <div className="absolute left-10 right-10 top-[22px] h-px bg-marble" />
      <motion.div 
        className="gold-glow absolute left-10 top-[22px] h-px bg-champagne origin-left"
        style={{ scaleX: progress, width: "calc(100% - 80px)" }}
      />
      <div className="relative flex justify-between">
        {tourFloors.map((floor, index) => {
          const active = index === activeIndex;
          return (
            <div key={floor.label} className="flex flex-col items-center gap-1">
              <motion.div
                className="w-6 h-6 rounded-full border border-marble flex items-center justify-center text-[9px] font-bold bg-slate"
                animate={{
                  borderColor: active ? "#C9A96A" : "#2B2E36",
                  color: active ? "#C9A96A" : "#9BA0A8",
                  backgroundColor: active ? "rgba(201,169,106,0.08)" : "#1C1E24",
                  scale: active ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {index === 0 ? "G" : index === 4 ? "P" : index}
              </motion.div>
              <span className={`text-[8px] tracking-widest ${active ? 'text-champagne font-semibold' : 'text-mist'}`}>
                {floor.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniElevation({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative mx-auto flex w-full max-w-sm flex-col-reverse gap-2">
      <div className="gold-glow absolute bottom-0 left-8 top-0 w-px bg-champagne" />
      {tourFloors.map((floor, index) => {
        const active = index === activeIndex;
        return (
          <motion.div
            key={floor.label}
            className="relative flex h-20 items-center justify-between border bg-slate px-6"
            animate={{
              borderColor: active ? "#C9A96A" : "#2B2E36",
              opacity: active ? 1 : 0.35,
              scale: active ? 1.06 : 1,
              backgroundColor: active ? "rgba(201,169,106,0.08)" : "#1C1E24",
            }}
            transition={{ duration: 0.35 }}
          >
            <span className="font-display text-xl tracking-[0.12em]">{floor.label}</span>
            <span className="text-xs uppercase tracking-[0.2em] text-mist">
              {index === 0 ? "G" : index}
            </span>
            {index === 4 && active ? (
              <motion.span
                className="absolute right-5 top-3 h-px w-16 bg-gradient-to-r from-transparent via-champagne to-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 30 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}

export function VerticalTour() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const viewHeight = window.innerHeight;
      const totalScrollable = elementHeight - viewHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      scrollYProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    // Trigger after a tiny delay to ensure proper layout sizing post-mount/image loads
    const timer = setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [scrollYProgress]);

  const elevatorY = useTransform(
    scrollYProgress,
    floorProgressStops,
    elevatorStops,
  );
  const activeFloor = tourFloors[activeIndex] ?? tourFloors[0];

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      tourFloors.length - 1,
      Math.max(0, Math.round(value * (tourFloors.length - 1))),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  return (
    <section
      id="tour"
      ref={ref}
      className="relative overflow-visible bg-ink px-5 py-0 md:px-8 md:py-0"
      style={{ minHeight: isDesktop ? "500vh" : "440vh" }}
    >
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(201,169,106,0.18),transparent_36%)]" />
      </div>
      <div className="sticky top-0 mx-auto flex h-[100dvh] w-full max-w-7xl flex-col justify-end overflow-hidden pb-28 md:flex-row md:items-center md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFloor.label}-background`}
            className="pointer-events-none absolute inset-0 w-full overflow-hidden border-b border-marble/80 bg-slate md:inset-y-[4vh] md:right-0 md:w-[70%] md:border"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={activeFloor.image}
              alt={activeFloor.imageAlt}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
            {/* Added stronger bottom-up vignette gradient for mobile text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/62 to-transparent md:bg-gradient-to-r md:from-ink md:via-ink/28 md:to-ink/0" />
            <div className="absolute inset-0 md:bg-gradient-to-t md:from-ink/55 md:via-transparent md:to-ink/12" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
            <div className="absolute bottom-6 right-6 border border-champagne/45 bg-ink/58 px-4 py-3 text-right backdrop-blur-sm hidden md:block">
              <div className="font-display text-2xl tracking-[0.08em] text-bone">
                {activeFloor.label}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-champagne">
                Potential finish
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="relative z-10 w-full md:py-0">
          <div className="flex flex-col justify-end h-full md:grid md:grid-cols-12 md:items-center gap-2 md:gap-10">
            <motion.div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center scale-95 md:scale-100 origin-center">
              <div className="eyebrow mb-2 md:mb-10 block md:hidden text-shadow">THE VERTICAL TOUR</div>
              <div className="w-full block md:hidden mb-2">
                <MobileElevation activeIndex={activeIndex} progress={scrollYProgress} />
              </div>
              <div className="relative hidden md:block">
                <MiniElevation activeIndex={activeIndex} />
                <motion.div
                  className="gold-glow absolute left-4 top-[calc(100%-3.75rem)] w-8 h-10 border border-champagne bg-slate/90 flex flex-col items-center justify-center shadow-lg text-[10px] font-bold text-champagne z-20"
                  style={reducedMotion ? undefined : { y: elevatorY }}
                >
                  {/* Cab glass design accent */}
                  <div className="absolute inset-x-1 top-1 h-[2px] bg-champagne/40" />
                  
                  {/* Glowing floor number inside the lift cab */}
                  <span className="font-display text-xs tracking-normal mt-[2px] text-champagne">
                    {activeIndex === 0 ? "G" : activeIndex === 4 ? "P" : activeIndex}
                  </span>
                  
                  <div className="absolute inset-x-1 bottom-1 h-[2px] bg-champagne/40" />
                </motion.div>
              </div>
            </motion.div>
            <div className="col-span-1 flex h-auto flex-col justify-center p-0 pl-0 text-center md:col-span-7 md:min-h-[430px] md:border-l md:border-champagne/40 md:bg-ink/50 md:p-10 md:pl-12 md:text-left md:shadow-2xl md:shadow-ink/45 md:backdrop-blur-[2px]">
              <div className="hidden md:block mb-6 md:mb-10">
                <div className="eyebrow">THE VERTICAL TOUR</div>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeFloor.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="font-display text-xs md:text-sm tracking-[0.35em] text-champagne">
                    {activeFloor.label}
                  </div>
                  <h2 className="font-display mt-2 md:mt-6 text-[clamp(1.4rem,6vw,2.5rem)] md:text-[clamp(2.8rem,6vw,6rem)] uppercase leading-none tracking-[0.05em] drop-shadow-md">
                    {activeFloor.title}
                  </h2>
                  
                  {/* Reduced Mobile Copy Overlay */}
                  <p className="block md:hidden mt-2 text-xs sm:text-sm font-light leading-relaxed text-bone/95 max-w-sm mx-auto px-4 drop-shadow-sm">
                    {mobileShortCopies[activeIndex]}
                  </p>

                  {/* Desktop Only Details */}
                  <div className="hidden md:block">
                    <div className="mt-5 text-sm uppercase tracking-[0.22em] text-mist">
                      {activeFloor.meta}
                    </div>
                    <p className="mt-10 text-xl font-light leading-9 text-bone/82">
                      {activeFloor.copy}
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
                      {activeFloor.details.map((detail) => (
                        <div
                          key={detail}
                          className="border-t border-marble/90 pt-4 text-sm leading-6 text-mist"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
