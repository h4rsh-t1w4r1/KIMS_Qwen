"use client";
/**
 * Whisper-level entrance. Fade plus a small rise, once, when the block is 10 percent inside the viewport.
 * NEVER wrap the LCP element (hero headline, hero image): fading it in from opacity 0 delays Largest Contentful Paint.
 * Defaults match Verro motion tokens: 0.6s, ease-out-expo, 16px rise.
 */
import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "animate" | "transition" | "children"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
};

export function Reveal({ children, delay = 0, y = 16, duration = 0.6, once = true, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
