"use client";
/**
 * Children enter one after another. Use for card grids, lists, steps. Keep gaps small (0.06 to 0.1s) and the total
 * under about 0.8s. Do not stagger more than about 8 items: group them instead.
 */
import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "./reveal";

export function Stagger({
  children,
  gap = 0.08,
  delay = 0,
  className,
}: {
  children: ReactNode;
  gap?: number;
  delay?: number;
  className?: string;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
  return (
    <m.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </m.div>
  );
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={item}>
      {children}
    </m.div>
  );
}
