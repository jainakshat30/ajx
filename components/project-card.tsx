"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project: p }: { project: Project }) {
  const zoom = useRef<HTMLDialogElement>(null);

  return (
    <div
      data-cat="project"
      style={{
        border: "1px solid oklch(0.28 0.006 255)",
        borderRadius: 8,
        overflow: "hidden",
        background: "oklch(0.17 0.004 255)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        type="button"
        onClick={() => zoom.current?.showModal()}
        disabled={!p.image}
        aria-label={p.image ? `Open full preview of ${p.title}` : undefined}
        style={{
          position: "relative",
          width: "100%",
          padding: 0,
          font: "inherit",
          cursor: p.image ? "zoom-in" : "default",
          aspectRatio: "1536 / 1024",
          background: "oklch(0.13 0.004 255)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderBottom: "1px solid oklch(0.28 0.006 255)",
          overflow: "hidden",
        }}
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
          <span style={{ fontSize: 11, color: "oklch(0.45 0.006 255)" }}>no preview</span>
        )}
      </button>

      {p.image && (
        <dialog ref={zoom} className="preview-zoom" onClick={() => zoom.current?.close()}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={`${p.title} preview, full size`} />
        </dialog>
      )}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "oklch(0.94 0.004 255)" }}>{p.title}</h4>
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: "oklch(0.68 0.006 255)" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{ fontSize: 10, padding: "2px 8px", borderRadius: 3, background: "oklch(0.24 0.006 255)", color: "oklch(0.72 0.01 240)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", gap: 14, paddingTop: 8, borderTop: "1px solid oklch(0.26 0.006 255)" }}>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "var(--accent)" }}>
              --live
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "oklch(0.6 0.006 255)" }}>
              --source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
