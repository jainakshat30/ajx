import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects — akshat@portfolio",
  description: "Things Akshat Jain has built.",
};

export default function ProjectsPage() {
  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          padding: "24px 0 18px 0",
          borderBottom: "1px solid oklch(0.28 0.006 255)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "oklch(0.85 0.006 255)" }}>
          <span style={{ fontWeight: 700 }}>akshat@portfolio</span>
          <span style={{ color: "oklch(0.5 0.006 255)" }}>~/projects %</span>
        </div>
        <Link href="/" style={{ fontSize: 12, color: "oklch(0.6 0.006 255)" }}>
          cd ..
        </Link>
      </nav>

      <section data-robot-section="oh — all of Akshat's projects" style={{ padding: "44px 0 36px 0" }}>
        <p style={{ margin: "0 0 18px 0", fontSize: 13, color: "oklch(0.55 0.006 255)" }}>$ ls -la ~/projects</p>
        <div className="tr-cols-projects">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>

      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          padding: "16px 0",
          borderTop: "1px solid oklch(0.28 0.006 255)",
          color: "oklch(0.55 0.006 255)",
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        <span>{projects.length} repositories</span>
        <span>© 2026 Akshat Jain</span>
      </footer>
    </>
  );
}
