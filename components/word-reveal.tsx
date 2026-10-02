"use client";

import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// Adapted from motion.dev's "Scroll word reveal" (via 21st.dev): each word
// brightens as the paragraph scrolls through the viewport.
const REST = 0.18;

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [REST, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
}

export function WordReveal({ text, style }: { text: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} style={style} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const start = (i / words.length) * 0.85;
          return (
            <Fragment key={i}>
              <Word word={w} progress={scrollYProgress} range={[start, start + 0.15]} />
              {i < words.length - 1 ? " " : null}
            </Fragment>
          );
        })}
      </span>
    </p>
  );
}
