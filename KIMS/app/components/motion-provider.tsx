"use client";
/**
 * Wrap the app ONCE (app/layout.tsx). Loads the small Motion feature set and honours the OS reduced-motion setting.
 * `strict` makes a stray full `motion.*` component throw in development, which keeps the bundle small.
 * Inside this provider use `m.div`, `m.span` ... (import { m } from "motion/react"), never `motion.div`.
 * Reduced motion "user": transform and layout animations switch off, opacity and colour still animate.
 */
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
