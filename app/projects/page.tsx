import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects — akshat@portfolio",
  description: "Things Akshat Jain has built.",
};

export default function ProjectsPage() {
  return (
    <>
      <nav className="topnav">
        <span style={{ fontSize: 14, color: "var(--hi)", fontWeight: 700 }}>
          akshat@portfolio <span style={{ color: "var(--dim)", fontWeight: 400 }}>~/projects %</span>
        </span>
        <Link href="/" className="navlink" style={{ fontSize: 12 }}>
          cd ..
        </Link>
      </nav>

      <section data-cat-section="oh — all of Akshat's projects" style={{ padding: "64px 0 40px" }}>
        <Reveal style={{ marginBottom: 30 }}>
          <p className="stage-tag">$ ls -la ~/projects</p>
          <h1 className="stage-title">Everything that made it out of localhost.</h1>
        </Reveal>
        <div className="tr-cols-projects">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} style={{ display: "flex" }}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="statusbar">
        <span>{projects.length} repositories</span>
        <span>© 2026 Akshat Jain</span>
      </footer>
    </>
  );
}
