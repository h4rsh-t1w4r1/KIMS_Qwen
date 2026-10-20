"use client";
/** Thin reading-progress bar pinned to the top of the viewport. Uses the accent colour token. */
import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden="true"
      className={className}
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: "0% 50%",
        background: "var(--accent, currentColor)",
        zIndex: 50,
      }}
    />
  );
}
