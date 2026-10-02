"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { STAGES } from "@/lib/stages";

export function Pipeline() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = innerHeight * 0.4;
      let idx = 0;
      STAGES.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < line) idx = i;
      });
      setCurrent(idx);
      setDone(innerHeight + scrollY >= document.documentElement.scrollHeight - 4);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* phones / narrow: a thin bar with the running stage */}
      <div className="pipe-bar" aria-hidden="true">
        <motion.span className="pipe-bar-fill" style={{ scaleX: fill }} />
        <span className="pipe-bar-label">
          {done ? "✓ pipeline passed" : `● ${STAGES[current].label}`}
        </span>
      </div>

      {/* wide screens: the full rail in the left gutter */}
      <nav className="pipe-rail" aria-label="Page sections">
        <span className="pipe-rail-title">ci / akshat</span>
        <ol>
          {STAGES.map((s, i) => {
            const state = done || i < current ? "passed" : i === current ? "running" : "queued";
            return (
              <li key={s.id} data-state={state}>
                <a href={`#${s.id}`} data-cat="navigation">
                  <span className="pipe-dot">{state === "passed" ? "✓" : ""}</span>
                  {s.label}
                </a>
              </li>
            );
          })}
        </ol>
        <span className="pipe-rail-status">{done ? "passed" : `${current + 1}/${STAGES.length} running`}</span>
      </nav>
    </>
  );
}
