"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Reveal } from "@/components/reveal";

export type Commit = {
  hash: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  stack?: string[];
};

// Adapted from Aceternity's timeline (via 21st.dev): a beam runs down the
// branch line as you scroll, drawing the git graph one commit at a time.
export function GitTimeline({ commits }: { commits: Commit[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });

  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 34 }}>
      <span className="git-line" aria-hidden="true">
        <motion.span className="git-beam" style={{ scaleY: scrollYProgress }} />
      </span>

      {commits.map((c, i) => (
        <Reveal key={c.hash} delay={i * 0.05} style={{ position: "relative", padding: "18px 0 26px" }}>
          <span className="git-node" aria-hidden="true" />
          <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px 12px" }}>
            <span style={{ fontSize: 11, color: "var(--signal)", fontWeight: 600 }}>{c.hash}</span>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--hi)" }}>
              {c.role} <span style={{ color: "var(--dim)", fontWeight: 400 }}>@</span> {c.company}
            </h3>
            <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>
              {c.period} · {c.location}
            </span>
          </div>
          <p style={{ margin: "10px 0 12px", fontSize: 13, lineHeight: 1.7, color: "var(--body)", maxWidth: "68ch" }}>
            {c.summary}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {c.stack?.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
