"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";

const punct = { color: "var(--dim)" };

// skills.json that answers back: pick a skill and "used_in" resolves to the
// projects that actually ship with it.
export function SkillMap({ skills }: { skills: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const usedIn = active ? projects.filter((p) => p.tags.includes(active)).map((p) => p.title) : [];

  return (
    <div className="panel" style={{ padding: "20px 22px", fontSize: 13, lineHeight: 1.9 }}>
      <div style={punct}>{"{"}</div>
      <div style={{ paddingLeft: 20 }}>
        <span style={{ color: "var(--body)" }}>&quot;stack&quot;</span>
        <span style={punct}>: [</span>
      </div>
      <div style={{ paddingLeft: 40, display: "flex", flexWrap: "wrap", gap: "2px 0" }}>
        {skills.map((s) => (
          <span key={s} style={{ whiteSpace: "nowrap" }}>
            <button
              type="button"
              className="skill"
              aria-pressed={active === s}
              onMouseEnter={() => setActive(s)}
              onFocus={() => setActive(s)}
              onClick={() => setActive((a) => (a === s ? null : s))}
            >
              &quot;{s}&quot;
            </button>
            <span style={punct}>,&nbsp;</span>
          </span>
        ))}
      </div>
      <div style={{ paddingLeft: 20 }}>
        <span style={punct}>],</span>
      </div>
      <div style={{ paddingLeft: 20 }} aria-live="polite">
        <span style={{ color: "var(--body)" }}>&quot;used_in&quot;</span>
        <span style={punct}>: </span>
        {!active ? (
          <span style={{ color: "var(--muted)" }}>null <span style={{ fontSize: 11 }}>{"// point at a skill"}</span></span>
        ) : usedIn.length ? (
          <>
            <span style={punct}>[</span>
            {usedIn.map((t, i) => (
              <span key={t} className="skill-hit">
                &quot;{t}&quot;{i < usedIn.length - 1 && <span style={punct}>, </span>}
              </span>
            ))}
            <span style={punct}>]</span>
          </>
        ) : (
          <span style={{ color: "var(--muted)" }}>
            [] <span style={{ fontSize: 11 }}>{"// no public project tagged with it yet"}</span>
          </span>
        )}
      </div>
      <div style={punct}>{"}"}</div>
    </div>
  );
}
