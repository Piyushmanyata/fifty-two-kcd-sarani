export const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.9, ease: EASE },
};

export const stagger = (i: number) => ({
  ...fadeUp,
  transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
});
