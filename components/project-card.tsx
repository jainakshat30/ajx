"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import type { RepoDetails } from "@/lib/github-repos";

const MAX_TILT = 5; // deg

// Tilt + cursor spotlight (the 21st.dev "Tilt Card" idea), driven by CSS vars
// so the pointer never triggers a React render.
export function ProjectCard({ project: p, repo }: { project: Project; repo?: RepoDetails }) {
  const zoom = useRef<HTMLDialogElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * MAX_TILT}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 2 * MAX_TILT}deg`);
  };
  const onLeave = (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article className="card" data-cat="project" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="card-bar">
        <span>~/projects/{p.title.toLowerCase().replace(/\s+/g, "-")}</span>
        <span style={{ color: p.live ? "var(--ok)" : "var(--muted)" }}>{p.live ? "● live" : "○ source"}</span>
      </div>
      <button
        type="button"
        className="card-shot"
        onClick={() => zoom.current?.showModal()}
        disabled={!p.image}
        aria-label={p.image ? `Open full preview of ${p.title}` : undefined}
      >
        {p.image ? (
          <Image
            src={p.image}
            alt={`${p.title} preview`}
            fill
            sizes="(max-width: 720px) 100vw, 480px"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <span style={{ fontSize: 11, color: "var(--muted)" }}>no preview</span>
        )}
      </button>

      {p.image && (
        <dialog ref={zoom} className="preview-zoom" onClick={() => zoom.current?.close()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={`${p.title} preview, full size`} />
        </dialog>
      )}
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--hi)" }}>{p.title}</h3>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: "var(--body)" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", gap: 16, paddingTop: 10, borderTop: "1px solid var(--line)" }}>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="link-accent">
              --live ↗
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="link-quiet">
              --source ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
