"use client";
/**
 * Staggered entrance for parallel content (service lists). At most six children per Verro motion rules.
 */
import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type StaggerProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> & {
  children: ReactNode;
};

export function Stagger({ children, ...rest }: StaggerProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, ...rest }: Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> & { children: ReactNode }) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
      }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
