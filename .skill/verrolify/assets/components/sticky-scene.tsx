"use client";
/**
 * A tall track with a sticky full-screen stage. `progress` runs 0 to 1 across the pinned travel.
 * Drive anything from it with useTransform: colour journeys, text that reveals line by line, scale, clip-path wipes.
 *
 *   <StickyScene heightVh={400}>
 *     {(p) => <Journey progress={p} />}
 *   </StickyScene>
 *
 * Rules: (1) no ancestor may have overflow hidden or auto, or `sticky` silently stops working;
 * (2) use only inside a client component (the render-prop is a function); (3) size by scroll distance, about 100 vh
 * per beat; (4) under reduced motion or on phones, render the final state instead of a pinned track.
 */
import { useScroll, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

export function StickyScene({
  heightVh = 300,
  children,
  className,
}: {
  heightVh?: number;
  className?: string;
  children: (progress: MotionValue<number>) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} className={className} style={{ height: `${heightVh}svh`, position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>{children(scrollYProgress)}</div>
    </section>
  );
}
