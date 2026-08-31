import Image from "next/image";
import Link from "next/link";
import { Terminal } from "@/components/terminal";
import { ContactForm } from "@/components/contact-form";
import { getContributions } from "@/lib/github-contributions";
import { ContributionGraph } from "@/components/contribution-graph";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/lib/projects";

const accent = "var(--accent)";

const work = [
  {
    hash: "a1f9c3d",
    company: "Qyupe",
    role: "Platform Engineer",
    period: "Jan 2026 – Present",
    location: "Remote",
    summary:
      "Built a petition wizard that renders form UIs from plain TOML config, cutting user form-fill time by 80%.",
  },
  {
    hash: "7e2b81a",
    company: "ConviSaaS Inc.",
    role: "Platform Engineer",
    period: "Jan 2026 – Present",
    location: "Remote",
    summary:
      "Built a petition wizard that renders form UIs from plain TOML config, cutting user form-fill time by 80%.",
  },
  {
    hash: "3c04f6e",
    company: "BlissMet",
    role: "Founding Backend Engineer",
    period: "Jun 2025 – Dec 2025",
    location: "Delhi",
    summary:
      "Built the backend from scratch and architected a scalable, production-ready platform with robust workflows.",
  },
];

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Git",
  "Tailwind CSS",
  "Firebase",
  "Supabase",
];

const achievements = [
  {
    title: "SemiFinalist – HackWithMait 5.0, MAIT",
    date: "Oct 2024",
    description:
      "Built & deployed NyayNari, bridging legal complexity and everyday understanding for women across India.",
  },
  {
    title: "Member, CSI-Innowave",
    date: "Aug 2024 – Present",
    description: "Led and coordinated technical club events including a college-level hackathon.",
  },
];

const education = [
  {
    title: "Maharaja Agrasen Institute of Technology",
    date: "2023 – 2027",
    description: "B.Tech in ECE",
  },
  {
    title: "Maheshwari Public School",
    date: "2021 – 2023",
    description: "Class XII (CBSE)",
  },
];

const navLinks = [
  { href: "#about", label: "./about" },
  { href: "#log", label: "./log" },
  { href: "/projects", label: "./projects" },
  { href: "#notes", label: "./notes" },
  { href: "#contact", label: "./contact" },
];

const socialLinks = [
  { href: "mailto:akshatdotjain@gmail.com", label: "mail" },
  { href: "https://twitter.com/akshatdotjain", label: "x.com" },
  { href: "https://github.com/jainakshat30", label: "github" },
  { href: "https://www.linkedin.com/in/jainakshat30/", label: "linkedin" },
];

const sectionLabel: React.CSSProperties = {
  margin: "0 0 16px 0",
  fontSize: 13,
  color: "oklch(0.55 0.006 255)",
};

const sectionStyle: React.CSSProperties = {
  padding: "30px 0",
  borderTop: "1px solid oklch(0.28 0.006 255)",
};

