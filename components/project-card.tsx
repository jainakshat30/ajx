import type { Project } from "@/lib/projects";

const hasRepo = (p: Project) => p.repo && p.repo !== "#";

export function ProjectCard({ project: p }: { project: Project }) {
  return (
    <div
      data-robot="project"
      style={{
        border: "1px solid oklch(0.28 0.006 255)",
        borderRadius: 8,
        overflow: "hidden",
        background: "oklch(0.17 0.004 255)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 120,
          background:
            "repeating-linear-gradient(135deg, oklch(0.2 0.006 255), oklch(0.2 0.006 255) 10px, oklch(0.185 0.006 255) 10px, oklch(0.185 0.006 255) 20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid oklch(0.28 0.006 255)",
        }}
      >
        <span style={{ fontSize: 11, color: "oklch(0.5 0.006 255)" }}>// {p.title} preview</span>
      </div>
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
        {(p.live || hasRepo(p)) && (
          <div style={{ marginTop: "auto", display: "flex", gap: 14, paddingTop: 8, borderTop: "1px solid oklch(0.26 0.006 255)" }}>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "var(--accent)" }}>
                --live
              </a>
            )}
            {hasRepo(p) && (
              <a href={p.repo} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "oklch(0.6 0.006 255)" }}>
                --source
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
