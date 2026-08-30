"use client";

import { useState } from "react";
import { type Contributions, LEVEL_COLORS } from "@/lib/github-contributions";

const GAP = 3;
const MONTH_ROW = 15;
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

type Tip = { x: number; y: number; text: string };

function describe(day: { date: string; count: number }): string {
  const d = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const n = day.count;
  const c = n === 0 ? "No contributions" : `${n} contribution${n === 1 ? "" : "s"}`;
  return `${c} on ${d}`;
}

export function ContributionGraph({ data }: { data: Contributions }) {
  const [tip, setTip] = useState<Tip | null>(null);

  return (
    <>
      <div style={{ overflowX: "auto", paddingBottom: 4 }} onMouseLeave={() => setTip(null)}>
        <div style={{ display: "flex", gap: GAP, minWidth: 620, alignItems: "stretch" }}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: `${MONTH_ROW}px repeat(7, 1fr)`,
              gap: GAP,
              marginRight: 2,
              fontSize: 10,
              color: "oklch(0.96 0.004 255)",
            }}
          >
            <span />
            {WEEKDAYS.map((w, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                {w}
              </span>
            ))}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: GAP, height: MONTH_ROW, fontSize: 10, color: "oklch(0.96 0.004 255)" }}>
              {data.weeks.map((week, wi) => (
                <span key={wi} style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "visible" }}>
                  {week.month ?? ""}
                </span>
              ))}
            </div>

            <div
              style={{ display: "flex", gap: GAP }}
              onMouseMove={(e) => setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t))}
            >
              {data.weeks.map((week, wi) => (
                <div key={wi} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: GAP }}>
                  {week.days.map((day, di) => (
                    <div
                      key={di}
                      data-date={day?.date}
                      onMouseEnter={(e) =>
                        day && setTip({ x: e.clientX, y: e.clientY, text: describe(day) })
                      }
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        borderRadius: 2,
                        background: day ? LEVEL_COLORS[day.level] : "transparent",
                        outline: day ? "1px solid oklch(1 0 0 / 0.04)" : "none",
                        outlineOffset: -1,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
          fontSize: 11,
          color: "oklch(0.96 0.004 255)",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>{data.total} contributions in the last year</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>Less</span>
          {LEVEL_COLORS.map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: 2, background: c }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {tip && (
        <div
          style={{
            position: "fixed",
            left: Math.min(Math.max(tip.x, 170), window.innerWidth - 170),
            top: tip.y - 12,
            transform: "translate(-50%, -100%)",
            background: "oklch(0.16 0.004 255)",
            border: "1px solid oklch(0.32 0.006 255)",
            borderRadius: 6,
            padding: "6px 9px",
            fontSize: 11,
            color: "oklch(0.85 0.006 255)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          {tip.text}
        </div>
      )}
    </>
  );
}
