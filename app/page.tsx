import Image from "next/image";
import Link from "next/link";
import { Terminal } from "@/components/terminal";
import { ContactForm } from "@/components/contact-form";
import { getContributions } from "@/lib/github-contributions";
import { getRepoDetails } from "@/lib/github-repos";
import { ContributionGraph } from "@/components/contribution-graph";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { GitTimeline, type Commit } from "@/components/git-timeline";
import { STAGES } from "@/lib/stages";
import { BRAND_COLORS, MONO_ICONS, TOOL_ICONS } from "@/lib/tool-icons";
import { Pipeline } from "@/components/pipeline";

const work: Commit[] = [
  {
    hash: "a1f9c3d",
    company: "Qyupe",
    role: "Full Stack Developer Intern",
    period: "Jan 2026 – Sept 2026",
    location: "Remote",
    summary:
      "Built the admin console, agency-listing and newsletter modules end-to-end on a production immigration platform: around 58 REST endpoints on Cloudflare Workers (Hono), backed by D1 and Drizzle.",
    stack: ["Cloudflare Workers", "Hono", "D1", "Drizzle"],
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

// everything else the projects and jobs actually run on
const toolbox = [...new Set([...work.flatMap((w) => w.stack ?? []), ...projects.flatMap((p) => p.tags)])].filter(
  (t) => !skills.includes(t),
);

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
  { href: "#init", label: "./about" },
  { href: "#branch", label: "./work" },
  { href: "/projects", label: "./projects" },
  { href: "#log", label: "./notes" },
  { href: "#connect", label: "./contact" },
];

const socialLinks = [
  { href: "mailto:akshatdotjain@gmail.com", label: "mail" },
  { href: "https://twitter.com/akshatdotjain", label: "x.com" },
  { href: "https://github.com/jainakshat30", label: "github" },
  { href: "https://www.linkedin.com/in/jainakshat30/", label: "linkedin" },
];

const BIO =
  "22-year-old developer from India who enjoys turning random ideas into things that actually work. Spent the last year building full-stack, AI-powered, and real-time systems — currently building, breaking, fixing, and occasionally wondering why the code worked five minutes ago.";

// Each section is one stage of the run; the header carries its place in it.
function Stage({ id, cmd, title }: { id: (typeof STAGES)[number]["id"]; cmd: string; title: string }) {
  const n = STAGES.findIndex((s) => s.id === id);
  return (
    <Reveal style={{ marginBottom: 20 }}>
      <p className="stage-tag">
        <span>stage {String(n).padStart(2, "0")}</span>
        <span className="stage-sep">/</span>
        <span style={{ color: "var(--hi)" }}>{id}</span>
        <span className="stage-cmd">$ {cmd}</span>
      </p>
      <h2 className="stage-title">{title}</h2>
    </Reveal>
  );
}

// Two rows drifting in opposite directions (MotionSites "Max Reed" marquee).
// Decorative duplicate of real data, so hidden from assistive tech.
function Marquee({ rows }: { rows: string[][] }) {
  return (
    <div className="marquee" aria-hidden="true">
      {rows.map((row, i) => (
        <div key={i} className="marquee-track" data-dir={i % 2 ? "right" : "left"}>
          {/* 4 copies: each -50% half must out-span the column or the loop shows a gap */}
          {[...row, ...row, ...row, ...row].map((t, j) => {
            const Icon = TOOL_ICONS[t];
            return (
              <span key={j} className={j < row.length ? "chip marquee-chip" : "chip marquee-chip marquee-dup"}>
                {Icon && (
                  <span className="marquee-icon-wrap" style={{ color: BRAND_COLORS[t] }}>
                    <Icon className="marquee-icon" title="" data-mono={MONO_ICONS.has(t) || undefined} />
                  </span>
                )}
                {t}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Notes({ items }: { items: { title: string; date: string; description: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {items.map((a, i) => (
        <Reveal key={a.title} delay={i * 0.06}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--hi)" }}>{a.title}</h3>
            <span style={{ fontSize: 11, color: "var(--muted)", flexShrink: 0 }}>{a.date}</span>
          </div>
          <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "var(--body)", lineHeight: 1.6 }}>{a.description}</p>
        </Reveal>
      ))}
    </div>
  );
}

export default async function Page() {
  const featured = projects.slice(0, 4);
  const [contrib, repos] = await Promise.all([getContributions(), getRepoDetails(featured)]);

  return (
    <>
      <Pipeline />
      <nav className="topnav">
        <a href="#boot" style={{ fontSize: 14, color: "var(--hi)", fontWeight: 700 }}>
          akshat@portfolio <span style={{ color: "var(--dim)", fontWeight: 400 }}>~%</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20, fontSize: 12 }}>
          {navLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href} className="navlink" data-cat="navigation">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="navlink" data-cat="navigation">
                {l.label}
              </a>
            ),
          )}
        </div>
      </nav>

      {/* stage 00 — boot */}
      <section id="boot" className="hero" data-cat-section="oh — this is Akshat">
        <div>
          <p className="boot-line" style={{ "--i": 0 } as React.CSSProperties}>
            $ whoami
          </p>
          <h1 className="hero-name boot-line" style={{ "--i": 1 } as React.CSSProperties}>
            Akshat
            <br />
            Jain<span className="caret" style={{ color: "var(--accent)" }}>_</span>
          </h1>
          <p className="hero-sub boot-line" style={{ "--i": 2 } as React.CSSProperties}>
            Full-stack developer in India. This page is a pipeline: scroll, and watch an idea get
            built, shipped, and deployed to you.
          </p>

          <div className="boot-line" style={{ "--i": 3, marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 } as React.CSSProperties}>
            <a
              href="https://drive.google.com/file/d/1dx9-7m9U5smmfuV-ioSmGqJnnUKlT_1G/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              data-cat="primary"
              className="btn-primary"
            >
              ./resume.pdf
            </a>
            {socialLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                data-cat="social"
                className="btn-ghost"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <Reveal delay={0.3} y={30}>
          <figure className="photo">
            <figcaption>~/me.jpg</figcaption>
            <Image
              src="/me.jpg"
              alt="Akshat Jain"
              width={2000}
              height={1500}
              priority
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </figure>
        </Reveal>

      </section>

      {/* stage 01 — init */}
      <section id="init" className="stage" data-cat-section="oh — Akshat's story">
        <Stage id="init" cmd="git init idea" title="Every project starts as a random idea." />
        <WordReveal text={BIO} style={{ margin: 0, fontSize: "clamp(18px, 2.3vw, 23px)", lineHeight: 1.55, fontWeight: 500, color: "var(--hi)" }} />
      </section>

      {/* stage 02 — commit */}
      <section id="commit" className="stage" data-cat-section="oh — Akshat's contribution graph" data-cat-bubble="below">
        <Stage id="commit" cmd="cat contributions.log" title="Then it's commits. Lots of them." />
        <Reveal>
          {contrib ? (
            <ContributionGraph data={contrib} />
          ) : (
            <p style={{ margin: 0, fontSize: 12, color: "var(--muted)" }}>{"// contribution graph temporarily unavailable"}</p>
          )}
        </Reveal>
      </section>

      {/* stage 03 — branch */}
      <section id="branch" className="stage" data-cat-section="oh — Akshat's experience">
        <Stage id="branch" cmd="git log --graph experience" title="Branching into real teams and real users." />
        <GitTimeline commits={work} />
      </section>

      {/* stage 04 — build */}
      <section id="build" className="stage" data-cat-section="oh — Akshat's skill set">
        <Stage id="build" cmd="ls node_modules/.toolbox" title="The toolchain that does the building." />
        <Reveal>
          <Marquee rows={[skills, toolbox]} />
        </Reveal>
      </section>

      {/* stage 05 — ship */}
      <section id="ship" className="stage" data-cat-section="oh — Akshat's projects">
        <Stage id="ship" cmd="ls -la ./projects" title="Shipped. Out of localhost and into the world." />
        <div className="tr-cols-projects">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08} style={{ display: "flex" }}>
              <ProjectCard project={p} repo={repos[p.title]} />
            </Reveal>
          ))}
        </div>
        <Link href="/projects" className="link-accent" style={{ display: "inline-block", marginTop: 20, fontSize: 12 }}>
          $ ls ~/projects --all →
        </Link>
      </section>

      {/* stage 06 — log */}
      <section id="log" className="stage" data-cat-section="oh — Akshat's achievements & education">
        <Stage id="log" cmd="tail achievements.log education.log" title="Logged along the way." />
        <div className="tr-cols-2">
          <div>
            <p className="file-label">achievements.log</p>
            <Notes items={achievements} />
          </div>
          <div>
            <p className="file-label">education.log</p>
            <Notes items={education} />
          </div>
        </div>
      </section>

      {/* stage 07 — connect */}
      <section id="connect" className="stage" data-cat-section="ooh — say hi to Akshat here">
        <Stage id="connect" cmd="./send-message --interactive" title="Last stage needs your input." />
        <div className="tr-cols-2">
          <Reveal style={{ display: "flex", flexDirection: "column" }}>
            <p className="file-label">
              interactive terminal &mdash; try <span style={{ color: "var(--hi)" }}>help</span>
            </p>
            <Terminal />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="file-label">or just write</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <Reveal>
          <p className="deploy">
            <span style={{ color: "var(--ok)" }}>✓ pipeline passed</span> · {STAGES.length} stages · deployed to:{" "}
            <span style={{ color: "var(--hi)" }}>you</span>
          </p>
        </Reveal>
        <div className="statusbar">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>⎇ main</span>
            <span>UTF-8</span>
          </div>
          <span>© 2026 Akshat Jain</span>
        </div>
      </footer>
    </>
  );
}
