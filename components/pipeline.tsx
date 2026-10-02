"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin bar along the top that fills as the visitor scrolls through the run.
export function Pipeline() {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <div className="pipe-bar" aria-hidden="true">
      <motion.span className="pipe-bar-fill" style={{ scaleX: fill }} />
    </div>
  );
}
