"use client";
/**
 * One depth plane. Moves its children vertically as the wrapper crosses the viewport.
 * speed is a fraction of the wrapper height: 0.05 is subtle, 0.15 is clear, above 0.3 usually feels broken.
 * Stack several with different speeds for a layered hero. Foreground moves more than background.
 * Disabled automatically for reduced motion. Transform only, so it stays on the compositor.
 */
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function ParallaxLayer({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  // First render must match the server, so the preference is applied after mount.
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(!!prefersReduced), [prefersReduced]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const amount = reduce ? 0 : speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `${-amount}%`]);
  return (
    <div ref={ref} className={className}>
      <m.div style={{ y, willChange: "transform" }}>{children}</m.div>
    </div>
  );
}