export default async function Page() {
  const contrib = await getContributions();

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "oklch(0.12 0.004 255)",
        color: "oklch(0.9 0.004 255)",
        fontFamily: "var(--font-jetbrains-mono), ui-monospace, Menlo, monospace",
        padding: "40px 20px 60px 20px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* nav */}
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
            <span style={{ color: "oklch(0.5 0.006 255)" }}>~%</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 22, fontSize: 12, color: "oklch(0.6 0.006 255)" }}>
            {navLinks.map((l, i) => {
              const style =
                i === 0
                  ? { borderBottom: `2px solid ${accent}`, color: "oklch(0.9 0.004 255)", paddingBottom: 2 }
                  : undefined;
              return l.href.startsWith("/") ? (
                <Link key={l.href} href={l.href} style={style} data-robot="navigation">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} style={style} data-robot="navigation">
                  {l.label}
                </a>
              );
            })}
          </div>
        </nav>

        {/* about — $ whoami */}
        <section id="about" className="tr-cols-about" style={{ padding: "44px 0 36px 0" }}>
          <div>
            <p style={{ margin: "0 0 10px 0", fontSize: 13, color: "oklch(0.55 0.006 255)" }}>$ whoami</p>
            <h1 style={{ margin: 0, fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", color: "oklch(0.96 0.004 255)" }}>
              Akshat Jain
              <span className="caret" style={{ color: accent }}>
                _
              </span>
            </h1>
            <p style={{ margin: "10px 0 0 0", fontSize: 14, color: "oklch(0.68 0.006 255)" }}>
              22 · he/him · Full-Stack Developer, India
            </p>
            <p style={{ margin: "18px 0 0 0", fontSize: 14, lineHeight: 1.75, color: "oklch(0.75 0.006 255)", maxWidth: "56ch" }}>
              21-year-old developer from India who enjoys turning random ideas into things that
              actually work. Spent the last year building full-stack, AI-powered, and real-time
              systems &mdash; currently building, breaking, fixing, and occasionally wondering why the
              code worked five minutes ago.
            </p>

            <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a
                href="https://drive.google.com/file/d/1dx9-7m9U5smmfuV-ioSmGqJnnUKlT_1G/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                data-robot="primary"
                style={{ fontSize: 13, fontWeight: 600, padding: "9px 18px", borderRadius: 4, background: accent, color: "oklch(0.14 0.006 255)" }}
              >
                ./resume.pdf
              </a>
              {socialLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  data-robot="social"
                  style={{ fontSize: 13, padding: "9px 16px", borderRadius: 4, border: "1px solid oklch(0.32 0.006 255)", color: "oklch(0.8 0.006 255)" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <Image
            src="/me-modified.jpg"
            alt="Akshat Jain"
            width={1130}
            height={980}
            priority
            style={{ display: "block", width: "100%", height: "auto", borderRadius: 8 }}
          />
        </section>

        {/* contributions heatmap */}
        <section style={{ ...sectionStyle, paddingTop: 30 }}>
          <p style={sectionLabel}>$ cat contributions.log</p>
          {contrib ? (
            <ContributionGraph data={contrib} />
          ) : (
            <p style={{ margin: 0, fontSize: 12, color: "oklch(0.55 0.006 255)" }}>
              // contribution graph temporarily unavailable
            </p>
          )}
        </section>

        {/* experience — git log */}
        <section id="log" style={sectionStyle}>
          <p style={{ ...sectionLabel, marginBottom: 18 }}>$ git log --oneline --graph experience</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {work.map((w) => (
              <div key={w.hash} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 14, padding: "16px 0", borderBottom: "1px solid oklch(0.24 0.006 255)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 5 }} />
                  <span style={{ flex: 1, width: 1, background: "oklch(0.3 0.006 255)", marginTop: 4 }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "oklch(0.6 0.006 255)", fontWeight: 600 }}>{w.hash}</span>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "oklch(0.94 0.004 255)" }}>
                      {w.role} @ {w.company}
                    </h4>
                    <span style={{ fontSize: 11, color: "oklch(0.5 0.006 255)", marginLeft: "auto" }}>
                      {w.period} · {w.location}
                    </span>
                  </div>
                  <p style={{ margin: "8px 0 0 0", fontSize: 13, lineHeight: 1.65, color: "oklch(0.7 0.006 255)", maxWidth: "70ch" }}>
                    {w.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* skills.json */}
        <section style={sectionStyle}>
          <p style={sectionLabel}>$ cat skills.json</p>
          <div style={{ border: "1px solid oklch(0.28 0.006 255)", borderRadius: 8, padding: "18px 20px", background: "oklch(0.17 0.004 255)", fontSize: 13, lineHeight: 1.9 }}>
            <div>
              <span style={{ color: "oklch(0.55 0.006 255)" }}>{"{"}</span>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <span style={{ color: "oklch(0.68 0.006 255)" }}>&quot;stack&quot;</span>
              <span style={{ color: "oklch(0.55 0.006 255)" }}>: [</span>
            </div>
            <div style={{ paddingLeft: 40, display: "flex", flexWrap: "wrap" }}>
              {skills.map((s) => (
                <span key={s} style={{ color: accent, whiteSpace: "nowrap", display: "inline-block" }}>
                  &quot;{s}&quot;<span style={{ color: "oklch(0.55 0.006 255)" }}>,&nbsp;</span>
                </span>
              ))}
            </div>
            <div style={{ paddingLeft: 20 }}>
              <span style={{ color: "oklch(0.55 0.006 255)" }}>]</span>
            </div>
            <div>
              <span style={{ color: "oklch(0.55 0.006 255)" }}>{"}"}</span>
            </div>
          </div>
        </section>

        {/* projects — ls -la */}
        <section id="projects" style={sectionStyle}>
          <p style={{ ...sectionLabel, marginBottom: 18 }}>$ ls -la ./projects</p>
          <div className="tr-cols-projects">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
          <Link
            href="/projects"
            style={{ display: "inline-block", marginTop: 16, fontSize: 12, color: accent }}
          >
            $ ls ~/projects --all →
          </Link>
        </section>

        {/* notes — achievements + education */}
        <section id="notes" className="tr-cols-2" style={sectionStyle}>
          <div>
            <p style={sectionLabel}>$ cat achievements.log</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {achievements.map((a) => (
                <div key={a.title}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <h5 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "oklch(0.9 0.004 255)" }}>{a.title}</h5>
                    <span style={{ fontSize: 11, color: "oklch(0.5 0.006 255)", flexShrink: 0 }}>{a.date}</span>
                  </div>
                  <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "oklch(0.65 0.006 255)", lineHeight: 1.6 }}>{a.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={sectionLabel}>$ cat education.log</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {education.map((e) => (
                <div key={e.title}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <h5 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "oklch(0.9 0.004 255)" }}>{e.title}</h5>
                    <span style={{ fontSize: 11, color: "oklch(0.5 0.006 255)", flexShrink: 0 }}>{e.date}</span>
                  </div>
                  <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "oklch(0.65 0.006 255)" }}>{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* interactive terminal */}
        <section id="terminal" style={sectionStyle}>
          <p style={sectionLabel}>
            $ open interactive-terminal &mdash; try:{" "}
            <span style={{ color: "oklch(0.68 0.006 255)" }}>help</span>, whoami, skills, projects,
            experience, contact, clear
          </p>
          <Terminal />
        </section>

        {/* contact */}
        <section id="contact" style={{ ...sectionStyle, padding: "34px 0" }}>
          <p style={{ ...sectionLabel, marginBottom: 18 }}>$ ./send-message --interactive</p>
          <ContactForm />
        </section>

        {/* footer */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>⎇ main</span>
            <span>UTF-8</span>
            <span>Prettier</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>© 2026 Akshat Jain</span>
            <span>Ln 1, Col 1</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
